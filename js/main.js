// --- Sample Climbing Data ---
const sampleData = {
    totalElevationFeet: 14850,
    totalPitches: 142,
    maxGrade: "5.12a",
    maxRouteName: "Optimator",
    maxRouteLocation: "Red Rocks, NV",
    topCrags: [
        { name: "Red River Gorge", pitches: 48 },
        { name: "Smith Rock", pitches: 35 },
        { name: "Red Rocks", pitches: 29 },
        { name: "New River Gorge", pitches: 18 }
    ],
    persona: "Crimp Enthusiast"
};

// --- State Variables ---
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slideDuration = 5000; // 5 seconds per slide
let slideTimer = null;
let progressInterval = null;
let startTime = 0;

// --- DOM Elements ---
const progressContainer = document.getElementById('progressContainer');
const navLeft = document.getElementById('navLeft');
const navRight = document.getElementById('navRight');
const restartBtn = document.getElementById('restartBtn');

// --- Initialize UI ---
function init() {
    // Populate Progress Bar elements
    progressContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        bar.innerHTML = `<div class="progress-fill" id="fill-${i}"></div>`;
        progressContainer.appendChild(bar);
    }

    // Populate Sample Data into DOM
    document.getElementById('pitchStat').textContent = `Across ${sampleData.totalPitches} Pitches`;
    document.getElementById('maxGradeStat').textContent = sampleData.maxGrade;
    document.getElementById('maxGradeRoute').textContent = `"${sampleData.maxRouteName}" • ${sampleData.maxRouteLocation}`;
    document.getElementById('personaBadge').textContent = sampleData.persona;

    // Render Crag List
    const cragListEl = document.getElementById('cragList');
    cragListEl.innerHTML = sampleData.topCrags.map((crag, idx) => `
        <div class="list-item">
            <span>${idx + 1}. ${crag.name}</span>
            <span>${crag.pitches} pitches</span>
        </div>
    `).join('');

    goToSlide(0);
}

// --- Slide Navigation ---
function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    // Clear active timers
    clearTimeout(slideTimer);
    clearInterval(progressInterval);

    currentSlide = index;

    // Update Slide Active States
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });

    // Update Progress Bar Fills
    for (let i = 0; i < totalSlides; i++) {
        const fill = document.getElementById(`fill-${i}`);
        if (i < currentSlide) {
            fill.style.width = '100%';
        } else if (i > currentSlide) {
            fill.style.width = '0%';
        }
    }

    // Trigger Counter Animation on Elevation Slide
    if (currentSlide === 1) {
        animateCounter('elevationStat', 0, sampleData.totalElevationFeet, 1200);
    }

    // Start Auto-Advance Timer
    startProgress();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    } else {
        // Pause auto-advance on last slide
        document.getElementById(`fill-${totalSlides - 1}`).style.width = '100%';
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    } else {
        goToSlide(0);
    }
}

// --- Progress Bar Timer Animation ---
function startProgress() {
    const fill = document.getElementById(`fill-${currentSlide}`);
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

// --- Number Counter Animation ---
function animateCounter(elementId, start, end, duration) {
    const obj = document.getElementById(elementId);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + ' ft';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// --- Event Listeners ---
navRight.addEventListener('click', nextSlide);
navLeft.addEventListener('click', prevSlide);
restartBtn.addEventListener('click', () => goToSlide(0));

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Launch
init();