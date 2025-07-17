// File: src/api/candidate/controllers/candidate.ts

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::candidate.candidate', ({ strapi }) => ({
  /**
   * Override the default findOne method to retrieve a single candidate by ID.
   * This might be useful for explicit control or debugging.
   */
  async findOne(ctx) {
    const { id } = ctx.params;

    if (!id) {
      return ctx.badRequest('ID is required');
    }

    // Puoi aggiungere qui la logica di populazione se hai relazioni complesse
    // che vuoi includere nella risposta. Esempio: populate: ['users_permissions_user']
    const entity = await strapi.db.query('api::candidate.candidate').findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      // Se l'entità non è trovata, restituisci un 404 (Not Found)
      return ctx.notFound('Candidato non trovato.');
    }

    // Strapi V4 si aspetta che i dati siano incapsulati in un oggetto 'data'
    // quando restituisci una singola entry tramite un controller personalizzato.
    return { data: entity };
  },

  /**
   * Override the default update method to modify a candidate's profile.
   * This ensures explicit handling of the update logic.
   */
  async update(ctx) {
    const { id } = ctx.params;
    const { data } = ctx.request.body; // I dati di aggiornamento sono in ctx.request.body.data

    if (!id) {
      return ctx.badRequest('ID è richiesto per l\'aggiornamento.');
    }

    if (!data) {
      return ctx.badRequest('Dati per l\'aggiornamento sono richiesti.');
    }

    try {
      const updatedEntity = await strapi.db.query('api::candidate.candidate').update({
        where: { id: Number(id) },
        data,
      });

      if (!updatedEntity) {
        return ctx.notFound('Candidato non trovato per l\'aggiornamento.');
      }

      // Anche per l'aggiornamento, incapsula i dati in un oggetto 'data'
      return { data: updatedEntity };

    } catch (error) {
      // Gestione degli errori più robusta
      strapi.log.error(`Errore durante l'aggiornamento del candidato ${id}:`, error);
      return ctx.internalServerError('Si è verificato un errore durante l\'aggiornamento del candidato.');
    }
  },
  /**
   * Override del metodo find (GET /candidates)
   * Usa l'implementazione di default per ora.
   */
  async find(ctx) {
    // Chiamare l'implementazione di default del CoreController
    // per gestire tutti i filtri, popolazioni, ecc.
    return await super.find(ctx);
  },

  /**
   * Override del metodo create (POST /candidates)
   * Questa è la parte più importante per il tuo problema di registrazione.
   * Anche qui, useremo l'implementazione di default.
   */
  async create(ctx) {
    // Chiamare l'implementazione di default del CoreController
    // per gestire la creazione dell'entità.
    return await super.create(ctx);
  },

  /**
   * Override del metodo delete (DELETE /candidates/:id)
   * Usa l'implementazione di default per ora.
   */
  async delete(ctx) {
    // Chiamare l'implementazione di default del CoreController
    return await super.delete(ctx);
  },
}));