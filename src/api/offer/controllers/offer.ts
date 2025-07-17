/**
 * offer controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::offer.offer', ({ strapi }) => ({
  async delete(ctx) {
    const { id } = ctx.params;

    if (!id) {
      return ctx.badRequest('ID is required');
    }

    // Cancella il record dal DB
    const entity = await strapi.db.query('api::offer.offer').delete({
      where: { id: Number(id) },
    });

    if (!entity) {
      return ctx.notFound('Offer not found');
    }

    return ctx.send(null, 204);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body.data;

    if (!id) {
      return ctx.badRequest('ID is required');
    }

    if (!data) {
      return ctx.badRequest('Data is required');
    }

    const updatedEntity = await strapi.db.query('api::offer.offer').update({
      where: { id: Number(id) },
      data,
    });

    if (!updatedEntity) {
      return ctx.notFound('Offer not found');
    }

    return ctx.send(updatedEntity);
  },
}));