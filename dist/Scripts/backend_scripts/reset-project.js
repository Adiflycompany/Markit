"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const moveDirectories = async (userInput) => {
    try {
        const srcPath = path_1.default.join(__dirname, '../../');
        const destPath = path_1.default.join(__dirname, '../../../archive');
        if (userInput === 'yes') {
            await fs_extra_1.default.ensureDir(destPath);
            await fs_extra_1.default.move(srcPath, path_1.default.join(destPath, `project-backup-${Date.now()}`));
            console.log('✅ Project moved to archive.');
        }
        else {
            console.log('❌ Operation cancelled by user.');
        }
    }
    catch (error) {
        const typedError = error;
        console.error(`❌ Error during script execution: ${typedError.message}`);
    }
};
const askUser = () => {
    console.log('Do you want to archive the current project? (yes/no)');
    process.stdin.once('data', (data) => {
        const answer = data.toString().trim().toLowerCase();
        moveDirectories(answer);
    });
};
askUser();
