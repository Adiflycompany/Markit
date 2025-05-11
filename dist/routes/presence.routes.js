"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const presenceController_1 = require("../controllers/presenceController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
;
const router = express_1.default.Router();
router.post('/scan', authMiddleware_1.default, presenceController_1.createPresence);
router.get('/', authMiddleware_1.default, presenceController_1.getAllPresences);
router.get('/user/:userId', authMiddleware_1.default, presenceController_1.getUserPresences);
router.delete('/:id', authMiddleware_1.default, presenceController_1.deletePresence);
router.get('/export', authMiddleware_1.default, presenceController_1.exportPresencesToCSV);
exports.default = router;
