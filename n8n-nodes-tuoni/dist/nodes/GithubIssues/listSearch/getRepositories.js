"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepositories = getRepositories;
const transport_1 = require("../shared/transport");
async function getRepositories(filter, paginationToken) {
    const owner = this.getCurrentNodeParameter('owner', { extractValue: true });
    const page = paginationToken ? +paginationToken : 1;
    const per_page = 100;
    const q = `${filter !== null && filter !== void 0 ? filter : ''} user:${owner} fork:true`;
    let responseData = {
        items: [],
        total_count: 0,
    };
    try {
        responseData = await transport_1.githubApiRequest.call(this, 'GET', '/search/repositories', {
            q,
            page,
            per_page,
        });
    }
    catch {
    }
    const results = responseData.items.map((item) => ({
        name: item.name,
        value: item.name,
        url: item.html_url,
    }));
    const nextPaginationToken = page * per_page < responseData.total_count ? page + 1 : undefined;
    return { results, paginationToken: nextPaginationToken };
}
//# sourceMappingURL=getRepositories.js.map