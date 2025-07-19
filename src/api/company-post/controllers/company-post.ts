import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::company-post.company-post', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized('Utente non autenticato');
    }

    const { data, files } = ctx.request.body;
    let parsedData = {};

    try {
      parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    } catch (err) {
      return ctx.badRequest('Formato JSON non valido');
    }

    // ✅ NON imposta company, lo lasciamo al frontend
    // parsedData.company = Number(user.entityId);  <-- rimuovi questa riga

    const entry = await strapi.entityService.create('api::company-post.company-post', {
      data: parsedData,
      files: ctx.request.files,
      populate: ['company', 'media'],
    });

    const sanitizedEntry = await this.sanitizeOutput(entry, ctx);
    return this.transformResponse(sanitizedEntry);
  },
}));
