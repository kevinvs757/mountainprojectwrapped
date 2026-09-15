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
const currentYear = new Date().getFullYear();
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

document.getElementById('seasonLabel').textContent = `${currentYear} Edition`;

// --- Standard CSV Parser ---
function parseCSV(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return [];

    const delimiter = lines[0].includes('\t') ? '\t' : ',';
    const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
        let line = lines[i];
        let values = [];
        let insideQuote = false;
        let currentValue = '';

        for (let char of line) {
            if (char === '"') {
                insideQuote = !insideQuote;
            } else if (char === delimiter && !insideQuote) {
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

function getTickYear(dateValue) {
    const dateText = String(dateValue || '').trim();
    const yearMatch = dateText.match(/\b(\d{4})\b/);
    return yearMatch ? Number(yearMatch[1]) : NaN;
}

function getDeepestCrag(location) {
    const levels = String(location || '')
        .split('>')
        .map(level => level.trim())
        .filter(Boolean);

    return levels[levels.length - 1] || 'Other';
}

function isEligibleHardestSend(tick) {
    const styles = String(tick['Style'] || '')
        .split(',')
        .map(value => value.trim().toLowerCase())
        .filter(Boolean);
    const leadStyle = String(tick['Lead Style'] || '').trim().toLowerCase();
    return !styles.some(style => style === 'tr' || style === 'follow')
        && leadStyle !== 'fell/hung';
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
        location: tick['Location'] || ''
    };
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
        stats.saveForBlog
    ].filter(route => route?.url);
    const uniqueRoutes = [...new Map(routes.map(route => [route.url, route])).values()];

    await Promise.all(uniqueRoutes.map(async route => {
        route.imageUrl = await fetchScenicImage(route);
    }));
}

// --- Dynamic Stats Calculator ---
function processTickList(ticks) {
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
    let longestRoute = null;
    let shortestRoute = null;
    const typeCounts = { Sport: 0, Trad: 0, Boulder: 0 };
    let chodesRidden = 0;
    const uniqueChodeRoutes = new Set();
    let jiuJitsuBeltLevel = null;
    let northBendSends = 0;
    let longestFellHungNote = null;
    let easiestFellHung = null;
    let longestNonFellHungNote = null;

    ticks
        .filter(tick => getTickYear(tick['Date']) === currentYear)
        .forEach(tick => {
        // Pitches & Elevation
        const pitches = parseInt(tick['Pitches'] || 1, 10);
        const length = parseInt(tick['Length'] || 0, 10);
        
        totalPitches += isNaN(pitches) ? 1 : pitches;
        totalElevationFeet += isNaN(length) ? 0 : length;

        // Categorize Route Type
        const routeType = tick['Route Type'] || '';
        let category = null;
        if (routeType.includes('Sport')) {
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
        if (Number.isFinite(length) && length > 0) {
            const routeStats = {
                ...getRouteDetails(tick, notes),
                feet: length,
                pitches: Number.isFinite(pitches) && pitches > 0 ? pitches : 1
            };

            if (!longestRoute || length > longestRoute.feet) longestRoute = routeStats;
            if (!shortestRoute || length < shortestRoute.feet) shortestRoute = routeStats;
        }
        if (routeName) {
            if (!routeMap[routeName]) routeMap[routeName] = { ticks: 0, ...getRouteDetails(tick, notes) };
            routeMap[routeName].ticks++;
        }
        if (/North Bend & Vicinity/i.test(location)) {
            if (isEligibleHardestSend(tick)) northBendSends++;

            if (/chode/i.test(routeName)) {
                chodesRidden++;
                uniqueChodeRoutes.add(routeName.toLowerCase());
            }

            const beltMatch = routeName.match(/Shih Tzu Jiu-Jitsu\s+(\d+)/i);
            if (beltMatch) {
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
        if (category && isEligibleHardestSend(tick) && ratingCode > maxSends[category].code) {
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

    // Top Crags
    const topCrags = Object.entries(cragMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, count]) => ({ name, value: `${count} pitches` }));

    const favoriteRouteEntry = Object.entries(routeMap)
        .sort((a, b) => b[1].ticks - a[1].ticks)[0];
    const favoriteRoute = favoriteRouteEntry
        ? { ...favoriteRouteEntry[1], name: favoriteRouteEntry[0] }
        : null;

    // Personas
    const totalStyles = typeCounts.Sport + typeCounts.Trad + typeCounts.Boulder || 1;
    const sportPct = Math.round((typeCounts.Sport / totalStyles) * 100);
    const tradPct = Math.round((typeCounts.Trad / totalStyles) * 100);

    let persona = "Weekend Warrior";
    if (sportPct > 60) persona = "Bolt Clipper";
    else if (tradPct > 40) persona = "Trad Dad/Mom";
    else if (typeCounts.Boulder > typeCounts.Sport) persona = "Pebble Wrestler";

    return {
        totalElevationFeet,
        totalPitches,
        hardestSends: {
            Sport: maxSends.Sport.code !== -1 ? maxSends.Sport : null,
            Trad: maxSends.Trad.code !== -1 ? maxSends.Trad : null,
            Boulder: maxSends.Boulder.code !== -1 ? maxSends.Boulder : null
        },
        topCrags,
        favoriteRoute,
        longestRoute,
        shortestRoute,
        northBender: chodesRidden > 0 && jiuJitsuBeltLevel !== null
            ? { northBendSends, chodesRidden, uniqueChodeRoutes: uniqueChodeRoutes.size, jiuJitsuBeltLevel }
            : null,
        angryMuch: longestFellHungNote && longestFellHungNote.note.length > 70
            ? longestFellHungNote
            : null,
        gumbyMoment: easiestFellHung,
        saveForBlog: longestNonFellHungNote && longestNonFellHungNote.note.length > 100
            ? longestNonFellHungNote
            : null,
        seasonYear: currentYear,
        persona,
        styleRatio: `${sportPct}% Sport • ${tradPct}% Trad`
    };
}

// --- Cards Data Generator ---
function buildCardsFromStats(stats) {
    const cards = [
        {
            id: "welcome",
            theme: "bg-sunset",
            subtitle: `${stats.seasonYear || currentYear} Season`,
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
            id: "topCrags",
            theme: "bg-berry",
            subtitle: "Favorite Haunts",
            title: "Top Crags",
            list: stats.topCrags,
            type: "list"
        }
    ];

    if (stats.favoriteRoute) {
        cards.push({
            id: "favoriteRoute",
            theme: "bg-electric",
            subtitle: "You really like this one I guess",
            title: "Favorite Climbed Route",
            favoriteRoute: stats.favoriteRoute,
            type: "favorite-route"
        });
    }

    if (stats.longestRoute) {
        cards.push({
            id: "longestRoute",
            theme: "bg-emerald",
            subtitle: "Tallest Route Climbed",
            title: "Most Biggest Climb",
            routeStats: stats.longestRoute,
            type: "route-stats"
        });
    }

    if (stats.shortestRoute) {
        cards.push({
            id: "shortestRoute",
            theme: "bg-sunset",
            subtitle: "A Quick One",
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
            subtitle: "Longest Fell/Hung Note",
            title: "Angry Much?",
            angryMuch: stats.angryMuch,
            type: "angry"
        });
    }

    if (stats.gumbyMoment) {
        cards.push({
            id: "gumbyMoment",
            theme: "bg-emerald",
            title: "Humbled by Gravity",
            subtitle: "Easiest Fall/Hung. Don't beat yourself up.",
            gumbyMoment: stats.gumbyMoment,
            type: "gumby"
        });
    }

    if (stats.northBender) {
        cards.push({
            id: "northBender",
            theme: "bg-north-bender",
            subtitle: stats.northBender.uniqueChodeRoutes >= 4
                ? 'You really like north bend and chodes. Do you have any <span class="email-hit-area"><button class="email-link" id="oldRopeEmail" type="button">old ropes</button></span> to part with?'
                : 'You really like north bend. Do you have any <span class="email-hit-area"><button class="email-link" id="oldRopeEmail" type="button">old ropes</button></span> to part with?',
            title: "Local Crusher",
            bonusStats: [
                { label: "North Bend Sends", value: stats.northBender.northBendSends },
                { label: "Chodes Ridden", value: stats.northBender.chodesRidden },
                { label: "Jiu-Jitsu Belt Level", value: stats.northBender.jiuJitsuBeltLevel }
            ],
            type: "bonus"
        });
    }

    if (stats.saveForBlog) {
        cards.push({
            id: "saveForBlog",
            theme: "bg-sunset",
            subtitle: "the most you espoused on a send",
            title: "Save it for your blog",
            saveForBlog: stats.saveForBlog,
            type: "save-for-blog"
        });
    }

    if (hardestSends.length) {
        cards.push({
            id: "hardestSends",
            theme: "bg-nebula",
            subtitle: "Way to go, kid",
            title: "Hardest Sends",
            hardestSends,
            type: "hardest"
        });
    }

    if (cards.length) cards[cards.length - 1].showRestartBtn = true;

    return cards;
}

// --- Extract Export URL ---
function extractExportUrl(userInput) {
    let input = userInput.trim();
    if (!input) return null;

    if (!input.startsWith('http://') && !input.startsWith('https://')) {
        input = 'https://' + input;
    }

    try {
        const url = new URL(input);
        const pathParts = url.pathname.split('/').filter(Boolean);

        if (pathParts[0] === 'user' && pathParts.length >= 3) {
            if (pathParts[3] === 'tick-export') return url.href;
            return `https://www.mountainproject.com/user/${pathParts[1]}/${pathParts[2]}/tick-export`;
        }
    } catch (e) {
        return null;
    }

    return null;
}

// --- Fetch User Ticks ---
async function fetchUserTicks(inputUrl) {
    const targetUrl = extractExportUrl(inputUrl);

    if (!targetUrl) {
        alert('Invalid Mountain Project URL.\n\nPlease paste a full link like:\nhttps://www.mountainproject.com/user/12345789/user-name');
        return;
    }

    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

    fetchUserBtn.textContent = 'Fetching...';
    fetchUserBtn.disabled = true;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const csvText = (await response.text()).replace(/^\uFEFF/, '');
        const firstLine = csvText.split(/\r?\n/, 1)[0] || '';
        if (!/\bDate\b/.test(firstLine) || !/\bRoute\b/.test(firstLine)) {
            throw new Error('The export response was not a Mountain Project tick export');
        }
        const rows = parseCSV(csvText);
        
        if (!rows || rows.length === 0) {
            alert('No ticks found or user ticks are private.');
            return;
        }

        const stats = processTickList(rows);
        startWrapped(stats);
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
        const rows = parseCSV(event.target.result);
        const stats = processTickList(rows);
        startWrapped(stats);
    };
    reader.readAsText(file);
});

fetchUserBtn.addEventListener('click', () => {
    const input = usernameInput.value.trim();
    if (!input) return alert('Please paste your Mountain Project profile URL.');
    fetchUserTicks(input);
});

demoBtn.addEventListener('click', () => {
    const rows = parseCSV(sampleData);
    const stats = processTickList(rows);
    startWrapped(stats);
});

function applyRouteImages() {
    cardsData.forEach((card, index) => {
        const slide = document.getElementById(`slide-${index}`);
        const route = card.favoriteRoute || card.routeStats || card.angryMuch
            || card.gumbyMoment || card.saveForBlog;
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

function startWrapped(stats) {
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
                    <span>${stat.label}</span>
                    <strong>${stat.value}</strong>
                </div>
            `).join('');
            innerHTML += `<div class="hardest-list bonus-list anim-element anim-3">${bonusItems}</div>`;
        }

        if (card.angryMuch) {
            innerHTML += `
                <div class="angry-card-content anim-element anim-3">
                    <strong>${card.angryMuch.name}</strong>
                    <span>${card.angryMuch.grade}</span>
                    <blockquote>"${card.angryMuch.note}"</blockquote>
                </div>
            `;
        }

        if (card.gumbyMoment) {
            const noteMarkup = card.gumbyMoment.note
                ? `<blockquote>"${card.gumbyMoment.note}"</blockquote>`
                : '';
            innerHTML += `
                <div class="gumby-card-content anim-element anim-3">
                    <span class="gumby-label">You fell on:</span>
                    <strong>${card.gumbyMoment.name}</strong>
                    <span class="gumby-grade">${card.gumbyMoment.grade}</span>
                    ${noteMarkup}
                </div>
            `;
        }

        if (card.favoriteRoute) {
            innerHTML += `
                <div class="favorite-route-content anim-element anim-3">
                    <strong>${card.favoriteRoute.name}</strong>
                    <span>${card.favoriteRoute.ticks} ticks</span>
                </div>
            `;
        }

        if (card.routeStats) {
            innerHTML += `
                <div class="favorite-route-content anim-element anim-3">
                    <strong>${card.routeStats.name}</strong>
                    <span id="route-pitches-${i}">0 pitches</span>
                    <span id="route-feet-${i}">0 feet</span>
                </div>
            `;
        }

        if (card.saveForBlog) {
            innerHTML += `
                <div class="angry-card-content anim-element anim-3">
                    <strong>${card.saveForBlog.name}</strong>
                    <span>${card.saveForBlog.grade}</span>
                    <blockquote>"${card.saveForBlog.note}"</blockquote>
                </div>
            `;
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
    clearTimeout(playbackOverlayTimeout);
    playbackOverlayTimeout = null;
    playbackOverlayCycle++;
    playbackAnimation?.cancel();
    playbackOverlay.hidden = true;
    isPaused = false;
    progressElapsed = 0;
    pauseButton.hidden = true;
    landingScreen.classList.add('active');
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
    if (card && card.type === 'route-stats' && card.routeStats) {
        animateCounter(`route-pitches-${currentSlideIndex}`, 0, card.routeStats.pitches, 900, card.routeStats.pitches === 1 ? ' "pitch"' : ' pitches');
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
    pauseButton.hidden = true;
    showPlaybackOverlay('pause', true);
}

function resumePlayback() {
    if (!isPaused) return;

    isPaused = false;
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
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

function openEmailModal() {
    emailModal.hidden = false;
    emailStatus.textContent = '';
    emailStatus.className = 'email-status';
    document.getElementById('emailName').focus();
}

function closeEmailModal() {
    emailModal.hidden = true;
}

function setEmailStatus(message, type = '') {
    emailStatus.textContent = message;
    emailStatus.className = `email-status${type ? ` ${type}` : ''}`;
}

async function sendRopeEmail(event) {
    event.preventDefault();

    if (document.getElementById('emailWebsite').value) return;

    const name = document.getElementById('emailName').value.trim();
    const address = document.getElementById('emailAddress').value.trim();
    const message = document.getElementById('emailMessage').value.trim();
    if (name.length > 100 || address.length > 254 || message.length > 2000) {
        setEmailStatus('Please shorten your message and try again.', 'error');
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
document.addEventListener('click', (event) => {
    if (isPaused && event.target !== pauseButton) resumePlayback();
});
document.addEventListener('keydown', (e) => {
    if (isPaused) {
        resumePlayback();
        return;
    }
    if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});