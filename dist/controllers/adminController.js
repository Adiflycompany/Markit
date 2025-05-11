"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPresences = exports.deleteUser = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const presenceModel_1 = __importDefault(require("../models/presenceModel"));
const getAllUsers = async (req, res) => {
    res.send('Liste des utilisateurs');
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    await userModel_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
};
exports.deleteUser = deleteUser;
const getAllPresences = async (req, res) => {
    const presences = await presenceModel_1.default.find().populate("user").populate("event");
    res.json(presences);
};
exports.getAllPresences = getAllPresences;
