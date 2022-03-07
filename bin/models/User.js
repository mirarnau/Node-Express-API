"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    psicoProfile: { type: String, required: true },
    role: { type: String, required: true },
    profilePic: { type: String, required: false },
    creationDate: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
