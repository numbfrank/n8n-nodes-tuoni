"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
const transport_1 = require("../shared/transport");
async function getUsers(filter, paginationToken) {
    const page = paginationToken ? +paginationToken : 1;
    const per_page = 100;
    let responseData = {
        items: [],
        total_count: 0,
    };
    try {
        responseData = await transport_1.githubApiRequest.call(this, 'GET', '/search/users', {
            q: filter,
            page,
            per_page,
        });
    }
    catch {
    }
    const results = responseData.items.map((item) => ({
        name: item.login,
        value: item.login,
        url: item.html_url,
    }));
    const nextPaginationToken = page * per_page < responseData.total_count ? page + 1 : undefined;
    return { results, paginationToken: nextPaginationToken };
}
//# sourceMappingURL=getUsers.js.map