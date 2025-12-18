"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueGetDescription = void 0;
const descriptions_1 = require("../../shared/descriptions");
const showOnlyForIssueGet = {
    operation: ['get'],
    resource: ['issue'],
};
exports.issueGetDescription = [
    {
        ...descriptions_1.issueSelect,
        displayOptions: { show: showOnlyForIssueGet },
    },
];
//# sourceMappingURL=get.js.map