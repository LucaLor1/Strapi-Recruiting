"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET', 'someSuperSecretValue'),
    },
    apiToken: {
        salt: env('API_TOKEN_SALT', 'KmoQONC/RLSmRf9i2Db/kg=='), // ← usa quello che hai generato
    },
});
