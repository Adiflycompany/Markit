"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyA3-KM7Vu_lzFzUwOfgopxML4mbyB8HeIo",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "mark-it-b512d",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "408332135657",
    appId: "1:408332135657:web:6fc69e61ae420ef5db77fc"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
const db = (0, firestore_1.getFirestore)(app);
exports.db = db;
