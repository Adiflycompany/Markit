"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const presenceSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: String, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });
const Presence = mongoose_1.default.model('Presence', presenceSchema);
exports.default = Presence;
