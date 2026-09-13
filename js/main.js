// --- Default Sample Data ---
const sampleData = {
    totalElevationFeet: 14850,
    totalPitches: 142,
    maxGrade: "5.11b",
    maxRouteName: "Spent",
    maxRouteLocation: "Washington",
    topCrags: [
        { name: "Washington", value: "4 pitches" },
        { name: "Red River Gorge", value: "35 pitches" },
        { name: "Smith Rock", value: "29 pitches" },
        { name: "Red Rocks", value: "18 pitches" }
    ],
    persona: "Bolt Clipper",
    styleRatio: "100% Sport • 0% Trad"
};

// --- App State ---
let cardsData = [];
let currentSlideIndex = 0;
const slideDuration = 5000;
let progressInterval = null;
let startTime = 0;

// --- DOM Elements ---
const landingScreen = document.getElementById('landingScreen');
const csvInput = document.getElementById('csvInput');
const fileName = document.getElementById('fileName');
const usernameInput = document.getElementById('usernameInput');
const fetchUserBtn = document.getElementById('fetchUserBtn');
const demoBtn = document.getElementById('demoBtn');
const deckContainer = document.getElementById('storyDeck');
const progressContainer = document.getElementById('progressContainer');

// --- Standard CSV Parser ---
function parseCSV(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
        let line = lines[i];
        let values = [];
        let insideQuote = false;
        let currentValue = '';

        for (let char of line) {
            if (char === '"') {
                insideQuote = !insideQuote;
            } else if (char === ',' && !insideQuote) {
                values.push(currentValue.trim().replace(/^"|"$/g, ''));
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue.trim().replace(/^"|"$/g, ''));

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

// --- Dynamic Stats Calculator using ticks.csv Schema ---
function processTickList(ticks) {
    let totalElevationFeet = 0;
    let totalPitches = 0;
    let highestRatingCode = -1;
    let maxGrade = "N/A";
    let maxRouteName = "N/A";
    let maxRouteLocation = "N/A";
    
    const cragMap = {};
    const typeCounts = { Sport: 0, Trad: 0, Boulder: 0 };

    ticks.forEach(tick => {
        // 1. Pitches & Elevation (Length column)
        const pitches = parseInt(tick['Pitches'] || 1, 10);
        const length = parseInt(tick['Length'] || 0, 10);
        
        totalPitches += isNaN(pitches) ? 1 : pitches;
        totalElevationFeet += isNaN(length) ? 0 : length;

        // 2. Hardest Send via Rating Code
        const ratingCode = parseInt(tick['Rating Code'] || 0, 10);
        if (ratingCode > highestRatingCode) {
            highestRatingCode = ratingCode;
            maxGrade = tick['Rating'] || 'Unknown';
            maxRouteName = tick['Route'] || 'Unknown Route';
            
            // Extract primary area from Location string (e.g., "Washington > ...")
            const rawLoc = tick['Location'] || '';
            maxRouteLocation = rawLoc.split('>')[0].trim() || 'Crag';
        }

        // 3. Crag Counts
        const mainCrag = (tick['Location'] || '').split('>')[0]?.trim() || 'Other';
        if (mainCrag) {
            cragMap[mainCrag] = (cragMap[mainCrag] || 0) + 1;
        }

        // 4. Style Analysis via Route Type
        const routeType = tick['Route Type'] || '';
        if (routeType.includes('Sport')) typeCounts.Sport++;
        else if (routeType.includes('Trad')) typeCounts.Trad++;
        else if (routeType.includes('Boulder')) typeCounts.Boulder++;
    });

    // Sort Top Crags
    const topCrags = Object.entries(cragMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, count]) => ({ name, value: `${count} pitches` }));

    // Calculate Personas
    const totalStyles = typeCounts.Sport + typeCounts.Trad + typeCounts.Boulder || 1;
    const sportPct = Math.round((typeCounts.Sport / totalStyles) * 100);
    const tradPct = Math.round((typeCounts.Trad / totalStyles) * 100);

    let persona = "Weekend Warrior";
    if (sportPct > 60) persona = "Bolt Clipper";
    else if (tradPct > 40) persona = "Trad Purist";
    else if (typeCounts.Boulder > typeCounts.Sport) persona = "Pad Stacker";

    return {
        totalElevationFeet: totalElevationFeet,
        totalPitches: totalPitches,
        maxGrade: maxGrade,
        maxRouteName: maxRouteName,
        maxRouteLocation: maxRouteLocation,
        topCrags: topCrags.length ? topCrags : sampleData.topCrags,
        persona: persona,
        styleRatio: `${sportPct}% Sport • ${tradPct}% Trad`
    };
}

// --- Fetch User Ticks via Public CORS Proxy ---
async function fetchUserTicks(usernameOrId) {
    const targetUrl = `https://www.mountainproject.com/user/${usernameOrId}/tick-export`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

    fetchUserBtn.textContent = 'Fetching...';
    fetchUserBtn.disabled = true;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Could not fetch user data');
        
        const csvText = await response.text();
        const rows = parseCSV(csvText);
        
        if (rows.length === 0) {
            alert('No ticks found for this user or export URL restricted.');
            fetchUserBtn.textContent = 'Go';
            fetchUserBtn.disabled = false;
            return;
        }

        const stats = processTickList(rows);
        startWrapped(stats);
    } catch (err) {
        alert('Could not fetch public ticks. Using sample data instead.');
        startWrapped(sampleData);
    } finally {
        fetchUserBtn.textContent = 'Go';
        fetchUserBtn.disabled = false;
    }
}

// --- Cards Data Generator ---
function buildCardsFromStats(stats) {
    return [
        {
            id: "welcome",
            theme: "bg-sunset",
            subtitle: "2026 Season",
            title: "Mountain Project<br>Wrapped",
            statLabel: "Tap right to see your year in review 🧗",
            type: "intro"
        },
        {
            id: "elevation",
            theme: "bg-emerald",
            subtitle: "Vertical Gain",
            bigStat: stats.totalElevationFeet,
            statSuffix: " ft",
            statLabel: "Vertical Feet Climbed",
            secondaryText: `Across ${stats.totalPitches} Pitches`,
            type: "counter"
        },
        {
            id: "maxGrade",
            theme: "bg-nebula",
            subtitle: "Peak Performance",
            title: "Hardest Send",
            bigStatDisplay: stats.maxGrade,
            statLabel: `"${stats.maxRouteName}" • ${stats.maxRouteLocation}`,
            type: "standard"
        },
        {
            id: "topCrags",
            theme: "bg-berry",
            subtitle: "Favorite Haunts",
            title: "Top Crags",
            list: stats.topCrags,
            type: "list"
        },
        {
            id: "persona",
            theme: "bg-electric",
            subtitle: "Your Climbing Identity",
            title: "You Are A",
            badge: stats.persona,
            statLabel: stats.styleRatio,
            showRestartBtn: true,
            type: "summary"
        }
    ];
}

// --- Event Handlers & File Loaders ---
csvInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    fileName.textContent = file.name;
    const reader = new FileReader();
    reader.onload = (event) => {
        const rows = parseCSV(event.target.result);
        const stats = processTickList(rows);
        startWrapped(stats);
    };
    reader.readAsText(file);
});

fetchUserBtn.addEventListener('click', () => {
    const user = usernameInput.value.trim();
    if (!user) return alert('Please enter a username or MP user ID.');
    fetchUserTicks(user);
});

demoBtn.addEventListener('click', () => {
    startWrapped(sampleData);
});

function startWrapped(stats) {
    cardsData = buildCardsFromStats(stats);
    landingScreen.classList.remove('active');
    renderDeck();
}

// --- Deck Render & Navigation Engines ---
function renderDeck() {
    deckContainer.innerHTML = '';
    progressContainer.innerHTML = '';

    cardsData.forEach((card, i) => {
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        bar.innerHTML = `<div class="progress-fill" id="fill-${i}"></div>`;
        progressContainer.appendChild(bar);

        const slideEl = document.createElement('section');
        slideEl.className = `card-slide ${card.theme} ${i === 0 ? 'active' : ''}`;
        slideEl.id = `slide-${i}`;

        let innerHTML = `<p class="subtitle anim-element anim-1">${card.subtitle || ''}</p>`;

        if (card.title) innerHTML += `<h2 class="title anim-element anim-2">${card.title}</h2>`;

        if (card.type === 'counter') {
            innerHTML += `<div class="big-stat anim-element anim-2" id="stat-counter-${i}">0</div>`;
        } else if (card.bigStatDisplay) {
            innerHTML += `<div class="big-stat anim-element anim-2">${card.bigStatDisplay}</div>`;
        }

        if (card.badge) innerHTML += `<div class="badge anim-element anim-3">${card.badge}</div>`;

        if (card.list) {
            const listItems = card.list.map((item, idx) => `
                <div class="card-list-item">
                    <span>${idx + 1}. ${item.name}</span>
                    <span>${item.value}</span>
                </div>
            `).join('');
            innerHTML += `<div class="card-list anim-element anim-3">${listItems}</div>`;
        }

        if (card.statLabel) innerHTML += `<p class="stat-label anim-element anim-3">${card.statLabel}</p>`;
        if (card.secondaryText) innerHTML += `<p class="subtitle anim-element anim-3" style="margin-top:20px;">${card.secondaryText}</p>`;
        if (card.showRestartBtn) innerHTML += `<button class="action-btn anim-element anim-3" onclick="resetToLanding()">Replay / Upload New File 🔄</button>`;

        slideEl.innerHTML = innerHTML;
        deckContainer.appendChild(slideEl);
    });

    goToSlide(0);
}

function resetToLanding() {
    clearInterval(progressInterval);
    landingScreen.classList.add('active');
}

function goToSlide(index) {
    if (index < 0 || index >= cardsData.length) return;

    clearInterval(progressInterval);
    currentSlideIndex = index;

    cardsData.forEach((_, i) => {
        const slide = document.getElementById(`slide-${i}`);
        if (slide) slide.classList.toggle('active', i === currentSlideIndex);
    });

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
    const fill = document.getElementById(`fill-${currentSlideIndex}`);
    startTime = Date.now();

    progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const percentage = Math.min((elapsed / slideDuration) * 100, 100);
        if (fill) fill.style.width = `${percentage}%`;

        if (percentage >= 100) {
            clearInterval(progressInterval);
            nextSlide();
        }
    }, 30);
}

function animateCounter(id, start, end, duration, suffix = '') {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// Controls
document.getElementById('navRight').addEventListener('click', nextSlide);
document.getElementById('navLeft').addEventListener('click', prevSlide);
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});