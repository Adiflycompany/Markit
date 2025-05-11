"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const isAdminMiddleware_1 = __importDefault(require("../middleware/isAdminMiddleware"));
const adminController_1 = require("../controllers/adminController");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const router = express_1.default.Router();
router.get('/presences', authMiddleware_1.default, isAdminMiddleware_1.default, (0, asyncHandler_1.default)(adminController_1.getAllPresences));
router.get('/users', authMiddleware_1.default, isAdminMiddleware_1.default, (0, asyncHandler_1.default)(adminController_1.getAllUsers));
router.delete('/user/:id', authMiddleware_1.default, isAdminMiddleware_1.default, (0, asyncHandler_1.default)(adminController_1.deleteUser));
exports.default = router;
