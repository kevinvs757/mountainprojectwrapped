// --- Raw Sample Data ---
const sampleData = `Date\tRoute\tRating\tNotes\tURL\tPitches\tLocation\tAvg Stars\tYour Stars\tStyle\tLead Style\tRoute Type\tYour Rating\tLength\tRating Code
9/8/2026\tCorrugation Corner\t5.7\tW Annie! Spooky but secure\thttps://www.mountainproject.com/route/105872293/corrugation-corner\t3\tCalifornia > Lake Tahoe > Highway 50 Corridor > Lover's Leap > Main Formation > Main Wall > Main Wall\t3.9\t-1\tLead\tOnsight\tTrad\t\t360\t1800
8/29/2026\tThere and Back and There and Back and There and Back Again\t5.11a\t\thttps://www.mountainproject.com/route/124998566/there-and-back-and-there-and-back-and-there-and-back-again\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Bessemer Mountain > North Bessemer Creek > Helm's Deep\t2.4\t-1\tLead\tOnsight\tSport\t\t50\t4600
8/25/2026\tSunset Strip\t5.10+\tSwapped leads w Rob. Led 1, 3, 6+7, 9, 11. Fell on the sport 10d slab. Linking 6 and 7 was a mistake.\thttps://www.mountainproject.com/route/108398190/sunset-strip\t12\tInternational > North America > Canada > British Columbia > Squamish > Stawamus Chief > The Dihedrals\t3.7\t-1\tLead\tFell/Hung\tTrad\t\t930\t3300
8/18/2026\tEllie's Sweet Kiss\t5.9+\t\thttps://www.mountainproject.com/route/106523720/ellies-sweet-kiss\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Far Side > Interstate Park > (c) Eastern Block\t2.8\t-1\tLead\t\tSport\t\t75\t2500
8/18/2026\tInsomniac\t5.8\t\thttps://www.mountainproject.com/route/107783765/insomniac\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Far Side > Interstate Park > (a) Headlight Point\t3\t-1\tFollow\t\tSport\t\t90\t2100
8/18/2026\tEating Rocks\t5.6\t\thttps://www.mountainproject.com/route/107783754/eating-rocks\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Far Side > Interstate Park > (a) Headlight Point\t1\t-1\tFollow\t\tSport\t\t35\t1600
8/18/2026\tNocturnal Remission\t5.7\tW Evan\thttps://www.mountainproject.com/route/108172312/nocturnal-remission\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Far Side > Interstate Park > (a) Headlight Point\t2.3\t-1\t\t\tSport\t\t50\t1800
8/18/2026\tAfter Hours\t5.10a\t\thttps://www.mountainproject.com/route/202743265/after-hours\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Middle Fork Campground Crag\t3.3\t4\tLead\t\tSport\t5.10a\t65\t2600
8/17/2026\tDelicate Heave\t5.10+\t\thttps://www.mountainproject.com/route/202743078/delicate-heave\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Middle Fork Campground Crag\t2.6\t3\tLead\t\tSport\t5.10c\t45\t3300
8/17/2026\tHarmonious Springs\t5.8\t\thttps://www.mountainproject.com/route/201389675/harmonious-springs\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Middle Fork Campground Crag\t2.1\t-1\tLead\t\tSport\t\t40\t2100
8/17/2026\tFive Hundred\t5.7\t\thttps://www.mountainproject.com/route/201385829/five-hundred\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Middle Fork Campground Crag\t2.9\t-1\tLead\t\tSport\t\t40\t1800
8/10/2026\tOrthogonal Projection\t5.11b\tAldous is right, 11b\thttps://www.mountainproject.com/route/126257388/orthogonal-projection\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Mt Washington > Crag of the 20s > (a) Upper Wall > (b) Quadratic Cave\t3\t3\tLead\t\tSport\t5.11b\t80\t4900
8/10/2026\tOrthogonal Projection\t5.11b\t\thttps://www.mountainproject.com/route/126257388/orthogonal-projection\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Mt Washington > Crag of the 20s > (a) Upper Wall > (b) Quadratic Cave\t3\t3\tLead\tFell/Hung\tSport\t5.11b\t80\t4900
7/30/2026\tSpontaneous Deforestation\t5.8\tW rob. Great stuff. I thought the layback before the bulge was the crux. A 70m is fine if you don't mind some tomfoolery.\thttps://www.mountainproject.com/route/201719230/spontaneous-deforestation\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Stegosaurus Butte > Fee Demo Wall\t3.9\t-1\tLead\tOnsight\tTrad\t\t130\t2100
7/24/2026\tOrphan\t5.9\t\thttps://www.mountainproject.com/route/106236039/orphan\t1\tInternational > North America > Canada > British Columbia > Squamish > Murrin Park > Block and Tackle\t2.7\t-1\tLead\tOnsight\tTrad\t\t50\t2400
7/13/2026\tDark Arts\t5.10d\tThe dark arts are finding rests\thttps://www.mountainproject.com/route/116584584/dark-arts\t1\tOregon > Portland & The Gorge > Broughton Bluff > Bat Wall\t3.7\t-1\tLead\tFlash\tSport\t\t80\t3500
7/12/2026\tSuperstition\t5.10c\t\thttps://www.mountainproject.com/route/107526980/superstition\t1\tOregon > Portland & The Gorge > Broughton Bluff > Bat Wall\t3.3\t-1\tLead\tFlash\tSport\t\t70\t3200
7/12/2026\tRed Eye [E]\t5.1\tLinked from classic crack, also very fun! Perhaps reachy to get over the shelf up top\thttps://www.mountainproject.com/route/106206829/red-eye-e\t1\tOregon > Portland & The Gorge > Broughton Bluff > Red Wall\t3\t-1\tLead\tOnsight\tSport\t\t60\t3000
7/12/2026\tClassic Crack\t5.9+\tSlippery but very fun! Linked into red eye\thttps://www.mountainproject.com/route/105789513/classic-crack\t1\tOregon > Portland & The Gorge > Broughton Bluff > Red Wall\t2.7\t-1\tLead\tOnsight\tTrad\t\t35\t2500
7/5/2026\tRiptide\t5.9+\tW dyl, doubles in .75 and 1, best to link. Great stuff\thttps://www.mountainproject.com/route/107651987/riptide\t2\tNew Hampshire > Lakes Region > New Durham Area (Longstack, Devil's Den, Rines Hill, etc.) > Longstack Precipice > 3. The Big Wall\t3.1\t-1\tLead\t\tTrad\t\t170\t2500
6/29/2026\tCultureshock\t5.12a\tGot through 5 bolts, shut down at upper crux. Been doing R dropknee, bumping L hand to the sidepull, then no idea where to reach w R hand.\thttps://www.mountainproject.com/route/105793317/cultureshock\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Deception Crags > Nevermind Wall\t3.4\t-1\tLead\tFell/Hung\tSport\t\t55\t6600
6/29/2026\tCultureshock\t5.12a\tBolt by bolt pretty much\thttps://www.mountainproject.com/route/105793317/cultureshock\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Deception Crags > Nevermind Wall\t3.4\t-1\tLead\tFell/Hung\tSport\t\t55\t6600
6/29/2026\tLove Bucket\t5.10c\t\thttps://www.mountainproject.com/route/106887421/love-bucket\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Deception Crags > Nevermind Wall\t2.4\t-1\tLead\tFell/Hung\tSport\t\t50\t3200
6/26/2026\tGhosts Of War\t5.8\t\thttps://www.mountainproject.com/route/109389437/ghosts-of-war\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Far Side > Interstate Park > (c) Eastern Block\t1.5\t-1\tLead\t\tSport\t\t50\t2100
6/26/2026\tHurricane\t5.10c\t\thttps://www.mountainproject.com/route/107787753/hurricane\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Far Side > Interstate Park > (c) Eastern Block\t2.8\t-1\tLead\tOnsight\tSport\t\t40\t3200
6/26/2026\tEllie's Sweet Kiss\t5.9+\t\thttps://www.mountainproject.com/route/106523720/ellies-sweet-kiss\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Far Side > Interstate Park > (c) Eastern Block\t2.8\t-1\tLead\tFlash\tSport\t\t75\t2500
6/16/2026\tForest Bathing (Shinrin-Yoku)\t5.8+\tDid a coward's Fred Becky style: in boots on top rope\thttps://www.mountainproject.com/route/124829933/forest-bathing-shinrin-yoku\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Stegosaurus Butte > The Rump > The Goods\t2.5\t3\tTR\t\tTrad\t\t80\t2200
6/13/2026\tDetox\t5.11a\t\thttps://www.mountainproject.com/route/202812920/detox\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Mt Washington > Salal Point Crags > Serenity Point\t2.8\t-1\tLead\tOnsight\tSport, TR\t5.10+\t75\t4600
6/13/2026\tContact High\t5.11a\t\thttps://www.mountainproject.com/route/202813272/contact-high\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Mt Washington > Salal Point Crags > Serenity Point\t3.1\t-1\tLead\tOnsight\tSport, TR\t5.10+\t75\t4600
6/13/2026\tTouch the Sky\t5.10b\t\thttps://www.mountainproject.com/route/202813448/touch-the-sky\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Mt Washington > Salal Point Crags > Serenity Point\t3.6\t-1\tLead\tOnsight\tSport\t5.10a\t75\t2900
6/12/2026\tDivergence\t5.12a\tSuper fun getting to the crux. Crux seems crazy!\thttps://www.mountainproject.com/route/203015196/divergence\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 38 > Mt Washington > Salal Point Crags > Serenity Point\t3.4\t-1\tLead\tFell/Hung\tSport, TR\t\t85\t6600
6/11/2026\tRiffraff\t5.10d\tWas a little wet. Jugs off the crack help. Add it to the little si crack circuit\thttps://www.mountainproject.com/route/202504105/riffraff\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 32; Little Si > World Wall Group > Burdo World\t2\t-1\tTR\t\tTrad\t\t40\t3500
6/6/2026\tEat a Peach\t5.7\tNice to have a 4 at the top.\thttps://www.mountainproject.com/route/108692982/eat-a-peach\t1\tWashington > South-Central & Yakima > Tieton River > The Bend > Bend North\t2.6\t-1\tLead\tOnsight\tTrad\t\t60\t1800
6/6/2026\tEd's Jam\t5.8\tDidn't love the alpine feel of the approach pitch. I guess I don't know what 4th class is\thttps://www.mountainproject.com/route/106539493/eds-jam\t2\tWashington > South-Central & Yakima > Tieton River > The Bend > Bend Center\t3.4\t-1\tLead\tOnsight\tTrad\t\t\t2100
6/4/2026\tThe Nameless Tower\t5.10d\t\thttps://www.mountainproject.com/route/107759719/the-nameless-tower\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 32; Little Si > The Woods Group > (a) Midland\t3.1\t-1\tLead\t\tSport\t\t80\t3500
6/4/2026\tSituation Room\t5.11a\t\thttps://www.mountainproject.com/route/109005966/situation-room\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 32; Little Si > British Aisles > (d) AWOL\t2.8\t-1\tLead\t\tSport\t\t80\t4600
6/4/2026\tShih Tzu Jiu-Jitsu 11: Puppy Madness\t5.12a\tNailed lower cruxes only to pump out on crimps below anchor.\thttps://www.mountainproject.com/route/124228629/shih-tzu-jiu-jitsu-11-puppy-madness\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 32; Little Si > The Woods Group > (b) The Woods\t3\t-1\tLead\tFell/Hung\tSport\t\t100\t6600
6/4/2026\tSweet and Sticky\t5.9\tWait I never knew this went to the second set of anchors! One of n bends best 5.9s.\thttps://www.mountainproject.com/route/105827410/sweet-and-sticky\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 32; Little Si > The Woods Group > (a) Midland\t2.7\t3\tLead\t\tSport\t5.8\t80\t2400
5/23/2026\tHacky Sack\t5.10a/b\tBok bok bok bok bok\thttps://www.mountainproject.com/route/202648418/hacky-sack\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 32; Little Si > Canopy Crag Group > (d) Love Shack\t2.1\t-1\tLead\t\tSport\t\t50\t2800
5/20/2026\tA Berry Good Time\t5.10a\tOne move crux after second bolt. Crack has moss regrowing in it, needs a re-cleaning. Passive gear would've been nice due to this. Save a 1 or 2 for the top.\thttps://www.mountainproject.com/route/123229783/a-berry-good-time\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Stegosaurus Butte > The Rump > Room With A View\t3\t-1\tLead\t\tTrad\t\t60\t2600
5/20/2026\tDeep Roots\t5.9+\t\thttps://www.mountainproject.com/route/122908046/deep-roots\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Stegosaurus Butte > The Rump > The Goods\t3.9\t-1\tLead\t\tTrad\t\t100\t2500
5/20/2026\tLittle Lost Handjammer\t5.9\t\thttps://www.mountainproject.com/route/124348171/little-lost-handjammer\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Stegosaurus Butte > The Rump > The Butte-tresses\t2.9\t-1\tLead\tOnsight\tTrad\t\t35\t2400
5/16/2026\tRight of Nothing But the Jam\t5.10+\tBring 3 .75s to stitch up the 15 ft crux.\thttps://www.mountainproject.com/route/119555040/right-of-nothing-but-the-jam\t1\tWashington > Central Region > Ancient Lakes & Judith Pond > Judith Pond > West Wall\t3.3\t-1\tLead\tFell/Hung\tTrad\t5.10+\t50\t3300
5/16/2026\tNothing But the Jam\t5.11b/c\tFell/hung a few times. Tough! I did all the moves.\thttps://www.mountainproject.com/route/120493738/nothing-but-the-jam\t1\tWashington > Central Region > Ancient Lakes & Judith Pond > Judith Pond > West Wall\t3.5\t-1\tTR\t\tTrad\t\t60\t5100
4/27/2026\tFinished Business\t5.10b/c\tLowered in for the crux pitch after doing BBP, that counts as a full tick right?\thttps://www.mountainproject.com/route/124969670/finished-business\t3\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Stegosaurus Butte > The Rump > The Bad and the Ugly\t3.6\t-1\tLead\tFlash\tTrad\t\t260\t3100
4/27/2026\tBusiness Before Pleasure\t5.8\tLed 1 & 3 w Andrew, cheeky after work spring multi.\thttps://www.mountainproject.com/route/124969741/business-before-pleasure\t3\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Stegosaurus Butte > The Rump > The Bad and the Ugly\t3.2\t-1\tLead\t\tTrad\t\t270\t2100
4/26/2026\t[L] Deep Breakfast\t5.12b\tGot a few clips up off the ledge\thttps://www.mountainproject.com/route/125000319/l-deep-breakfast\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Bessemer Mountain > North Bessemer Creek > Helm's Deep\t3\t-1\tLead\tFell/Hung\tSport\t\t75\t6900
4/26/2026\tHobbit Chodes\t5.11b/c\t\thttps://www.mountainproject.com/route/124998682/hobbit-chodes\t1\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Bessemer Mountain > North Bessemer Creek > Helm's Deep\t2.4\t-1\tLead\t\tSport\t5.11c\t45\t5100
4/25/2026\tButte-alicious\t5.10b\t\thttps://www.mountainproject.com/route/201171450/butte-alicious\t2\tWashington > Central-West Cascades & Seattle > North Bend & Vicinity > Exit 34; Middle Fork & Taylor River > Stegosaurus Butte > The Rump > The Butte-tresses\t3.1\t-1\tTR\t\tTrad\t\t200\t2900`;

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
    return year >= 2000 && year <= currentSeasonYear + 1 ? year : null;
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

document.getElementById('seasonLabel').textContent = `${activeSeasonYear} Edition`;

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

function isEligibleHardestSend(tick) {
    const styles = String(tick['Style'] || '')
        .split(',')
        .map(value => value.trim().toLowerCase())
        .filter(Boolean);
    const leadStyle = String(tick['Lead Style'] || '').trim().toLowerCase();
    const notes = String(tick['Notes'] || '');
    return !styles.some(style => style === 'tr' || style === 'follow')
        && leadStyle !== 'fell/hung'
        && !/\b(?:fall|fell|hung|hang|attempt)\b/i.test(notes);
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
        Boulder: { code: -1, grade: "N/A", name: "N/A", location: "N/A" }
    };

    const cragMap = {};
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
        if (yourRating && consensusRating && isEligibleHardestSend(tick)) {
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
            if (!routeMap[routeName]) routeMap[routeName] = { ticks: 0, ...getRouteDetails(tick, notes) };
            routeMap[routeName].ticks++;
        }
        if (/North Bend & Vicinity/i.test(location)) {
            const exitMatch = location.match(/Exit\s+(32|34|38)\b/i);
            if (exitMatch) northBendExitCounts[exitMatch[1]]++;

            const isNorthBendSend = isEligibleHardestSend(tick);
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
        if (category && maxSends[category] && isEligibleHardestSend(tick) && ratingCode > maxSends[category].code) {
            maxSends[category] = {
                code: ratingCode,
                grade: tick['Rating'] || 'Unknown',
                name: tick['Route'] || 'Unknown Route',
                location: getDeepestCrag(tick['Location'])
            };
        }

        // Crag Counts
        const mainCrag = getDeepestCrag(tick['Location']);
        if (mainCrag) {
            cragMap[mainCrag] = (cragMap[mainCrag] || 0) + 1;
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
        .map(([name, count]) => ({ name, value: `${count} ${count === 1 ? 'tick' : 'ticks'}` }));

    const favoriteRouteEntry = Object.entries(routeMap)
        .sort((a, b) => b[1].ticks - a[1].ticks);
    const favoriteRouteTicks = favoriteRouteEntry[0]?.[1].ticks || 0;
    const favoriteRoutes = favoriteRouteTicks > 1
        ? favoriteRouteEntry
            .filter(([, route]) => route.ticks === favoriteRouteTicks)
            .slice(0, 5)
            .map(([name, route]) => ({ ...route, name }))
        : [];
    const favoriteRoute = favoriteRoutes.length === 1 ? favoriteRoutes[0] : null;
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
            Boulder: maxSends.Boulder.code !== -1 ? maxSends.Boulder : null
        },
        topCrags,
        favoriteRoute,
        favoriteRoutes,
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
                    label: 'Most-ticked exit',
                    value: `#${stats.northBender.northBendExitSupremecist.exit} (${stats.northBender.northBendExitSupremecist.count})`,
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
            subtitle: stats.northBender.uniqueChodeRoutes >= 4
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

demoBtn.addEventListener('click', () => {
    const csvText = sampleData;
    const rows = parseCSV(csvText);
    const stats = processTickList(rows, activeSeasonYear);
    persistWrappedHeatmapState(csvText, '');
    startWrapped(stats, { csvText, profileUrl: '' });
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
                    <span>${idx + 1}. ${item.name}</span>
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
                    <span class="route-crag">${getDeepestCrag(card.angryMuch.location)}</span>
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
                    <span class="route-crag">${getDeepestCrag(card.gumbyMoment.location)}</span>
                    ${noteMarkup}
                </div>
            `;
        }

        if (card.favoriteRoutes?.length === 1) {
            innerHTML += `
                <div class="favorite-route-content anim-element anim-3">
                    <strong>${card.favoriteRoutes[0].name} <small>${card.favoriteRoutes[0].grade}</small></strong>
                    <span>${wrapWithNiceSticker(`${card.favoriteRoutes[0].ticks} ticks`, card.favoriteRoutes[0].ticks)}</span>
                </div>
            `;
        }

        if (card.favoriteRoutes?.length > 1) {
            const favoriteItems = card.favoriteRoutes.map(route => `
                <div class="card-list-item">
                    <span>${route.name} <small>${route.grade}</small></span>
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
                    <span class="route-crag">${getDeepestCrag(card.routeStats.location)}</span>
                </div>
            `;
        }

        if (card.saveForBlog) {
            innerHTML += `
                <div class="angry-card-content anim-element anim-3">
                    <strong>${card.saveForBlog.name}</strong>
                    <span class="angry-grade">${card.saveForBlog.grade}</span>
                    <span class="route-crag">${getDeepestCrag(card.saveForBlog.location)}</span>
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
                    <span class="route-crag">${getDeepestCrag(card.starRoute.location)}</span>
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
                    <span class="route-crag">${getDeepestCrag(card.sandbagJudge.route.location)}</span>
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