"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLinkHeader = parseLinkHeader;
function parseLinkHeader(header) {
    var _a;
    const links = {};
    for (const part of (_a = header === null || header === void 0 ? void 0 : header.split(',')) !== null && _a !== void 0 ? _a : []) {
        const section = part.trim();
        const match = section.match(/^<([^>]+)>\s*;\s*rel="?([^"]+)"?/);
        if (match) {
            const [, url, rel] = match;
            links[rel] = url;
        }
    }
    return links;
}
//# sourceMappingURL=utils.js.map