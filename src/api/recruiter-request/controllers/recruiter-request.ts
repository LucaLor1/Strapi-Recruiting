'use strict';

/**
 * recruiter-request controller
 * @type {import('@strapi/strapi').Factories.Factory}
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::recruiter-request.recruiter-request', ({ strapi }) => ({
    // Sovrascrivi il metodo find per includere le relazioni
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: ['recruiter', 'company'],
        };

        const { data, meta } = await super.find(ctx);

        return { data, meta };
    },

    // Sovrascrivi anche findOne
    async findOne(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: ['recruiter', 'company'],
        };
        const { data, meta } = await super.findOne(ctx);
        return { data, meta };
    },

    // ✅ NUOVO METODO update
    async update(ctx) {
        const { id } = ctx.params;
        const { data } = ctx.request.body;

        if (!id) {
            return ctx.badRequest('ID is required');
        }

        if (!data) {
            return ctx.badRequest('Data is required');
        }

        const updatedEntity = await strapi.db.query('api::recruiter-request.recruiter-request').update({
            where: { id: Number(id) },
            data,
        });

        if (!updatedEntity) {
            return ctx.notFound('Recruiter Request not found');
        }

        return ctx.send(updatedEntity);
    },
}));