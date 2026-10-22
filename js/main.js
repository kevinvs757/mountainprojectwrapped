// --- App State ---
let cardsData = [];
let currentSlideIndex = 0;
const slideDuration = 7000;
let progressInterval = null;
let startTime = 0;
let progressElapsed = 0;
let isPaused = false;
let wrappedHeatmapState = { csvText: '', profileUrl: '' };

function persistWrappedHeatmapState(csvText = '', profileUrl = '') {
    wrappedHeatmapState = {
        csvText: String(csvText || '').trim(),
        profileUrl: String(profileUrl || '').trim()
    };
    sessionStorage.setItem('mpWrappedHeatmapState', JSON.stringify(wrappedHeatmapState));
}

function hydrateWrappedHeatmapState() {
    try {
        const rawState = sessionStorage.getItem('mpWrappedHeatmapState');
        if (!rawState) return { csvText: '', profileUrl: '' };
        const parsed = JSON.parse(rawState);
        wrappedHeatmapState = {
            csvText: String(parsed?.csvText || '').trim(),
            profileUrl: String(parsed?.profileUrl || '').trim()
        };
        return wrappedHeatmapState;
    } catch (error) {
        return { csvText: '', profileUrl: '' };
    }
}

// --- DOM Elements ---
const landingScreen = document.getElementById('landingScreen');
const csvInput = document.getElementById('csvInput');
const fileName = document.getElementById('fileName');
const usernameInput = document.getElementById('usernameInput');
const fetchUserBtn = document.getElementById('fetchUserBtn');
const demoBtn = document.getElementById('demoBtn');
const deckContainer = document.getElementById('storyDeck');
const progressContainer = document.getElementById('progressContainer');
const pauseButton = document.getElementById('pauseButton');
const playbackOverlay = document.getElementById('playbackOverlay');
const playbackLogo = document.getElementById('playbackLogo');
const emailModal = document.getElementById('emailModal');
const emailForm = document.getElementById('emailForm');
const emailClose = document.getElementById('emailClose');
const emailStatus = document.getElementById('emailStatus');
const emailSubmit = document.getElementById('emailSubmit');
function getSeasonYear(date = new Date()) {
    // January (0) through August (7) calculates using last year's numbers.
    // September (8) through December (11) calculates using current year's numbers.
    return date.getMonth() <= 7 ? date.getFullYear() - 1 : date.getFullYear();
}

const currentSeasonYear = getSeasonYear();

function getRequestedSeasonYear() {
    const requested = new URLSearchParams(window.location.search).get('year');
    if (requested === 'currentYear') return currentSeasonYear;
    if (!/^\d{4}$/.test(requested || '')) return null;
    const year = Number(requested);
    return year >= 2005 && year <= currentSeasonYear + 1 ? year : null;
}

const requestedSeasonYear = getRequestedSeasonYear();
if (requestedSeasonYear === null) {
    window.location.replace('?year=currentYear');
}

const activeSeasonYear = requestedSeasonYear || currentSeasonYear;

let playbackOverlayTimeout = null;
let playbackOverlayCycle = 0;
let playbackAnimation = null;

const emailConfig = {
    publicKey: 'fh_BrxwGuRGArWEvX',
    serviceId: 'service_mpwrapped',
    templateId: 'template_qlvi6yc',
    cooldownMs: 60000
};

if (window.emailjs && !emailConfig.publicKey.startsWith('YOUR_')) {
    emailjs.init({ publicKey: emailConfig.publicKey });
}

const seasonToggle = document.getElementById('seasonToggle');
const seasonDisplay = document.getElementById('seasonDisplay');
const seasonList = document.getElementById('seasonList');
const earliestSeasonYear = 2005;
const latestSeasonYear = Math.max(currentSeasonYear, activeSeasonYear);
for (let year = latestSeasonYear; year >= earliestSeasonYear; year--) {
    const seasonOption = document.createElement('li');
    seasonOption.className = 'season-option';
    seasonOption.textContent = `${year}`;
    seasonOption.setAttribute('role', 'option');
    seasonOption.dataset.year = year;
    if (year === activeSeasonYear) {
        seasonOption.classList.add('is-active');
        seasonOption.setAttribute('aria-selected', 'true');
    }
    seasonList.appendChild(seasonOption);
}
seasonDisplay.textContent = `${activeSeasonYear} Edition`;

function closeSeasonList() {
    seasonList.hidden = true;
    seasonToggle.setAttribute('aria-expanded', 'false');
}

seasonToggle.addEventListener('click', event => {
    event.stopPropagation();
    const isOpen = !seasonList.hidden;
    seasonList.hidden = isOpen;
    seasonToggle.setAttribute('aria-expanded', String(!isOpen));
});

seasonList.addEventListener('click', event => {
    const option = event.target.closest('.season-option');
    if (!option) return;
    window.location.href = `?year=${option.dataset.year}`;
});

document.addEventListener('click', event => {
    if (!seasonList.hidden && !event.target.closest('#seasonDropdown')) closeSeasonList();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !seasonList.hidden) closeSeasonList();
});

// --- Standard CSV Parser ---
function parseCSV(text) {
    if (!text || !text.trim()) return [];

    const firstLineEnd = text.indexOf('\n');
    const firstLine = firstLineEnd === -1 ? text : text.slice(0, firstLineEnd);
    const delimiter = firstLine.includes('\t') ? '\t' : ',';

    const records = [];
    let currentRecord = [];
    let currentField = '';
    let insideQuote = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (insideQuote && nextChar === '"') {
                currentField += '"';
                i++;
            } else {
                insideQuote = !insideQuote;
            }
        } else if (char === delimiter && !insideQuote) {
            currentRecord.push(currentField.trim().replace(/^"|"$/g, ''));
            currentField = '';
        } else if ((char === '\r' || char === '\n') && !insideQuote) {
            if (char === '\r' && nextChar === '\n') {
                i++;
            }
            currentRecord.push(currentField.trim().replace(/^"|"$/g, ''));
            currentField = '';
            if (currentRecord.some(f => f.length > 0)) {
                records.push(currentRecord);
            }
            currentRecord = [];
        } else {
            currentField += char;
        }
    }

    currentRecord.push(currentField.trim().replace(/^"|"$/g, ''));
    if (currentRecord.some(f => f.length > 0)) {
        records.push(currentRecord);
    }

    if (records.length < 2) return [];

    const headers = records[0].map(h => h.replace(/^"|"$/g, '').trim());
    const rows = [];

    for (let r = 1; r < records.length; r++) {
        const values = records[r];
        if (values.length >= headers.length) {
            const row = {};
            headers.forEach((h, idx) => {
                row[h] = values[idx] || '';
            });
            rows.push(row);
        }
    }
    return rows;
}

function getTickYear(dateValue) {
    const dateText = String(dateValue || '').trim();
    const yearMatch = dateText.match(/\b(\d{4})\b/);
    return yearMatch ? Number(yearMatch[1]) : NaN;
}

const usStates = new Set([
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
]);

function getTravelRegions(location) {
    const levels = String(location || '')
        .split('>')
        .map(level => level.trim())
        .filter(Boolean);
    const state = usStates.has(levels[0]) ? levels[0] : null;
    const country = state
        ? 'United States'
        : levels[0] === 'International' && levels[2]
            ? levels[2]
            : null;

    return { country, state };
}

function getRouteUrl(tick) {
    const routeUrl = String(tick['URL'] || '').trim();
    return routeUrl.startsWith('http') ? routeUrl : null;
}

function getRouteDetails(tick, notes = '') {
    return {
        name: String(tick['Route'] || '').trim() || 'Unknown Route',
        grade: tick['Rating'] || 'Unknown',
        note: notes,
        url: getRouteUrl(tick),
        location: tick['Location'] || '',
        routeType: tick['Route Type'] ? String(tick['Route Type']).trim() : '',
        yourRating: tick['Your Rating'] ? String(tick['Your Rating']).trim() : null,
        avgStars: parseFloat(tick['Avg Stars']) || null
    };
}

// Mountain Project difficulty rating code lookup map
const mpRatingScores = {
    '3rd': 800, '4th': 900, 'easy 5th': 950,
    '5.0': 1000, '5.1': 1100, '5.2': 1200, '5.3': 1300, '5.4': 1400,
    '5.5': 1500, '5.6': 1600, '5.7-': 1700, '5.7': 1800, '5.7+': 1900,
    '5.8-': 2000, '5.8': 2100, '5.8+': 2200, '5.9-': 2300, '5.9': 2400, '5.9+': 2500,
    '5.10a': 2600, '5.10-': 2700, '5.10a/b': 2800, '5.10b': 2900, '5.10': 3000,
    '5.10b/c': 3100, '5.10c': 3200, '5.10+': 3300, '5.10c/d': 3400, '5.10d': 3500,
    '5.11a': 4600, '5.11-': 4700, '5.11a/b': 4800, '5.11b': 4900, '5.11': 5000,
    '5.11b/c': 5100, '5.11c': 5200, '5.11+': 5300, '5.11c/d': 5400, '5.11d': 5500,
    '5.12a': 6600, '5.12-': 6700, '5.12a/b': 6800, '5.12b': 6900, '5.12': 7000,
    '5.12b/c': 7100, '5.12c': 7200, '5.12+': 7300, '5.12c/d': 7400, '5.12d': 7500,
    '5.13a': 8600, '5.13-': 8700, '5.13a/b': 8800, '5.13b': 8900, '5.13': 9000,
    '5.13b/c': 9100, '5.13c': 9200, '5.13+': 9300, '5.13c/d': 9400, '5.13d': 9500,
    '5.14a': 10600, '5.14b': 10900, '5.14c': 11200, '5.14d': 11500,
    '5.15a': 12600, '5.15b': 12900, '5.15c': 13200, '5.15d': 13500,
    // V-Grades (Bouldering on MP starts at 20000)
    'v-easy': 20000, 'v0-': 20005, 'v0': 20008, 'v0+': 20010,
    'v0-1': 20050, 'v1-': 20075, 'v1': 20100, 'v1+': 20110,
    'v1-2': 20150, 'v2-': 20170, 'v2': 20200, 'v2+': 20210,
    'v2-3': 20250, 'v3-': 20270, 'v3': 20300, 'v3+': 20310,
    'v3-4': 20350, 'v4-': 20370, 'v4': 20400, 'v4+': 20410,
    'v4-5': 20450, 'v5-': 20470, 'v5': 20500, 'v5+': 20510,
    'v5-6': 20550, 'v6-': 20570, 'v6': 20600, 'v6+': 20610,
    'v6-7': 20650, 'v7-': 20670, 'v7': 20700, 'v7+': 20710,
    'v7-8': 20750, 'v8-': 20770, 'v8': 20800, 'v8+': 20810,
    'v8-9': 20850, 'v9-': 20870, 'v9': 20900, 'v9+': 20910,
    'v9-10': 20950, 'v10-': 20970, 'v10': 21000, 'v10+': 21010,
    'v10-11': 21050, 'v11': 21100, 'v12': 21200, 'v13': 21300,
    'v14': 21400, 'v15': 21500, 'v16': 21600, 'v17': 21700
};

function extractPrimaryGrade(gradeStr) {
    if (!gradeStr) return '';
    const tokens = String(gradeStr).trim().split(/[\s,]+/);
    for (const t of tokens) {
        const clean = t.toLowerCase();
        if (clean.startsWith('5.') || mpRatingScores[clean] !== undefined) {
            return clean;
        }
    }
    for (const t of tokens) {
        const clean = t.toLowerCase();
        if (clean.startsWith('v')) {
            return clean;
        }
    }
    return tokens[0].toLowerCase();
}

function getMpDifficultyScore(grade) {
    if (!grade) return -1;
    const primary = extractPrimaryGrade(grade);
    if (mpRatingScores[primary] !== undefined) {
        return mpRatingScores[primary];
    }
    return -1;
}

function getNiceStickerLabel(val) {
    if (val === 420 || val === '420') return 'blazeit';
    if (val === 69 || val === '69') return 'nice';
    if (typeof val === 'string') {
        if (/\b420\b/.test(val)) return 'blazeit';
        if (/\b69\b/.test(val)) return 'nice';
    }
    return null;
}

function isNiceValue(val) {
    return getNiceStickerLabel(val) !== null;
}

function wrapWithNiceSticker(contentHtml, val) {
    const label = getNiceStickerLabel(val);
    if (!label) return contentHtml;
    return `<span class="nice-sticker-wrapper">${contentHtml}<span class="nice-sticker" aria-hidden="true">${label}</span></span>`;
}

function findScenicImage(markdown) {
    const imageMatches = [...markdown.matchAll(/!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/gi)]
        .map(match => ({ description: match[1], url: match[2] }))
        .filter(image => /assets\/photos\/climb\//i.test(image.url));
    const scenicImage = imageMatches.find(image => /scenic/i.test(image.description));
    const routeImage = imageMatches.find(image => !/topo/i.test(image.description));
    return (scenicImage || routeImage || imageMatches[0])?.url || null;
}

async function fetchScenicImage(route) {
    if (!route?.url) return null;

    const fetchPage = async url => {
        const jinaUrl = `https://r.jina.ai/http://${url.replace(/^https?:\/\//i, '')}`;
        const response = await fetch(jinaUrl);
        if (!response.ok) return null;
        return await response.text();
    };

    try {
        const routeDocument = await fetchPage(route.url);
        if (!routeDocument) return null;

        const routeImage = findScenicImage(routeDocument);
        if (routeImage) return routeImage;

        const parentGroup = routeDocument.match(/\[[^\]]*(?:crag|wall|area|group)[^\]]*\]\((https?:\/\/www\.mountainproject\.com\/area\/[^)]+)\)/i);
        if (!parentGroup) return null;

        const groupDocument = await fetchPage(parentGroup[1]);
        return groupDocument ? findScenicImage(groupDocument) : null;
    } catch (error) {
        return null;
    }
}

async function enrichRouteImages(stats) {
    const routes = [
        stats.favoriteRoute,
        stats.longestRoute,
        stats.shortestRoute,
        stats.angryMuch,
        stats.gumbyMoment,
        stats.saveForBlog,
        stats.starChaserRoute,
        stats.chossConnoisseurRoute,
        stats.sandbagJudge?.route
    ].filter(route => route?.url);
    const routesByUrl = new Map();
    routes.forEach(route => {
        const matchingRoutes = routesByUrl.get(route.url) || [];
        matchingRoutes.push(route);
        routesByUrl.set(route.url, matchingRoutes);
    });

    await Promise.all([...routesByUrl.entries()].map(async ([url, matchingRoutes]) => {
        const imageUrl = await fetchScenicImage(matchingRoutes[0]);
        matchingRoutes.forEach(route => {
            route.imageUrl = imageUrl;
        });
    }));
}

// --- Dynamic Stats Calculator ---
function processTickList(ticks, targetSeasonYear = currentSeasonYear) {
    let totalElevationFeet = 0;
    let totalPitches = 0;
    
    // Separate tracking for each category
    const maxSends = {
        Sport: { code: -1, grade: "N/A", name: "N/A", location: "N/A" },
        Trad: { code: -1, grade: "N/A", name: "N/A", location: "N/A" },
        TopRope: { code: -1, grade: "N/A", name: "N/A", location: "N/A" },
        Boulder: { code: -1, grade: "N/A", name: "N/A", location: "N/A" }
    };

    const cragMap = {};
    const cragAreas = {};
    const routeMap = {};
    const ratedRouteMap = new Map();
    let longestRoute = null;
    let shortestRoute = null;
    const typeCounts = { Sport: 0, Trad: 0, TopRope: 0, Boulder: 0 };
    let totalTicks = 0;
    const climbingDays = new Set();
    let weekdayTicks = 0;
    let weekendTicks = 0;
    let biggestDowngrade = null; // { route, consensus, yourRating, diff }
    let biggestUpgrade = null;   // { route, consensus, yourRating, diff }
    let chodesRidden = 0;
    const uniqueChodeRoutes = new Set();
    let jiuJitsuBeltLevel = null;
    let northBendSends = 0;
    const northBendExitCounts = { 32: 0, 34: 0, 38: 0 };
    const travelCountries = new Set();
    const travelStates = new Set();
    let winterTicks = 0;
    let summerTicks = 0;
    const winterMonths = new Set();
    let longestFellHungNote = null;
    let easiestFellHung = null;
    let longestNonFellHungNote = null;

    ticks
        .filter(tick => getTickYear(tick['Date']) === targetSeasonYear)
        .forEach(tick => {
        totalTicks++;
        const dateText = String(tick['Date'] || '').trim();
        if (dateText) {
            const cleanDate = dateText.split('T')[0].split(' ')[0];
            climbingDays.add(cleanDate);
            const dateObj = new Date(cleanDate);
            if (!isNaN(dateObj.getTime())) {
                const month = dateObj.getMonth() + 1;
                if ([1, 2].includes(month)) {
                    winterTicks++;
                    winterMonths.add(month);
                } else if ([6, 7, 8].includes(month)) {
                    summerTicks++;
                }
                const day = dateObj.getDay();
                if (day === 0 || day === 6) {
                    weekendTicks++;
                } else {
                    weekdayTicks++;
                }
            }
        }

        // Pitches & Elevation
        const pitches = parseInt(tick['Pitches'] || 1, 10);
        const length = parseInt(tick['Length'] || 0, 10);
        
        totalPitches += isNaN(pitches) ? 1 : pitches;
        totalElevationFeet += isNaN(length) ? 0 : length;

        // Categorize Route / Ascent Type
        const styleStr = String(tick['Style'] || '').trim().toLowerCase();
        const routeType = String(tick['Route Type'] || '').trim();
        const styles = styleStr.split(',').map(s => s.trim()).filter(Boolean);
        const isTRStyle = styles.some(s => s === 'tr' || s === 'follow');
        const isTRRouteType = /^(tr|toprope)$/i.test(routeType);
        const isTopRope = isTRStyle || isTRRouteType;

        let category = null;
        if (isTopRope) {
            category = 'TopRope';
            typeCounts.TopRope++;
        } else if (routeType.includes('Sport')) {
            category = 'Sport';
            typeCounts.Sport++;
        } else if (routeType.includes('Trad')) {
            category = 'Trad';
            typeCounts.Trad++;
        } else if (routeType.includes('Boulder')) {
            category = 'Boulder';
            typeCounts.Boulder++;
        }

        const routeName = String(tick['Route'] || '');
        const location = String(tick['Location'] || '');
        const notes = String(tick['Notes'] || '').trim();
        const ratingCode = parseInt(tick['Rating Code'] || 0, 10);
        const avgStars = parseFloat(tick['Avg Stars']);
        const yourRating = tick['Your Rating'] ? String(tick['Your Rating']).trim() : '';
        const consensusRating = tick['Rating'] ? String(tick['Rating']).trim() : '';

        // Star stats tracking: one valid rating per unique route.
        if (Number.isFinite(avgStars) && avgStars > 0 && avgStars <= 5) {
            const routeDetails = getRouteDetails(tick, notes);
            const routeKey = getRouteUrl(tick)?.replace(/[?#].*$/, '').replace(/\/$/, '').toLowerCase()
                || `${routeDetails.name.toLowerCase()}|${routeDetails.location.toLowerCase()}`;
            if (!ratedRouteMap.has(routeKey)) {
                ratedRouteMap.set(routeKey, { ...routeDetails, avgStars });
            }
        }

        // Personal grade difference tracking using Mountain Project difficulty rating codes
        if (yourRating && consensusRating && isEligibleSend(tick)) {
            const consensusScore = getMpDifficultyScore(consensusRating) > 0
                ? getMpDifficultyScore(consensusRating)
                : (Number.isFinite(ratingCode) && ratingCode > 0 ? ratingCode : -1);
            const yourScore = getMpDifficultyScore(yourRating);
            if (consensusScore > 0 && yourScore > 0 && Math.abs(yourScore - consensusScore) >= 1200) {
                const diff = yourScore - consensusScore;
                const routeDetails = getRouteDetails(tick, notes);
                const isTrad = (tick['Route Type'] || '').includes('Trad');
                if (diff < 0) {
                    // Downgraded (Sandbagger)
                    if (!biggestDowngrade || Math.abs(diff) > Math.abs(biggestDowngrade.diff)) {
                        biggestDowngrade = {
                            route: routeDetails,
                            consensus: consensusRating,
                            yourRating,
                            diff: Math.abs(diff),
                            isTrad
                        };
                    }
                } else if (diff > 0) {
                    // Upgraded (Victim)
                    if (!biggestUpgrade || diff > biggestUpgrade.diff) {
                        biggestUpgrade = {
                            route: routeDetails,
                            consensus: consensusRating,
                            yourRating,
                            diff,
                            isTrad
                        };
                    }
                }
            }
        }

        const travelRegions = getTravelRegions(location);
        if (travelRegions.country) travelCountries.add(travelRegions.country);
        if (travelRegions.state) travelStates.add(travelRegions.state);
        const isBoulderRoute = category === 'Boulder' || routeType.includes('Boulder');
        if (Number.isFinite(length) && length > 0) {
            const routeStats = {
                ...getRouteDetails(tick, notes),
                feet: length,
                pitches: Number.isFinite(pitches) && pitches > 0 ? pitches : 1
            };

            if (!longestRoute || length > longestRoute.feet) longestRoute = routeStats;
            if (!isBoulderRoute && !/extention\s*$/i.test(routeName)
                && (!shortestRoute || length < shortestRoute.feet)) shortestRoute = routeStats;
        }
        if (routeName) {
            if (!routeMap[routeName]) routeMap[routeName] = { ticks: 0, difficulty: ratingCode || 0, ...getRouteDetails(tick, notes) };
            routeMap[routeName].ticks++;
        }
        if (/North Bend & Vicinity/i.test(location)) {
            const exitMatch = location.match(/Exit\s+(32|34|38)\b/i);
            if (exitMatch) northBendExitCounts[exitMatch[1]]++;

            const isNorthBendSend = isEligibleSend(tick);
            if (isNorthBendSend) northBendSends++;

            if (isNorthBendSend && /chode/i.test(routeName)) {
                chodesRidden++;
                uniqueChodeRoutes.add(routeName.toLowerCase());
            }

            const beltMatch = routeName.match(/Shih Tzu Jiu-Jitsu\s+(\d+)/i);
            if (isNorthBendSend && beltMatch) {
                const beltLevel = Number.parseInt(beltMatch[1], 10);
                jiuJitsuBeltLevel = Math.max(jiuJitsuBeltLevel || 0, beltLevel);
            }
        }

        if (tick['Lead Style'] === 'Fell/Hung'
            && (!longestFellHungNote || notes.length > longestFellHungNote.note.length)) {
            longestFellHungNote = getRouteDetails(tick, notes);
        }

        if (tick['Lead Style'] === 'Fell/Hung' && Number.isFinite(ratingCode) && ratingCode > 0
            && (!easiestFellHung || ratingCode < easiestFellHung.code)) {
            easiestFellHung = {
                ...getRouteDetails(tick, notes),
                code: ratingCode,
            };
        }

        if (tick['Lead Style'] !== 'Fell/Hung'
            && (!longestNonFellHungNote || notes.length > longestNonFellHungNote.note.length)) {
            longestNonFellHungNote = getRouteDetails(tick, notes);
        }

        // Hardest Send per category using Rating Code
        if (category && maxSends[category] && isEligibleSend(tick) && ratingCode > maxSends[category].code) {
            maxSends[category] = {
                code: ratingCode,
                grade: tick['Rating'] || 'Unknown',
                name: tick['Route'] || 'Unknown Route',
                location: getAreaAndCrag(tick['Location'])
            };
        }

        // Crag Counts
        const mainCrag = getDeepestCrag(tick['Location']);
        if (mainCrag) {
            cragMap[mainCrag] = (cragMap[mainCrag] || 0) + 1;
            if (!cragAreas[mainCrag]) cragAreas[mainCrag] = getArea(tick['Location']);
        }
    });

    ticks.forEach(tick => {
        const dateText = String(tick['Date'] || '').trim();
        const tickYear = getTickYear(dateText);
        const dateObj = new Date(dateText.split('T')[0].split(' ')[0]);
        if (tickYear === targetSeasonYear - 1 && !isNaN(dateObj.getTime()) && dateObj.getMonth() === 11) {
            winterTicks++;
            winterMonths.add(12);
        }
    });

    // Top Crags
    const topCrags = Object.entries(cragMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, subtext: cragAreas[name], value: `${count} ${count === 1 ? 'tick' : 'ticks'}` }));

    const favoriteRouteEntry = Object.entries(routeMap)
        .sort((a, b) => b[1].ticks - a[1].ticks);
    const favoriteRouteTicks = favoriteRouteEntry[0]?.[1].ticks || 0;
    const tiedFavoriteEntries = favoriteRouteEntry.filter(([, route]) => route.ticks === favoriteRouteTicks);
    const favoriteRoutes = favoriteRouteTicks > 1 && tiedFavoriteEntries.length < 5
        ? tiedFavoriteEntries.map(([name, route]) => ({ ...route, name }))
        : [];
    const favoriteRoute = favoriteRoutes.length === 1 ? favoriteRoutes[0] : null;
    const refusalToProject = tiedFavoriteEntries.length >= 5
        ? { maxTicks: favoriteRouteTicks, tiedCount: tiedFavoriteEntries.length }
        : null;
    const travelCriteria = [];
    if (travelCountries.size > 2) travelCriteria.push('3+ countries');
    if (travelStates.size > 5) travelCriteria.push('6+ states');
    const winterPacePercent = summerTicks > 0
        ? Math.round((winterTicks / summerTicks) * 100)
        : 0;
    const winterPaceRatio = summerTicks > 0 ? winterTicks / summerTicks : 0;
    const climbedEveryWinterMonth = winterMonths.size === 3;
    const qualifiesForNoOffseason = winterPaceRatio >= 0.15 || climbedEveryWinterMonth;
    const noOffseasonCriteria = [];
    if (summerTicks > 0 && winterPaceRatio >= 0.15) {
        noOffseasonCriteria.push('Winter pace 15%+ of summer');
    }
    if (climbedEveryWinterMonth) noOffseasonCriteria.push('Got out each winter month');
    if (winterTicks > 25) noOffseasonCriteria.push(`${winterTicks} ticks`);
    if (noOffseasonCriteria.length) noOffseasonCriteria.push('Not a Skier');
    const noOffseason = qualifiesForNoOffseason
        ? {
            winterPacePercent,
            criteria: noOffseasonCriteria,
            detail: `Last winter you kept climbing at ${winterPacePercent}% of your summer pace.`
        }
        : null;

    // Star Averages & Route Quality
    const ratedRoutes = [...ratedRouteMap.values()];
    const ratedRoutesCount = ratedRoutes.length;
    const totalStars = ratedRoutes.reduce((sum, route) => sum + route.avgStars, 0);
    const avgOverallStars = ratedRoutesCount > 0 ? totalStars / ratedRoutesCount : null;
    const mostStarredRoute = ratedRoutes.reduce((best, route) =>
        !best || route.avgStars > best.avgStars ? route : best, null);
    const leastStarredRoute = ratedRoutes.reduce((worst, route) =>
        !worst || route.avgStars < worst.avgStars ? route : worst, null);
    const lowStarRoutesCount = ratedRoutes.filter(route => route.avgStars < 2.0).length;
    const lowStarRoutePercent = ratedRoutesCount > 0
        ? (lowStarRoutesCount / ratedRoutesCount) * 100
        : 0;
    const qualifiesByLowStarPercent = lowStarRoutePercent >= 15;
    const qualifiesByLowStarVolume = lowStarRoutesCount >= 10;
    const starHunter = ratedRoutesCount > 0
        ? {
            avgStars: avgOverallStars.toFixed(1),
            ratedRoutesCount,
            lowStarRoutesCount,
            lowStarRoutePercent: lowStarRoutePercent.toFixed(1),
            isHighQuality: ratedRoutesCount >= 5 && avgOverallStars > 3.2,
            isChossLover: qualifiesByLowStarPercent || qualifiesByLowStarVolume,
            chossQualification: qualifiesByLowStarVolume ? 'volume' : 'percent',
            highQualityRoute: mostStarredRoute,
            chossRoute: leastStarredRoute
        }
        : null;

    // Schedule Persona: Corporate Fugitive vs Weekend Warrior
    const schedulePersona = totalTicks >= 5
        ? (weekdayTicks > weekendTicks
            ? { title: "Corporate Fugitive", subtitle: "Slack status: 'In a meeting' (on the wall)", weekdayTicks, weekendTicks }
            : { title: "Weekend Warrior", subtitle: "Living for the 48-hour send window", weekdayTicks, weekendTicks })
        : null;

    // Sandbag Judge
    const sandbagJudge = biggestDowngrade
        ? { type: 'downgrade', ...biggestDowngrade }
        : (biggestUpgrade ? { type: 'upgrade', ...biggestUpgrade } : null);

    const topNorthBendExit = Object.entries(northBendExitCounts)
        .sort(([, countA], [, countB]) => countB - countA)[0];
    const northBendExitSupremecist = topNorthBendExit?.[1]
        ? { exit: topNorthBendExit[0], count: topNorthBendExit[1] }
        : null;

    // Personas
    const totalStyles = typeCounts.Sport + typeCounts.Trad + typeCounts.TopRope + typeCounts.Boulder || 1;
    const sportPct = Math.round((typeCounts.Sport / totalStyles) * 100);
    const tradPct = Math.round((typeCounts.Trad / totalStyles) * 100);
    const trPct = Math.round((typeCounts.TopRope / totalStyles) * 100);
    const boulderPct = Math.round((typeCounts.Boulder / totalStyles) * 100);

    let persona = "Swiss Army Dirtbag";
    if (trPct > 40) persona = "TopRope Tough Guy/Gal";
    else if (tradPct > 40) persona = "Trad Dad/Mom";
    else if (sportPct > 60) persona = "Bolt Clipper";
    else if (typeCounts.Boulder > typeCounts.Sport && typeCounts.Boulder > typeCounts.Trad && typeCounts.Boulder > typeCounts.TopRope) persona = "Pebble Wrestler";

    const styleParts = [];
    if (sportPct > 0) styleParts.push(`${sportPct}% Sport`);
    if (tradPct > 0) styleParts.push(`${tradPct}% Trad`);
    if (trPct > 0) styleParts.push(`${trPct}% TopRope`);
    if (boulderPct > 0) styleParts.push(`${boulderPct}% Boulder`);

    const styleRatio = styleParts.length > 0
        ? styleParts.join(' • ')
        : `${sportPct}% Sport • ${tradPct}% Trad`;

    return {
        totalElevationFeet,
        totalPitches,
        totalTicks,
        totalDaysClimbed: climbingDays.size,
        weekdayTicks,
        weekendTicks,
        schedulePersona,
        starHunter,
        sandbagJudge,
        hardestSends: {
            Sport: maxSends.Sport.code !== -1 ? maxSends.Sport : null,
            Trad: maxSends.Trad.code !== -1 ? maxSends.Trad : null,
            TopRope: maxSends.TopRope.code !== -1 ? maxSends.TopRope : null,
            Boulder: maxSends.Boulder.code !== -1 ? maxSends.Boulder : null
        },
        topCrags,
        favoriteRoute,
        favoriteRoutes,
        refusalToProject,
        travelCountries: [...travelCountries].sort(),
        travelStates: [...travelStates].sort(),
        travelCriteria,
        noOffseason,
        longestRoute,
        shortestRoute,
        starChaserRoute: starHunter?.isHighQuality ? starHunter.highQualityRoute : null,
        chossConnoisseurRoute: starHunter?.isChossLover ? starHunter.chossRoute : null,
        northBender: northBendSends >= 20 || (chodesRidden > 0 && jiuJitsuBeltLevel !== null)
            ? {
                northBendSends,
                chodesRidden,
                uniqueChodeRoutes: uniqueChodeRoutes.size,
                jiuJitsuBeltLevel,
                northBendExitSupremecist
            }
            : null,
        angryMuch: longestFellHungNote && longestFellHungNote.note.length > 70
            ? longestFellHungNote
            : null,
        gumbyMoment: easiestFellHung,
        saveForBlog: longestNonFellHungNote && longestNonFellHungNote.note.length > 100
            ? longestNonFellHungNote
            : null,
        seasonYear: targetSeasonYear,
        persona,
        styleRatio
    };
}

// --- Cards Data Generator ---
function buildCardsFromStats(stats) {
    const cards = [
        {
            id: "welcome",
            theme: "bg-sunset",
            subtitle: `${stats.seasonYear || currentSeasonYear} Season`,
            title: "Mountain Project<br>Wrapped",
            statLabel: "Tap right to see your year in review 🧗",
            type: "intro"
        },
        {
            id: "persona",
            theme: "bg-electric",
            subtitle: "Your Climbing Identity",
            title: "You Are A",
            badge: stats.persona,
            statLabel: stats.styleRatio,
            type: "summary"
        },
        {
            id: "totalClimbs",
            theme: "bg-nebula",
            subtitle: "You left the house award",
            title: "Tick Totals",
            dualStats: [
                {
                    value: stats.totalTicks,
                    label: stats.totalTicks === 1 ? "Total Tick" : "Total Ticks",
                    id: "total-ticks"
                },
                {
                    value: stats.totalDaysClimbed,
                    label: stats.totalDaysClimbed === 1 ? "Climbing Day" : "Climbing Days",
                    id: "climbing-days"
                }
            ],
            type: "dual-counter"
        },
        {
            id: "elevation",
            theme: "bg-emerald",
            subtitle: "Whoa",
            title: "Vertical Gain",
            dualStats: [
                {
                    value: stats.totalElevationFeet,
                    label: "Vertical Feet",
                    id: "vertical-feet"
                },
                {
                    value: stats.totalPitches,
                    label: stats.totalPitches === 1 ? "Total Pitch" : "Total Pitches",
                    id: "total-pitches"
                }
            ],
            type: "dual-counter"
        },
        {
            id: "topCrags",
            theme: "bg-berry",
            title: "Top Crags",
            list: stats.topCrags,
            type: "list"
        }
    ];

    if (stats.travelCriteria?.length) {
        cards.push({
            id: "traveller",
            theme: "bg-traveller",
            subtitle: "you either are sponsored or live in a van, or both.",
            title: "Traveller",
            travelCriteria: stats.travelCriteria || [],
            travelCountries: stats.travelCountries || [],
            travelStates: stats.travelStates || [],
            type: "traveller"
        });
    }

    if (stats.noOffseason) {
        cards.push({
            id: "noOffseason",
            theme: "bg-no-offseason",
            subtitle: "Winter is for sending temps",
            title: "No Offseason",
            noOffseasonDetail: stats.noOffseason.detail,
            noOffseasonCriteria: stats.noOffseason.criteria,
            type: "no-offseason"
        });
    }

    if (stats.favoriteRoutes.length) {
        cards.push({
            id: "favoriteRoute",
            theme: "bg-electric",
            subtitle: stats.favoriteRoutes.length === 1
                ? "You really like this one I guess"
                : "You really liked these for some reason",
            title: stats.favoriteRoutes.length === 1
                ? "Most Climbed Route"
                : "Most Climbed Routes",
            favoriteRoutes: stats.favoriteRoutes,
            favoriteRoute: stats.favoriteRoute,
            type: "favorite-route"
        });
    }

    if (stats.refusalToProject) {
        const refusal = stats.refusalToProject;
        cards.push({
            id: "refusalToProject",
            theme: "bg-electric",
            subtitle: "What's projecting?",
            title: "Commitment Issues",
            refusalToProject: refusal,
            type: "refusal-to-project"
        });
    }

    if (stats.longestRoute) {
        cards.push({
            id: "longestRoute",
            theme: "bg-emerald",
            subtitle: "Most Biggest",
            title: "Tallest Route Climbed",
            routeStats: stats.longestRoute,
            type: "route-stats"
        });
    }

    if (stats.shortestRoute) {
        cards.push({
            id: "shortestRoute",
            theme: "bg-sunset",
            subtitle: "Heightism is not a joke",
            title: "Shortest Route",
            routeStats: stats.shortestRoute,
            type: "route-stats"
        });
    }

    const hardestSends = Object.entries(stats.hardestSends)
        .filter(([, send]) => send)
        .map(([category, send]) => ({ category, ...send }));

    if (stats.angryMuch) {
        cards.push({
            id: "angryMuch",
            theme: "bg-berry",
            subtitle: "U mad?",
            title: "Longest Fell/Hung Note",
            angryMuch: stats.angryMuch,
            type: "angry"
        });
    }

    if (stats.gumbyMoment) {
        cards.push({
            id: "gumbyMoment",
            theme: "bg-emerald",
            title: "Easiest Fall/Hang",
            subtitle: "Humbled by Gravity",
            gumbyMoment: stats.gumbyMoment,
            type: "gumby"
        });
    }

    if (stats.northBender) {
        const northBendBonusStats = [
            { label: "North Bend Sends", value: stats.northBender.northBendSends },
            stats.northBender.northBendExitSupremecist
                ? {
                    label: `Exit ${stats.northBender.northBendExitSupremecist.exit} ticks`,
                    value: stats.northBender.northBendExitSupremecist.count,
                    sticker: `Exit ${stats.northBender.northBendExitSupremecist.exit} Supremecist`
                }
                : null,
            stats.northBender.chodesRidden > 0
                ? { label: "Chodes Ridden", value: stats.northBender.chodesRidden }
                : null,
            stats.northBender.jiuJitsuBeltLevel !== null
                ? { label: "Jiu-Jitsu Belt Level", value: stats.northBender.jiuJitsuBeltLevel }
                : null
        ].filter(Boolean);

        cards.push({
            id: "northBender",
            theme: "bg-north-bender",
            subtitle: stats.northBender.uniqueChodeRoutes >= 5
                ? 'You really like north bend and chodes. Do you have any <span class="email-hit-area"><button class="email-link" id="oldRopeEmail" type="button">old ropes</button></span> to part with?'
                : 'You really like north bend. Do you have any <span class="email-hit-area"><button class="email-link" id="oldRopeEmail" type="button">old ropes</button></span> to part with?',
            title: "Local Crusher",
            bonusStats: northBendBonusStats,
            type: "bonus"
        });
    }

    if (stats.saveForBlog) {
        const longCommentVerbs = [
            'expounded', 'bloviated', 'pontificated', 'rattled on', 'waxed poetic',
            'babbled on', 'blathered on', 'prattled on', 'proselytized', 'soapboxed', 'spouted off'
        ];
        const longCommentVerb = longCommentVerbs[new Date().getMilliseconds() % longCommentVerbs.length];
        cards.push({
            id: "saveForBlog",
            theme: "bg-sunset",
            subtitle: "Save it for your blog",
            title: `The most you ${longCommentVerb} about a send`,
            saveForBlog: stats.saveForBlog,
            type: "save-for-blog"
        });
    }

    if (stats.schedulePersona) {
        cards.push({
            id: "schedulePersona",
            theme: "bg-electric",
            subtitle: stats.schedulePersona.subtitle,
            title: stats.schedulePersona.title,
            dualStats: [
                {
                    value: stats.schedulePersona.weekdayTicks,
                    label: "Weekday Ticks",
                    id: "weekday-ticks"
                },
                {
                    value: stats.schedulePersona.weekendTicks,
                    label: "Weekend Ticks",
                    id: "weekend-ticks"
                }
            ],
            type: "dual-counter"
        });
    }

    if (stats.starHunter) {
        if (stats.starHunter.isHighQuality && stats.starHunter.representativeRoute) {
            cards.push({
                id: "starChaser",
                theme: "bg-sunset",
                subtitle: "You only climb if 400 people on the internet approved it first",
                title: "Star Chaser",
                statLabel: `Average Quality: ${stats.starHunter.avgStars} ★ across ${stats.starHunter.ratedRoutesCount} routes`,
                starRoute: stats.starHunter.highQualityRoute,
                type: "star-route"
            });
        }
        if (stats.starHunter.isChossLover && stats.starHunter.chossRoute) {
            const chossStatLabel = stats.starHunter.chossQualification === 'volume'
                ? `you ticked ${stats.starHunter.lowStarRoutesCount} routes below 2.0 ★`
                : `${stats.starHunter.lowStarRoutePercent}% of your routes were below 2.0 ★`;
            cards.push({
                id: "chossConnoisseur",
                theme: "bg-berry",
                subtitle: "Why are you climbing 1.8-star mud gullies?",
                title: "Choss Connoisseur",
                statLabel: chossStatLabel,
                starRoute: stats.starHunter.chossRoute,
                starRouteIntro: 'Your lowest-star tick',
                starRouteDisplayRating: stats.starHunter.chossRoute.avgStars
                    ? `${stats.starHunter.chossRoute.avgStars} ★`
                    : stats.starHunter.chossRoute.grade,
                type: "star-route"
            });
        }
    }

    if (stats.sandbagJudge) {
        cards.push({
            id: "sandbagJudge",
            theme: stats.sandbagJudge.type === 'downgrade' ? "bg-nebula" : "bg-emerald",
            subtitle: stats.sandbagJudge.type === 'downgrade'
                ? "Ego Downgrade"
                : "Grade Discrepancy",
            title: stats.sandbagJudge.type === 'downgrade'
                ? "Sandbagger"
                : "The Victim",
            sandbagJudge: stats.sandbagJudge,
            type: "sandbag"
        });
    }

    if (hardestSends.length) {
        cards.push({
            id: "hardestSends",
            theme: "bg-nebula",
            subtitle: "Way to go, kid",
            title: "Hardest Sends",
            hardestSends,
            type: "hardest",
            showFinalActions: true,
            heatmapLink: "heatmap?source=wrapped"
        });
    }

    if (cards.length && !cards[cards.length - 1].showFinalActions) {
        cards[cards.length - 1].showFinalActions = true;
        cards[cards.length - 1].heatmapLink = "heatmap?source=wrapped";
    }

    return cards;
}

// --- Extract Export URL ---
function extractExportUrl(userInput) {
    return getTickExportUrl(userInput);
}

// --- Fetch User Ticks ---
async function fetchUserTicks(inputUrl) {
    const profileUrl = canonicalizeProfileUrl(inputUrl);
    const targetUrl = getTickExportUrl(profileUrl);

    if (!targetUrl) {
        alert('Invalid Mountain Project URL.\n\nPlease paste a full link like:\nhttps://www.mountainproject.com/user/12345789/user-name');
        return;
    }

    fetchUserBtn.textContent = 'Fetching...';
    fetchUserBtn.disabled = true;

    try {
        const csvText = await fetchTickExport(targetUrl);

        const rows = parseCSV(csvText);
        
        if (!rows || rows.length === 0) {
            alert('No ticks found or user ticks are private.');
            return;
        }

        persistWrappedHeatmapState(csvText, profileUrl);
        const stats = processTickList(rows, activeSeasonYear);
        startWrapped(stats, { csvText, profileUrl });
        trackFeatureAccess(profileUrl, 'wrapped', 'landing');
    } catch (err) {
        alert('Could not fetch ticks from that profile URL. Download your ticks.csv and upload directly!');
    } finally {
        fetchUserBtn.textContent = 'Go';
        fetchUserBtn.disabled = false;
    }
}

// --- Event Handlers & Loaders ---
csvInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    fileName.textContent = file.name;
    const reader = new FileReader();
    reader.onload = (event) => {
        const csvText = event.target.result;
        const rows = parseCSV(csvText);
        const stats = processTickList(rows, activeSeasonYear);
        persistWrappedHeatmapState(csvText, '');
        startWrapped(stats, { csvText, profileUrl: '' });
    };
    reader.readAsText(file);
});

fetchUserBtn.addEventListener('click', () => {
    const input = usernameInput.value.trim();
    if (!input) return alert('Please paste your Mountain Project profile URL.');
    fetchUserTicks(input);
});

usernameInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') fetchUserBtn.click();
});

demoBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('js/sample-ticks.csv');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const csvText = await response.text();
        const rows = parseCSV(csvText);
        const stats = processTickList(rows, activeSeasonYear);
        persistWrappedHeatmapState(csvText, '');
        startWrapped(stats, { csvText, profileUrl: '' });
    } catch (error) {
        console.error('Failed to load sample data', error);
    }
});

function applyRouteImages() {
    cardsData.forEach((card, index) => {
        const slide = document.getElementById(`slide-${index}`);
        const route = card.favoriteRoutes?.length === 1 ? card.favoriteRoutes[0]
            : card.routeStats || card.angryMuch
            || card.gumbyMoment || card.saveForBlog || card.sandbagJudge?.route;
        if (!slide || !route?.imageUrl) return;

        slide.classList.add('route-image-card');
        slide.style.setProperty('--route-image', `url("${route.imageUrl}")`);

        const image = document.createElement('img');
        image.className = 'route-image-layer';
        image.alt = '';
        image.setAttribute('aria-hidden', 'true');
        Object.assign(image.style, {
            position: 'absolute',
            inset: '0',
            zIndex: '0',
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: '0.34',
            filter: 'saturate(0.7) contrast(0.9)',
            pointerEvents: 'none'
        });
        image.src = route.imageUrl;
        image.addEventListener('error', () => {
            slide.classList.remove('route-image-card');
            image.remove();
            console.warn('Route image could not be loaded:', route.imageUrl);
        }, { once: true });
        slide.prepend(image);
    });
}

function startWrapped(stats, sourceInfo = {}) {
    if (sourceInfo.csvText || sourceInfo.profileUrl) {
        persistWrappedHeatmapState(sourceInfo.csvText || '', sourceInfo.profileUrl || '');
    }
    cardsData = buildCardsFromStats(stats);
    landingScreen.classList.remove('active');
    pauseButton.hidden = false;
    renderDeck();
    enrichRouteImages(stats).then(applyRouteImages);
}

// --- Deck Render & Navigation Engine ---
function renderDeck() {
    deckContainer.innerHTML = '';
    progressContainer.innerHTML = '';

    cardsData.forEach((card, i) => {
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        bar.innerHTML = `<div class="progress-fill" id="fill-${i}"></div>`;
        progressContainer.appendChild(bar);

        const slideEl = document.createElement('section');
        slideEl.className = `card-slide ${card.theme} ${card.imageUrl ? 'route-image-card' : ''} ${i === 0 ? 'active' : ''}`;
        slideEl.id = `slide-${i}`;
        if (card.imageUrl) slideEl.style.setProperty('--route-image', `url("${card.imageUrl}")`);

        let innerHTML = card.subtitle
            ? `<p class="subtitle anim-element anim-1">${card.subtitle}</p>`
            : '';

        if (card.title) innerHTML += `<h2 class="title anim-element anim-2">${card.title}</h2>`;

        if (card.type === 'counter') {
            innerHTML += `<div class="big-stat anim-element anim-2" id="stat-counter-${i}">0</div>`;
        } else if (card.type === 'dual-counter' && card.dualStats) {
            const boxes = card.dualStats.map((stat, idx) => `
                <div class="stat-box">
                    <div class="big-stat" id="dual-stat-${i}-${idx}">0</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `).join('');
            innerHTML += `<div class="dual-stats-grid anim-element anim-2">${boxes}</div>`;
        } else if (card.bigStatDisplay) {
            innerHTML += `<div class="big-stat anim-element anim-2">${card.bigStatDisplay}</div>`;
        }

        if (card.badge) innerHTML += `<div class="badge anim-element anim-3">${card.badge}</div>`;

        if (card.list) {
            const isWorldWallTop = card.id === 'topCrags' && card.list.length > 0 && /world\s*wall/i.test(card.list[0].name);
            const worldWallStickerMarkup = isWorldWallTop
                ? `<span class="world-wall-sticker" aria-hidden="true">World Wall Climber</span>`
                : '';
            const listItems = card.list.map((item, idx) => `
                <div class="card-list-item">
                    <span>${idx + 1}. ${item.name}${item.subtext ? `<small class="card-list-subtext">${item.subtext}</small>` : ''}</span>
                    <span>${wrapWithNiceSticker(item.value, item.value)}</span>
                </div>
            `).join('');
            innerHTML += `<div class="card-list anim-element anim-3">${worldWallStickerMarkup}${listItems}</div>`;
        }

        if (card.type === 'traveller') {
            const criteriaItems = card.travelCriteria.map(criteria => `
                <div class="traveller-criteria-item">${criteria}</div>
            `).join('');
            const countryItems = card.travelCountries.length
                ? `<div class="traveller-region"><span class="traveller-label">Countries</span><strong>${card.travelCountries.join(' • ')}</strong></div>`
                : '';
            const stateItems = card.travelStates.length
                ? `<div class="traveller-region"><span class="traveller-label">States</span><strong>${card.travelStates.join(' • ')}</strong></div>`
                : '';
            innerHTML += `
                <div class="traveller-content anim-element anim-3">
                    <div class="traveller-criteria">${criteriaItems}</div>
                    ${countryItems}
                    ${stateItems}
                </div>
            `;
        }

        if (card.type === 'no-offseason') {
            const criteriaItems = card.noOffseasonCriteria.map(criteria => `
                <div class="traveller-criteria-item">${criteria}</div>
            `).join('');
            innerHTML += `
                <div class="traveller-content anim-element anim-3">
                    <div class="traveller-criteria">${criteriaItems}</div>
                    <p class="no-offseason-detail">${card.noOffseasonDetail}<br><span class="subtitle">Skis remain unnecessary.</span></p>
                </div>
            `;
        }

        if (card.hardestSends) {
            const hardestItems = card.hardestSends.map(send => `
                <div class="hardest-list-item">
                    <span>${send.category}</span>
                    <strong>${send.grade}</strong>
                    <small>${send.name} • ${send.location}</small>
                </div>
            `).join('');
            innerHTML += `<div class="hardest-list anim-element anim-3">${hardestItems}</div>`;
        }

        if (card.bonusStats) {
            const bonusItems = card.bonusStats.map(stat => `
                <div class="hardest-list-item">
                    ${stat.sticker ? `<span class="world-wall-sticker exit-supremecist-sticker">${stat.sticker}</span>` : ''}
                    <span>${stat.label}</span>
                    <strong>${wrapWithNiceSticker(stat.value, stat.value)}</strong>
                </div>
            `).join('');
            innerHTML += `<div class="hardest-list bonus-list anim-element anim-3">${bonusItems}</div>`;
        }

        if (card.angryMuch) {
            innerHTML += `
                <div class="angry-card-content anim-element anim-3">
                    <strong>${card.angryMuch.name}</strong>
                    <span class="angry-grade">${card.angryMuch.grade}</span>
                    <span class="route-crag">${getAreaAndCrag(card.angryMuch.location)}</span>
                    <blockquote>"${card.angryMuch.note}"</blockquote>
                    <span class="intro-label">I'm sure that essay will help you send next time.</span>
                </div>
            `;
        }

        if (card.gumbyMoment) {
            const noteMarkup = card.gumbyMoment.note
                ? `<blockquote>"${card.gumbyMoment.note}"</blockquote>`
                : '';
            innerHTML += `
                <div class="angry-card-content anim-element anim-3">
                    <span class="intro-label">YOU FELL (OR SCREAMED TAKE) ON...</span>
                    <strong>${card.gumbyMoment.name}</strong>
                    <span class="angry-grade">${card.gumbyMoment.grade}</span>
                    <span class="route-crag">${getAreaAndCrag(card.gumbyMoment.location)}</span>
                    ${noteMarkup}
                </div>
            `;
        }

        if (card.refusalToProject) {
            const r = card.refusalToProject;
            const timesText = r.maxTicks === 1 ? 'once' : r.maxTicks === 2 ? 'twice' : `${r.maxTicks} times`;
            innerHTML += `
                <div class="commitment-content anim-element anim-3">
                    <p class="commitment-stat">You didn't tick any route more than <strong>${timesText}</strong>.</p>
                    <p class="commitment-stat">And you did that on <strong>${r.tiedCount} different routes</strong>.</p>
                    <p class="commitment-desc">We would've shown you what routes you climbed the most, but the concept of climbing a route more than ${timesText} seems foreign to you.</p>
                </div>
            `;
        }

        if (card.favoriteRoutes?.length === 1) {
            innerHTML += `
                <div class="favorite-route-content anim-element anim-3">
                    <strong>${card.favoriteRoutes[0].name} <small>${card.favoriteRoutes[0].grade}</small></strong>
                    <span class="route-crag">${getAreaAndCrag(card.favoriteRoutes[0].location)}</span>
                    <span>${wrapWithNiceSticker(`${card.favoriteRoutes[0].ticks} ticks`, card.favoriteRoutes[0].ticks)}</span>
                </div>
            `;
        }

        if (card.favoriteRoutes?.length > 1) {
            const favoriteItems = card.favoriteRoutes.map(route => `
                <div class="card-list-item">
                    <span>${route.name} <small>${route.grade}</small>${route.location ? `<small class="card-list-subtext">${getAreaAndCrag(route.location)}</small>` : ''}</span>
                    <span>${wrapWithNiceSticker(`${route.ticks} ticks`, route.ticks)}</span>
                </div>
            `).join('');
            innerHTML += `<div class="card-list anim-element anim-3">${favoriteItems}</div>`;
        }

        if (card.routeStats) {
            innerHTML += `
                <div class="favorite-route-content anim-element anim-3">
                    <strong>${card.routeStats.name}</strong>
                    <span id="route-pitches-${i}">0 pitches</span>
                    <span id="route-feet-${i}">0 feet</span>
                    <span class="route-crag">${getAreaAndCrag(card.routeStats.location)}</span>
                </div>
            `;
        }

        if (card.saveForBlog) {
            innerHTML += `
                <div class="angry-card-content anim-element anim-3">
                    <strong>${card.saveForBlog.name}</strong>
                    <span class="angry-grade">${card.saveForBlog.grade}</span>
                    <span class="route-crag">${getAreaAndCrag(card.saveForBlog.location)}</span>
                    <blockquote>"${card.saveForBlog.note}"</blockquote>
                </div>
            `;
        }

        if (card.starRoute) {
            const starRouteIntro = card.starRouteIntro
                || `Consensus: ${card.starRoute.avgStars ? card.starRoute.avgStars + ' ★' : ''}`;
            const starRouteDisplayRating = card.starRouteDisplayRating || card.starRoute.grade;
            innerHTML += `
                <div class="angry-card-content anim-element anim-3">
                    <span class="intro-label">${starRouteIntro}</span>
                    <strong>${card.starRoute.name}</strong>
                    <span class="angry-grade">${starRouteDisplayRating}</span>
                    <span class="route-crag">${getAreaAndCrag(card.starRoute.location)}</span>
                    ${card.starRoute.note ? `<blockquote>"${card.starRoute.note}"</blockquote>` : ''}
                </div>
            `;
        }

        if (card.sandbagJudge) {
            const isDowngrade = card.sandbagJudge.type === 'downgrade';
            let phrase = '';
            if (isDowngrade) {
                if (card.sandbagJudge.isTrad) {
                    phrase = `You took that ${card.sandbagJudge.consensus} and logged it as ${card.sandbagJudge.yourRating}. They just don't know how to climb crack`;
                } else {
                    phrase = `You took that ${card.sandbagJudge.consensus} and logged it as ${card.sandbagJudge.yourRating}. Congrats you're either tall, old, or full of shit`;
                }
            } else {
                phrase = `You called that ${card.sandbagJudge.consensus} a ${card.sandbagJudge.yourRating}. We believe you.`;
            }

            innerHTML += `
                <div class="angry-card-content anim-element anim-3">
                    <span class="intro-label">${phrase}</span>
                    <strong>${card.sandbagJudge.route.name}</strong>
                    <span class="angry-grade">${card.sandbagJudge.yourRating} <small style="font-size:1rem; opacity:0.8; font-weight:600;">(vs ${card.sandbagJudge.consensus})</small></span>
                    <span class="route-crag">${getAreaAndCrag(card.sandbagJudge.route.location)}</span>
                    ${card.sandbagJudge.route.note ? `<blockquote>"${card.sandbagJudge.route.note}"</blockquote>` : ''}
                </div>
            `;
        }

        if (card.statLabel) innerHTML += `<p class="stat-label anim-element anim-3">${card.statLabel}</p>`;
        if (card.secondaryText) innerHTML += `<p class="subtitle anim-element anim-3" style="margin-top:20px;">${card.secondaryText}</p>`;
        if (card.showFinalActions) {
            innerHTML += `
                <div class="final-actions anim-element anim-3">
                    <button class="action-btn final-replay-btn" onclick="resetToLanding()">Replay / Upload New File 🔄</button>
                    <a class="heatmap-cta-button" href="${card.heatmapLink || 'heatmap?source=wrapped'}">Career Grade Heatmap <span aria-hidden="true">🔥</span></a>
                </div>
            `;
        }

        slideEl.innerHTML = innerHTML;
        deckContainer.appendChild(slideEl);
    });

    goToSlide(0);
}

function resetToLanding() {
    clearInterval(progressInterval);
    clearTimeout(playbackOverlayTimeout);
    playbackOverlayTimeout = null;
    playbackOverlayCycle++;
    playbackAnimation?.cancel();
    playbackOverlay.hidden = true;
    isPaused = false;
    document.body.classList.remove('is-paused');
    progressElapsed = 0;
    pauseButton.hidden = true;
    landingScreen.classList.add('active');
}

function syncMobileSlideVisibility(activeIndex) {
    const isMobileViewport = window.matchMedia('(max-width: 499px)').matches;

    cardsData.forEach((_, index) => {
        const slide = document.getElementById(`slide-${index}`);
        if (slide) slide.hidden = isMobileViewport && index !== activeIndex;
    });
}

function goToSlide(index) {
    if (index < 0 || index >= cardsData.length) return;

    clearInterval(progressInterval);
    isPaused = false;
    progressElapsed = 0;
    currentSlideIndex = index;

    cardsData.forEach((_, i) => {
        const slide = document.getElementById(`slide-${i}`);
        if (slide) slide.classList.toggle('active', i === currentSlideIndex);
    });
    syncMobileSlideVisibility(currentSlideIndex);

    cardsData.forEach((_, i) => {
        const fill = document.getElementById(`fill-${i}`);
        if (fill) {
            if (i < currentSlideIndex) fill.style.width = '100%';
            else if (i > currentSlideIndex) fill.style.width = '0%';
        }
    });

    const card = cardsData[currentSlideIndex];
    if (card && card.type === 'counter' && card.bigStat) {
        animateCounter(`stat-counter-${currentSlideIndex}`, 0, card.bigStat, 1200, card.statSuffix || '');
    }
    if (card && card.type === 'dual-counter' && card.dualStats) {
        card.dualStats.forEach((stat, idx) => {
            animateCounter(`dual-stat-${currentSlideIndex}-${idx}`, 0, stat.value, 1200, stat.suffix || '');
        });
    }
    if (card && card.type === 'route-stats' && card.routeStats) {
        animateCounter(`route-pitches-${currentSlideIndex}`, 0, card.routeStats.pitches, 900, card.routeStats.pitches === 1 ? ' pitch' : ' pitches');
        animateCounter(`route-feet-${currentSlideIndex}`, 0, card.routeStats.feet, 1100, ' feet');
    }

    startProgress();
}

function nextSlide() {
    if (currentSlideIndex < cardsData.length - 1) {
        goToSlide(currentSlideIndex + 1);
    } else {
        const lastFill = document.getElementById(`fill-${cardsData.length - 1}`);
        if (lastFill) lastFill.style.width = '100%';
    }
}

function prevSlide() {
    goToSlide(Math.max(0, currentSlideIndex - 1));
}

function startProgress() {
    if (isPaused) return;

    const fill = document.getElementById(`fill-${currentSlideIndex}`);
    startTime = Date.now();

    progressInterval = setInterval(() => {
        const elapsed = progressElapsed + Date.now() - startTime;
        const percentage = Math.min((elapsed / slideDuration) * 100, 100);
        if (fill) fill.style.width = `${percentage}%`;

        if (percentage >= 100) {
            clearInterval(progressInterval);
            nextSlide();
        }
    }, 30);
}

function pausePlayback() {
    if (isPaused) return;

    progressElapsed += Date.now() - startTime;
    clearInterval(progressInterval);
    isPaused = true;
    document.body.classList.add('is-paused');
    pauseButton.hidden = true;
    showPlaybackOverlay('pause', true);
}

function resumePlayback() {
    if (!isPaused) return;

    isPaused = false;
    document.body.classList.remove('is-paused');
    pauseButton.hidden = false;
    showPlaybackOverlay('play', false);
    startProgress();
}

function showPlaybackOverlay(type, persist) {
    clearTimeout(playbackOverlayTimeout);
    playbackOverlayTimeout = null;
    const overlayCycle = ++playbackOverlayCycle;
    playbackOverlay.hidden = false;
    playbackAnimation?.cancel();
    playbackLogo.getAnimations().forEach(animation => animation.cancel());
    playbackLogo.className = 'playback-logo';
    void playbackLogo.offsetWidth;
    playbackLogo.className = `playback-logo is-${type}`;
    playbackAnimation = playbackLogo.animate([
        { opacity: 0, transform: 'scale(0.45)' },
        { opacity: 0.95, offset: 0.35 },
        { opacity: 0, transform: 'scale(1.2)' }
    ], {
        duration: 1100,
        easing: 'ease-out',
        fill: 'both'
    });

    if (!persist) {
        playbackOverlayTimeout = setTimeout(() => {
            if (overlayCycle !== playbackOverlayCycle || isPaused) return;
            playbackOverlay.hidden = true;
            playbackOverlayTimeout = null;
        }, 1200);
    }
}

function animateCounter(id, start, end, duration, suffix = '') {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const parentContainer = obj.closest('.stat-box') || obj.parentElement;
    const existingSticker = parentContainer?.querySelector(':scope > .nice-sticker');
    if (existingSticker) existingSticker.remove();

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentVal = Math.floor(progress * (end - start) + start);
        obj.innerHTML = currentVal.toLocaleString() + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else if (isNiceValue(end)) {
            if (parentContainer && !parentContainer.querySelector(':scope > .nice-sticker')) {
                const sticker = document.createElement('span');
                sticker.className = 'nice-sticker';
                sticker.setAttribute('aria-hidden', 'true');
                sticker.textContent = getNiceStickerLabel(end);
                parentContainer.appendChild(sticker);
            }
        }
    };
    window.requestAnimationFrame(step);
}

function openEmailModal() {
    pausePlayback();
    emailModal.hidden = false;
    emailStatus.textContent = '';
    emailStatus.className = 'email-status';
    document.getElementById('emailName').focus();
}

function closeEmailModal() {
    emailModal.hidden = true;
    resumePlayback();
}

function setEmailStatus(message, type = '') {
    emailStatus.textContent = message;
    emailStatus.className = `email-status${type ? ` ${type}` : ''}`;
}

async function sendRopeEmail(event) {
    event.preventDefault();

    if (document.getElementById('emailWebsite').value) return;

    const name = document.getElementById('emailName').value.trim();
    const emailAddressInput = document.getElementById('emailAddress');
    const address = emailAddressInput.value.trim();
    const message = document.getElementById('emailMessage').value.trim();
    if (name.length > 100 || address.length > 254 || message.length > 2000) {
        setEmailStatus('Please shorten your message and try again.', 'error');
        return;
    }

    if (!emailAddressInput.checkValidity() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
        setEmailStatus('Please enter a valid email address so Kevin can reply.', 'error');
        emailAddressInput.focus();
        return;
    }

    if (Date.now() - Number(localStorage.getItem('ropeEmailSentAt') || 0) < emailConfig.cooldownMs) {
        setEmailStatus('Please wait a minute before sending another email.', 'error');
        return;
    }

    if (!window.emailjs || emailConfig.publicKey.startsWith('YOUR_')) {
        setEmailStatus('Email sending is not configured yet. Add the EmailJS IDs in main.js.', 'error');
        return;
    }

    emailSubmit.disabled = true;
    setEmailStatus('Sending...');

    try {
        await emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
            to_email: 'kevinvs757@gmail.com',
            subject: 'I have an old rope for you',
            from_name: name,
            reply_to: address,
            message
        });
        localStorage.setItem('ropeEmailSentAt', String(Date.now()));
        emailForm.reset();
        setEmailStatus('Sent. Kevin will be in touch.', 'success');
    } catch (error) {
        setEmailStatus('Could not send the email. Please try again later.', 'error');
    } finally {
        emailSubmit.disabled = false;
    }
}

// Press-and-hold pauses silently (no overlay or paused state) and resumes on release.
const HOLD_PAUSE_DELAY_MS = 250;
const HOLD_MOVE_TOLERANCE_PX = 12;
let holdTimer = null;
let holdPointerId = null;
let holdOrigin = null;
let isHoldPaused = false;
let suppressNextClick = false;

function cancelHoldTimer() {
    clearTimeout(holdTimer);
    holdTimer = null;
}

function endHold() {
    cancelHoldTimer();
    holdPointerId = null;
    holdOrigin = null;
    if (!isHoldPaused) return;
    isHoldPaused = false;
    isPaused = false;
    startProgress();
}

document.addEventListener('pointerdown', event => {
    suppressNextClick = false;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (pauseButton.hidden || isPaused || holdPointerId !== null) return;
    if (event.target.closest('#pauseButton, .email-modal, .email-dialog, a, button, input, textarea')) return;

    holdPointerId = event.pointerId;
    holdOrigin = { x: event.clientX, y: event.clientY };
    holdTimer = setTimeout(() => {
        holdTimer = null;
        if (isPaused) return;
        progressElapsed += Date.now() - startTime;
        clearInterval(progressInterval);
        isPaused = true;
        isHoldPaused = true;
        suppressNextClick = true;
    }, HOLD_PAUSE_DELAY_MS);
});

document.addEventListener('pointermove', event => {
    if (event.pointerId !== holdPointerId || !holdTimer) return;
    if (Math.hypot(event.clientX - holdOrigin.x, event.clientY - holdOrigin.y) > HOLD_MOVE_TOLERANCE_PX) {
        cancelHoldTimer();
        holdPointerId = null;
    }
});

['pointerup', 'pointercancel'].forEach(type => {
    document.addEventListener(type, event => {
        if (event.pointerId !== holdPointerId) return;
        endHold();
        if (type === 'pointercancel') suppressNextClick = false;
    });
});

document.addEventListener('click', event => {
    if (!suppressNextClick) return;
    suppressNextClick = false;
    event.stopPropagation();
    event.preventDefault();
}, true);

document.addEventListener('contextmenu', event => {
    if (isHoldPaused) event.preventDefault();
});

// Navigation Events
document.addEventListener('click', event => {
    if (event.target.closest('#oldRopeEmail, .email-hit-area')) {
        event.stopPropagation();
        openEmailModal();
        return;
    }

    if (isPaused) {
        if (event.target === pauseButton || event.target.closest('.email-modal, .email-dialog')) {
            return;
        }
        resumePlayback();
    }
});
emailClose.addEventListener('click', closeEmailModal);
emailModal.addEventListener('click', event => {
    if (event.target === emailModal) closeEmailModal();
});
emailForm.addEventListener('submit', sendRopeEmail);
pauseButton.addEventListener('click', (event) => {
    event.stopPropagation();
    pausePlayback();
});
document.getElementById('navRight').addEventListener('click', () => {
    if (isPaused) resumePlayback();
    else nextSlide();
});
document.getElementById('navLeft').addEventListener('click', () => {
    if (isPaused) resumePlayback();
    else prevSlide();
});
window.addEventListener('resize', () => syncMobileSlideVisibility(currentSlideIndex));
document.addEventListener('keydown', (e) => {
    if (isPaused) {
        if (!emailModal.hidden) return;
        resumePlayback();
        return;
    }
    if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});
