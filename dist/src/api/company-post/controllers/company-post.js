"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::company-post.company-post', ({ strapi }) => ({
    async create(ctx) {
        const user = ctx.state.user;
        if (!user)
            return ctx.unauthorized('Utente non autenticato');
        const { data, files } = ctx.request.body;
        let parsedData = {};
        try {
            parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        }
        catch (err) {
            return ctx.badRequest('Formato JSON non valido');
        }
        const entry = await strapi.entityService.create('api::company-post.company-post', {
            data: parsedData,
            files: ctx.request.files,
            populate: ['company', 'media'],
        });
        const sanitizedEntry = await this.sanitizeOutput(entry, ctx);
        return this.transformResponse(sanitizedEntry);
    },
    async find(ctx) {
        const user = ctx.state.user;
        if (!user)
            return ctx.unauthorized('Utente non autenticato');
        // 🔍 Verifica se l'utente è associato a un'azienda
        const company = await strapi.db.query('api::company.company').findOne({
            where: { users_permissions_user: user.id },
        });
        if (company) {
            // 👨‍💼 Se è azienda, mostra solo i suoi post
            ctx.query = {
                ...ctx.query,
                filters: {
                    company: { id: company.id },
                },
                populate: '*',
            };
        }
        else {
            // 👤 Se è candidato o altro → mostra tutti i post aziendali
            ctx.query = {
                ...ctx.query,
                populate: '*',
            };
        }
        const { data, meta } = await super.find(ctx);
        return { data, meta };
    }
}));
