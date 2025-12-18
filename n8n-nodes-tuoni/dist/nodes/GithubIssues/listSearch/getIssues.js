"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIssues = getIssues;
const transport_1 = require("../shared/transport");
async function getIssues(filter, paginationToken) {
    const page = paginationToken ? +paginationToken : 1;
    const per_page = 100;
    let responseData = {
        items: [],
        total_count: 0,
    };
    const owner = this.getNodeParameter('owner', '', { extractValue: true });
    const repository = this.getNodeParameter('repository', '', { extractValue: true });
    const filters = [filter, `repo:${owner}/${repository}`];
    responseData = await transport_1.githubApiRequest.call(this, 'GET', '/search/issues', {
        q: filters.filter(Boolean).join(' '),
        page,
        per_page,
    });
    const results = responseData.items.map((item) => ({
        name: item.title,
        value: item.number,
        url: item.html_url,
    }));
    const nextPaginationToken = page * per_page < responseData.total_count ? page + 1 : undefined;
    return { results, paginationToken: nextPaginationToken };
}
//# sourceMappingURL=getIssues.js.map