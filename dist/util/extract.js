"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extract = void 0;
class Extract {
    static tokenHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
exports.Extract = Extract;
//# sourceMappingURL=extract.js.map