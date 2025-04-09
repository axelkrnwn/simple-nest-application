"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hasher = void 0;
const bcrypt = require("bcrypt");
class Hasher {
    static saltOrRounds = 10;
    static verify = async (password, hashed) => {
        return await bcrypt.compare(password, hashed);
    };
    static hash = async (password) => {
        const hashPass = await bcrypt.hash(password, this.saltOrRounds);
        return hashPass;
    };
}
exports.Hasher = Hasher;
//# sourceMappingURL=hash.js.map