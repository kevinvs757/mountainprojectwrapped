// --- Card Data Array ---
const cardsData = [
    {
        id: "welcome",
        theme: "bg-sunset",
        subtitle: "2026 Season",
        title: "Mountain Project<br>Wrapped",
        statLabel: "Tap right to see your year in numbers 🧗",
        type: "intro"
    },
    {
        id: "elevation",
        theme: "bg-emerald",
        subtitle: "Vertical Gain",
        bigStat: 14850,
        statSuffix: " ft",
        statLabel: "Vertical Feet Climbed",
        secondaryText: "Across 142 Pitches",
        type: "counter"
    },
    {
        id: "maxGrade",
        theme: "bg-nebula",
        subtitle: "Peak Performance",
        title: "Hardest Send",
        bigStatDisplay: "5.12a",
        statLabel: '"Optimator" • Red Rocks, NV',
        type: "standard"
    },
    {
        id: "topCrags",
        theme: "bg-berry",
        subtitle: "Favorite Haunts",
        title: "Top Crags",
        list: [
            { name: "Red River Gorge", value: "48 pitches" },
            { name: "Smith Rock", value: "35 pitches" },
            { name: "Red Rocks", value: "29 pitches" },
            { name: "New River Gorge", value: "18 pitches" }
        ],
        type: "list"
    },
    {
        id: "persona",
        theme: "bg-electric",
        subtitle: "Your Climbing Identity",
        title: "You Are A",
        badge: "Crimp Enthusiast",
        statLabel: "82% Sport • 18% Trad",
        showRestartBtn: true,
        type: "summary"
    }
];

// --- Engine State ---
let currentSlideIndex = 0;
const slideDuration = 5000;
let progressInterval = null;
let startTime = 0;

const deckContainer = document.getElementById('storyDeck');
const progressContainer = document.getElementById('progressContainer');

// --- Render Cards dynamically from objects ---
function renderDeck() {
    deckContainer.innerHTML = '';
    progressContainer.innerHTML = '';

    cardsData.forEach((card, i) => {
        // Build Progress Bar
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        bar.innerHTML = `<div class="progress-fill" id="fill-${i}"></div>`;
        progressContainer.appendChild(bar);

        // Build Card HTML based on Type
        const slideEl = document.createElement('section');
        slideEl.className = `card-slide ${card.theme} ${i === 0 ? 'active' : ''}`;
        slideEl.id = `slide-${i}`;

        let innerHTML = `<p class="subtitle anim-element anim-1">${card.subtitle || ''}</p>`;

        if (card.title) {
            innerHTML += `<h2 class="title anim-element anim-2">${card.title}</h2>`;
        }

        if (card.type === 'counter') {
            innerHTML += `<div class="big-stat anim-element anim-2" id="stat-counter-${i}">0</div>`;
        } else if (card.bigStatDisplay) {
            innerHTML += `<div class="big-stat anim-element anim-2">${card.bigStatDisplay}</div>`;
        }

        if (card.badge) {
            innerHTML += `<div class="badge anim-element anim-3">${card.badge}</div>`;
        }

        if (card.list) {
            const listItems = card.list.map((item, idx) => `
                <div class="card-list-item">
                    <span>${idx + 1}. ${item.name}</span>
                    <span>${item.value}</span>
                </div>
            `).join('');
            innerHTML += `<div class="card-list anim-element anim-3">${listItems}</div>`;
        }

        if (card.statLabel) {
            innerHTML += `<p class="stat-label anim-element anim-3">${card.statLabel}</p>`;
        }

        if (card.secondaryText) {
            innerHTML += `<p class="subtitle anim-element anim-3" style="margin-top:20px;">${card.secondaryText}</p>`;
        }

        if (card.showRestartBtn) {
            innerHTML += `<button class="action-btn anim-element anim-3" onclick="goToSlide(0)">Replay Story 🔄</button>`;
        }

        slideEl.innerHTML = innerHTML;
        deckContainer.appendChild(slideEl);
    });

    goToSlide(0);
}

// --- Card Navigation Engine ---
function goToSlide(index) {
    if (index < 0 || index >= cardsData.length) return;

    clearInterval(progressInterval);
    currentSlideIndex = index;

    // Toggle active classes
    cardsData.forEach((_, i) => {
        const slide = document.getElementById(`slide-${i}`);
        slide.classList.toggle('active', i === currentSlideIndex);
    });

    // Sync Progress Fills
    cardsData.forEach((_, i) => {
        const fill = document.getElementById(`fill-${i}`);
        if (i < currentSlideIndex) fill.style.width = '100%';
        else if (i > currentSlideIndex) fill.style.width = '0%';
    });

    // Run Counter Animation if Card Type is Counter
    const card = cardsData[currentSlideIndex];
    if (card.type === 'counter' && card.bigStat) {
        animateCounter(`stat-counter-${currentSlideIndex}`, 0, card.bigStat, 1200, card.statSuffix || '');
    }

    startProgress();
}

function nextSlide() {
    if (currentSlideIndex < cardsData.length - 1) {
        goToSlide(currentSlideIndex + 1);
    } else {
        document.getElementById(`fill-${cardsData.length - 1}`).style.width = '100%';
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
        fill.style.width = `${percentage}%`;

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

// Launch Engine
renderDeck();