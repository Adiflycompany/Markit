"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.post('/register', userController_1.register);
router.post('/login', userController_1.login);
router.delete('/delete', userController_1.deleteAccount);
router.post('/forgot-password', userController_1.forgotPassword);
router.post('/reset-password', userController_1.resetPassword);
exports.default = router;
