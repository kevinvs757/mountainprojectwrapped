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