function getDeepestCrag(location) {
    const levels = String(location || '')
        .split('>')
        .map(level => level.trim())
        .filter(Boolean);

    if (levels.length === 0) return 'Other';
    let result = levels[levels.length - 1];
    if (levels.length >= 2) {
        const directionalRegex = /\b(north|south|east|west|left|right|upper|lower|main)\b/i;
        if (directionalRegex.test(result)) {
            const parent = levels[levels.length - 2];
            result = `${parent}, ${result}`;
        }
    }
    return result
        .replace(/\bNorth\b/gi, 'N')
        .replace(/\bSouth\b/gi, 'S')
        .replace(/\bEast\b/gi, 'E.')
        .replace(/\bWest\b/gi, 'W.');
}

async function fetchTickExport(targetUrl) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const jinaProxyUrl = `https://r.jina.ai/http://${targetUrl.replace(/^https?:\/\//i, '')}`;
    const allOriginsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

    const fetchExport = async (requestUrl) => {
        const response = await fetch(requestUrl, { signal: controller.signal });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        const responseText = (await response.text()).replace(/^\uFEFF/, '');
        const headerMatch = responseText.match(/(?:^|\r?\n)(Date,Route,)/);
        if (!headerMatch) throw new Error('The response was not a Mountain Project tick export');

        const headerIndex = headerMatch.index + headerMatch[0].length - headerMatch[1].length;
        return responseText.slice(headerIndex).trim();
    };

    try {
        return await Promise.any([jinaProxyUrl, allOriginsProxyUrl].map(fetchExport));
    } finally {
        clearTimeout(timeoutId);
        controller.abort();
    }
}