"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Schéma Mongoose
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    entreprise: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true });
// Méthode d'instance : comparer mot de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
    try {
        console.log("🔍 Entered password:", enteredPassword);
        console.log("🔑 Hashed password in DB:", this.password);
        return await bcryptjs_1.default.compare(enteredPassword, this.password);
    }
    catch (error) {
        console.error("❌ Erreur lors de la comparaison des mots de passe :", error);
        return false;
    }
};
// Hachage du mot de passe avant sauvegarde
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password"))
            return next();
        console.log("🔒 Hachage du mot de passe...");
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        console.log("✅ Mot de passe haché :", this.password);
        next();
    }
    catch (error) {
        console.error("❌ Erreur lors du hachage du mot de passe :", error);
        next(error);
    }
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
