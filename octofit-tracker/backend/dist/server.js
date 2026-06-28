"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db');
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
    }
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend listening on port ${port}`);
    });
};
startServer();
