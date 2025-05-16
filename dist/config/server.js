"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    host: '0.0.0.0',
    port: process.env.PORT,
    app: {
        keys: [process.env.APP_KEYS],
    },
});
