const sampleHeatmapData = `Date,Route,Rating,Notes,URL,Pitches,Location,Avg Stars,Your Stars,Style,Lead Style,Route Type,Your Rating,Length,Rating Code
2026-02-24,The Fun Place,5.10a,One of those perfect stoic days,https://example.com/route/1,1,Washington > North Bend > The Main Wall,3.6,-1,Lead,,Sport,,80,2600
2026-03-02,The Other Place,5.11b,What a burner,https://example.com/route/2,1,Washington > North Bend > Another Wall,3.8,-1,Lead,,Sport,,90,4900
2026-03-05,Choss Corner,5.8,Smoky and awful,https://example.com/route/3,1,Washington > North Bend > Dirt Wall,1.4,-1,Lead,,Sport,,60,2100
2026-04-09,The Creak,5.9+,A little sandy,https://example.com/route/4,1,Washington > North Bend > Another Wall,2.6,-1,Lead,,Sport,,70,2500
2026-05-16,Rampant,5.10c,Good movement,https://example.com/route/5,1,Oregon > The Gorge > Putnam,3.7,-1,Lead,,Sport,,85,3200
2026-05-28,One More,5.10a/b,Worked quick,https://example.com/route/6,1,Washington > North Bend > The Main Wall,3.1,-1,Lead,,Sport,,75,2800
2025-02-14,Steady Warmup,5.8,Really fun,https://example.com/route/7,1,Colorado > Front Range > Test,3.1,-1,Lead,,Sport,,60,2100
2025-03-01,Long Day,5.12a,Cruxy,https://example.com/route/8,1,Colorado > Front Range > Test,3.3,-1,Lead,,Sport,,90,6600
2025-06-20,Weekend Crag,5.10+,Mellow but polished,https://example.com/route/9,1,Washington > North Bend > Another Wall,4.2,-1,Lead,,Sport,,80,3300
2025-07-03,Hold the Line,5.10d,Powerful,https://example.com/route/10,1,Washington > North Bend > Main Wall,3.5,-1,Lead,,Sport,,85,3500
2024-08-06,Highball,V3,Simple and fun,https://example.com/route/11,1,California > Bishop > Test,3.2,-1,Boulder,,Boulder,,20,20300
2024-09-18,Choss Bouldery,V1,Little slab,https://example.com/route/12,1,California > Bishop > Test,1.9,-1,Boulder,,Boulder,,18,20100
2024-10-12,Deep Crack,5.9,Big old hands,https://example.com/route/13,1,Washington > North Bend > Backcountry,2.7,-1,Lead,,Trad,,60,2400
2024-10-26,Big Time,5.11c,Strong day,https://example.com/route/14,1,Washington > North Bend > Rocky Side,3.9,-1,Lead,,Sport,,95,5200
2024-11-11,Loose Scree,5.7,Quick rope,https://example.com/route/15,1,Oregon > The Gorge > Overlook,2.2,-1,Lead,,Trad,,40,1800
2023-01-15,Winter Climb,5.10-,Cold and fun,https://example.com/route/16,1,Washington > Leavenworth > Crag,3.0,-1,Lead,,Trad,,85,2700
2023-06-30,Laid Back,5.12b,Tough but rewarding,https://example.com/route/17,1,Washington > North Bend > Another Wall,3.8,-1,Lead,,Sport,,100,6900
2023-07-19,Good Day,5.10c/d,Still sending,https://example.com/route/18,1,Washington > North Bend > Another Wall,3.9,-1,Lead,,Sport,,95,3400
2022-05-07,Little Route,5.8,Easy but not bad,https://example.com/route/19,1,Washington > North Bend > False Start,2.7,-1,Lead,,Sport,,35,2100
2022-09-16,Hefty Move,5.12-,Wanted to die,https://example.com/route/20,1,Washington > North Bend > Steep Wall,3.2,-1,Lead,,Sport,,85,6700
2021-06-10,Flagging,5.11a/b,Made it look easy,https://example.com/route/21,1,California > Tahoe > Granite,3.1,-1,Lead,,Sport,,70,4800
2021-07-08,Low Gauge,5.6,Maybe a warmup,https://example.com/route/22,1,Washington > North Bend > Easy Line,1.8,-1,Lead,,Trad,,25,1600`;

const letterOrder = { a: 0, b: 1, c: 2, d: 3 };
const GRADE_FAMILY_LABELS = {
    'all-roped': 'All Roped',
    boulder: 'Boulder',
    sport: 'Sport',
    trad: 'Trad'
};

let currentGradeFamily = 'all-roped';
let currentTickScope = 'sends';
let currentHeatmapRows = [];

function getTextValue(value) {
    return String(value ?? '').trim().toLowerCase();
}

function getRouteTypeText(row) {
    const candidates = [
        row['Route Type'], row.RouteType, row.Type, row.type,
        row.Style, row.style, row['Lead Style'], row['LeadStyle'],
        row.Rating, row['Rating'], row.grade, row['grade'],
        row.Route, row.route
    ];
    return candidates.map(getTextValue).join(' ');
}

function isTopRopeRow(row) {
    const routeText = getRouteTypeText(row);
    return routeText.includes('top rope') || routeText.includes('toprope') || /(^|\s)tr(\s|$)/.test(routeText);
}

function isBoulderRow(row) {
    const routeText = getRouteTypeText(row);
    const ratingValue = getTextValue(row.Rating || row['Rating'] || row.grade || row['grade']);
    return routeText.includes('boulder') || /^v\d/.test(ratingValue);
}

function isSportRow(row) {
    if (isBoulderRow(row)) return false;
    if (isTopRopeRow(row)) return false;
    const routeText = getRouteTypeText(row);
    const ratingValue = getTextValue(row.Rating || row['Rating'] || row.grade || row['grade']);
    if (routeText.includes('sport')) return true;
    if (routeText.includes('trad')) return false;
    return /^5\./.test(ratingValue);
}

function isTradRow(row) {
    if (isBoulderRow(row)) return false;
    if (isTopRopeRow(row)) return false;
    const routeText = getRouteTypeText(row);
    if (routeText.includes('trad')) return true;
    if (routeText.includes('sport')) return false;
    return false;
}

function isSendRow(row) {
    return isEligibleSend(row);
}

function filterRowsForTickScope(rows, scope) {
    if (!Array.isArray(rows) || scope === 'all') return rows || [];
    return rows.filter((row) => isSendRow(row));
}

function filterRowsForGradeFamily(rows, family) {
    if (!Array.isArray(rows)) return [];

    switch (family) {
        case 'boulder':
            return rows.filter((row) => isBoulderRow(row));
        case 'sport':
            return rows.filter((row) => isSportRow(row));
        case 'trad':
            return rows.filter((row) => isTradRow(row));
        case 'all-roped':
        default:
            return rows.filter((row) => !isBoulderRow(row));
    }
}

function getFamilyTitle(familyKey) {
    return GRADE_FAMILY_LABELS[familyKey] || 'All Roped';
}

function syncGradeFamilyButtons() {
    const buttons = document.querySelectorAll('.grade-family-btn');
    buttons.forEach((button) => {
        const isActive = button.dataset.gradeFamily === currentGradeFamily;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}

function updateHeatmapHeader(filteredRows) {
    const title = document.getElementById('heatmapTitle');
    const label = getFamilyTitle(currentGradeFamily);

    if (title) {
        title.textContent = filteredRows.length ? `${label} Grade Heatmap` : `${label} Grade Heatmap`;
    }
}

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

    const headers = records[0].map(header => header.trim());
    const rows = [];

    for (let rowIndex = 1; rowIndex < records.length; rowIndex++) {
        const values = records[rowIndex];
        if (values.length >= headers.length) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            rows.push(row);
        }
    }

    return rows;
}

function getTickYear(dateValue) {
    const dateText = String(dateValue || '').trim();
    const match = dateText.match(/\b(\d{4})\b/);
    return match ? Number(match[1]) : NaN;
}

function normalizeGradeBucket(gradeText) {
    const raw = String(gradeText || '').trim();
    if (!raw) return null;

    const compact = raw.replace(/\s+/g, '').toLowerCase();
    const stripped = compact.replace(/\/.*$/, '').replace(/[()]/g, '');

    const vMatch = stripped.match(/^v(\d+)([+-])?$/);
    if (vMatch) {
        const vNumber = Number(vMatch[1]);
        return `V${vNumber}`;
    }

    const match = stripped.match(/^5\.(\d+)([a-d])?([+-])?$/);
    if (!match) return null;

    const baseGrade = Number(match[1]);
    const modifier = match[3] || '';

    if (baseGrade <= 8) {
        return `5.${baseGrade}`;
    }

    if (baseGrade === 9) {
        return modifier === '+' ? '5.9+' : '5.9';
    }

    let letter = match[2] || null;

    if (!letter) {
        if (modifier === '-') letter = 'a';
        else if (modifier === '+') letter = 'b';
        else letter = 'c';
    }

    return `5.${baseGrade}${letter}`;
}

function gradeSortKey(label) {
    if (!label) return [Infinity, 0];
    if (label.startsWith('V')) {
        const vNumber = Number(label.replace(/^V/i, ''));
        return [1000 + vNumber, 0];
    }

    const match = label.match(/^5\.(\d+)([a-d])?(\+)?$/);
    if (!match) return [Infinity, 0];
    const gradeNumber = Number(match[1]);
    if (gradeNumber <= 8) return [gradeNumber, 0];
    if (gradeNumber === 9) return [gradeNumber, match[3] ? 1 : 0];
    const letter = match[2] || 'c';
    return [gradeNumber, letterOrder[letter] ?? 2];
}

function buildHeatmapMatrix(rows) {
    const counts = new Map();
    const years = new Set();

    rows.forEach((row) => {
        const year = getTickYear(row.Date);
        const rating = row.Rating || row['Rating'] || row.grade || row['grade'];
        const gradeBucket = normalizeGradeBucket(rating);
        if (!Number.isFinite(year) || !gradeBucket) return;

        years.add(year);
        if (!counts.has(year)) counts.set(year, new Map());
        const yearMap = counts.get(year);
        yearMap.set(gradeBucket, (yearMap.get(gradeBucket) || 0) + 1);
    });

    const orderedYears = [...years].sort((a, b) => a - b);
    const allGradeBuckets = [...new Set([...counts.values()].flatMap(map => [...map.keys()]))];
    const gradeLevels = allGradeBuckets.sort((a, b) => gradeSortKey(b)[0] - gradeSortKey(a)[0] || gradeSortKey(b)[1] - gradeSortKey(a)[1]);

    return { years: orderedYears, grades: gradeLevels, counts };
}

function buildLegendScale(value, maxValue) {
    if (!maxValue || !value) return 'rgba(148, 163, 184, 0.08)';
    const intensity = 0.12 + (value / maxValue) * 0.88;
    const hue = 215 - (value / maxValue) * 120;
    return `hsla(${hue}, 80%, 58%, ${intensity})`;
}

function getOfficialGrade(row) {
    return String(row.Rating || row['Rating'] || row.grade || row['grade'] || 'Unknown');
}

function getCellClimbs(rows, year, grade) {
    return rows
        .filter((row) => getTickYear(row.Date) === year && normalizeGradeBucket(getOfficialGrade(row)) === grade)
        .map((row) => ({
            area: getDeepestCrag(row.Location || row.location),
            name: String(row.Route || row.route || 'Unknown route'),
            grade: getOfficialGrade(row)
        }))
        .sort((first, second) => first.area.localeCompare(second.area) || first.name.localeCompare(second.name));
}

function showCellModal(rows, year, grade) {
    const modal = document.getElementById('cellModal');
    const title = document.getElementById('cellModalTitle');
    const eyebrow = document.getElementById('cellModalEyebrow');
    const list = document.getElementById('cellModalList');
    if (!modal || !title || !eyebrow || !list) return;

    const climbs = getCellClimbs(rows, year, grade);
    eyebrow.textContent = `${year} | ${grade}`;
    title.textContent = `${climbs.length} ${climbs.length === 1 ? 'climb' : 'climbs'}`;
    list.innerHTML = '';

    climbs.forEach((climb) => {
        const item = document.createElement('article');
        item.className = 'cell-modal-item';
        const area = document.createElement('p');
        area.className = 'cell-modal-area';
        area.textContent = climb.area;
        const name = document.createElement('h3');
        name.textContent = climb.name;
        const officialGrade = document.createElement('p');
        officialGrade.className = 'cell-modal-grade';
        officialGrade.textContent = climb.grade;
        item.append(area, name, officialGrade);
        list.appendChild(item);
    });

    modal.hidden = false;
    document.body.classList.add('modal-open');
    document.getElementById('cellModalClose')?.focus();
}

function hideCellModal() {
    const modal = document.getElementById('cellModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
}

function renderHeatmap(rows) {
    const container = document.getElementById('heatmapChart');
    if (!container) return;

    const scopedRows = filterRowsForTickScope(rows, currentTickScope);
    const filteredRows = filterRowsForGradeFamily(scopedRows, currentGradeFamily);
    updateHeatmapHeader(filteredRows);

    if (!filteredRows || filteredRows.length === 0) {
        container.innerHTML = '<div class="heatmap-empty">No tick data available for the heatmap.</div>';
        return;
    }

    const { years, grades, counts } = buildHeatmapMatrix(filteredRows);
    if (!years.length || !grades.length) {
        container.innerHTML = '<div class="heatmap-empty">No climb grades were recognized in this dataset.</div>';
        return;
    }

    const maxCount = Math.max(
        ...years.flatMap(year => grades.map(grade => counts.get(year)?.get(grade) || 0)),
        1
    );

    const gridColumns = `56px repeat(${years.length}, minmax(10px, 1fr))`;
    container.style.gridTemplateColumns = gridColumns;
    container.innerHTML = '';

    grades.forEach((grade) => {
        const labelCell = document.createElement('div');
        labelCell.className = 'heatmap-label';
        labelCell.textContent = grade;
        container.appendChild(labelCell);

        years.forEach((year) => {
            const value = counts.get(year)?.get(grade) || 0;
            const cell = document.createElement('div');
            cell.className = `heatmap-cell ${value ? '' : 'empty'}`.trim();
            cell.title = `${year} • ${grade} • ${value} climbs`;
            cell.textContent = value ? value : '';
            cell.style.background = buildLegendScale(value, maxCount);
            if (value) {
                cell.setAttribute('role', 'button');
                cell.tabIndex = 0;
                cell.setAttribute('aria-label', `Show ${value} climbs at ${grade} in ${year}`);
                const openCellDetails = () => showCellModal(filteredRows, year, grade);
                cell.addEventListener('click', openCellDetails);
                cell.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openCellDetails();
                    }
                });
            }
            container.appendChild(cell);
        });
    });

    const yearLabelCell = document.createElement('div');
    yearLabelCell.className = 'heatmap-label';
    yearLabelCell.textContent = 'Year';
    container.appendChild(yearLabelCell);

    years.forEach((year) => {
        const yearCell = document.createElement('div');
        yearCell.className = 'heatmap-year';
        yearCell.textContent = `'${String(year).slice(-2)}`;
        yearCell.title = String(year);
        container.appendChild(yearCell);
    });

    const summaryGrid = document.getElementById('summaryGrid');
    if (summaryGrid) {
        const totalTicks = filteredRows.length;
        const strongestGradeMap = new Map();
        filteredRows.forEach((row) => {
            const grade = normalizeGradeBucket(row.Rating || row['Rating'] || row.grade || row['grade']);
            if (!grade) return;
            const sort = gradeSortKey(grade);
            const existingKey = strongestGradeMap.get(grade);
            if (!existingKey || sort[0] > gradeSortKey(existingKey)[0] || (sort[0] === gradeSortKey(existingKey)[0] && sort[1] > gradeSortKey(existingKey)[1])) {
                strongestGradeMap.set(grade, grade);
            }
        });
        const strongestGrade = [...strongestGradeMap.keys()].sort((a, b) => gradeSortKey(b)[0] - gradeSortKey(a)[0] || gradeSortKey(b)[1] - gradeSortKey(a)[1])[0] || 'N/A';
        const busiestYear = [...years].map(year => ({ year, count: filteredRows.filter(row => getTickYear(row.Date) === year).length })).sort((a, b) => b.count - a.count)[0];

        summaryGrid.innerHTML = `
            <div class="summary-card">
                <div class="label">Total ticks</div>
                <div class="value">${totalTicks}</div>
            </div>
            <div class="summary-card">
                <div class="label">Busiest year</div>
                <div class="value">${busiestYear ? busiestYear.year : '—'}</div>
            </div>
            <div class="summary-card">
                <div class="label">Hardest grade</div>
                <div class="value">${strongestGrade}</div>
            </div>
        `;
    }
}

function getHeatmapDataFromCsvText(csvText) {
    const rows = parseCSV(csvText);
    currentHeatmapRows = rows;
    renderHeatmap(rows);
    document.getElementById('heatmapScreen').hidden = false;
    document.getElementById('landingScreen').classList.remove('active');
    document.getElementById('heatmapTitle').textContent = rows.length ? 'Climbing Grade Heatmap' : 'No grade data yet';
}

function persistState(csvText, profileUrl = '') {
    const payload = { csvText: String(csvText || '').trim(), profileUrl: String(profileUrl || '').trim() };
    sessionStorage.setItem('mpWrappedHeatmapState', JSON.stringify(payload));
}

function hydrateState() {
    try {
        const raw = sessionStorage.getItem('mpWrappedHeatmapState');
        if (!raw) return { csvText: '', profileUrl: '' };
        const parsed = JSON.parse(raw);
        return {
            csvText: String(parsed?.csvText || '').trim(),
            profileUrl: String(parsed?.profileUrl || '').trim()
        };
    } catch (error) {
        return { csvText: '', profileUrl: '' };
    }
}

function extractExportUrl(userInput) {
    return getTickExportUrl(userInput);
}

async function fetchUserTicks(inputUrl) {
    const profileUrl = canonicalizeProfileUrl(inputUrl);
    const targetUrl = getTickExportUrl(profileUrl);
    if (!targetUrl) {
        alert('Invalid Mountain Project URL. Please paste a full link like https://www.mountainproject.com/user/12345678/example');
        return;
    }

    const fetchUserBtn = document.getElementById('fetchUserBtn');
    const originalText = fetchUserBtn.textContent;
    fetchUserBtn.textContent = 'Fetching...';
    fetchUserBtn.disabled = true;

    try {
        const csvText = await fetchTickExport(targetUrl);

        if (parseCSV(csvText).length === 0) {
            alert('No ticks found or user ticks are private.');
            return;
        }

        persistState(csvText, profileUrl);
        getHeatmapDataFromCsvText(csvText);
        trackFeatureAccess(profileUrl, 'heatmap', 'landing');
    } catch (error) {
        alert('Could not load the profile data right now.');
    } finally {
        fetchUserBtn.textContent = originalText;
        fetchUserBtn.disabled = false;
    }
}

function handleCsvUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        const csvText = String(event.target.result || '');
        persistState(csvText, '');
        getHeatmapDataFromCsvText(csvText);
    };
    reader.readAsText(file);
}

function initializeDemo() {
    persistState(sampleHeatmapData, 'demo');
    getHeatmapDataFromCsvText(sampleHeatmapData);
}

function showLanding() {
    document.getElementById('landingScreen').classList.add('active');
    document.getElementById('heatmapScreen').hidden = true;
}

function boot() {
    document.getElementById('cellModalClose').addEventListener('click', hideCellModal);
    document.getElementById('cellModal').addEventListener('click', (event) => {
        if (event.target.dataset.modalClose === 'true') hideCellModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') hideCellModal();
    });

    syncGradeFamilyButtons();
    document.querySelectorAll('input[name="tickScope"]').forEach((input) => {
        input.addEventListener('change', () => {
            if (!input.checked) return;
            currentTickScope = input.value === 'all' ? 'all' : 'sends';
            renderHeatmap(currentHeatmapRows);
        });
    });

    document.querySelectorAll('.grade-family-btn').forEach((button) => {
        button.addEventListener('click', () => {
            currentGradeFamily = button.dataset.gradeFamily || 'all-roped';
            syncGradeFamilyButtons();
            renderHeatmap(currentHeatmapRows);
        });
    });

    document.getElementById('fetchUserBtn').addEventListener('click', () => {
        const value = document.getElementById('usernameInput').value.trim();
        if (!value) {
            alert('Please paste your Mountain Project profile URL first.');
            return;
        }
        fetchUserTicks(value);
    });

    document.getElementById('usernameInput').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') document.getElementById('fetchUserBtn').click();
    });

    document.getElementById('csvInput').addEventListener('change', (event) => {
        const [file] = event.target.files || [];
        if (file) {
            document.getElementById('fileName').textContent = file.name;
            handleCsvUpload(file);
        }
    });

    document.getElementById('demoBtn').addEventListener('click', initializeDemo);
    document.getElementById('resetBtn').addEventListener('click', () => {
        showLanding();
    });

    const urlParams = new URLSearchParams(window.location.search);
    const saved = hydrateState();
    if (saved.csvText) {
        getHeatmapDataFromCsvText(saved.csvText);
        if (urlParams.get('source') === 'wrapped' && canonicalizeProfileUrl(saved.profileUrl)) {
            trackFeatureAccess(saved.profileUrl, 'heatmap', 'wrapped-link');
            window.history.replaceState({}, '', 'heatmap');
        }
        return;
    }

    const encodedCsv = urlParams.get('csv');
    if (encodedCsv) {
        try {
            const decoded = decodeURIComponent(encodedCsv);
            persistState(decoded, urlParams.get('profileUrl') || '');
            getHeatmapDataFromCsvText(decoded);
            return;
        } catch (error) {
            console.warn('Could not decode CSV query payload.', error);
        }
    }

    const profileFromUrl = urlParams.get('profileUrl');
    if (profileFromUrl) {
        fetchUserTicks(profileFromUrl);
    }
}

boot();
