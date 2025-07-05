/**
 * recruiter-request controller
 */
/*
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::recruiter-request.recruiter-request');
*/
// In ./src/api/recruiter-request/controllers/recruiter-request.js
'use strict';

/**
 * recruiter-request controller
 * @type {import('@strapi/strapi').Factories.Factory}
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::recruiter-request.recruiter-request', ({ strapi }) => ({
    // Sovrascrivi il metodo find per includere le relazioni
    async find(ctx) {
        // Aggiungi il parametro 'populate' alla query per recuperare i dettagli delle relazioni
        ctx.query = {
            ...ctx.query,
            populate: ['recruiter', 'company'], // *** QUESTA È LA RIGA FONDAMENTALE DA AGGIUNGERE ***
        };

        // Esegui il metodo find del core controller con i parametri modificati
        const { data, meta } = await super.find(ctx);

        return { data, meta };
    },

    // Sovrascrivi anche il metodo findOne se vuoi che i dettagli vengano popolati quando apri una singola richiesta
    async findOne(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: ['recruiter', 'company'], // Anche qui per la visualizzazione dettagliata di una singola entry
        };
        const { data, meta } = await super.findOne(ctx);
        return { data, meta };
    }
}));