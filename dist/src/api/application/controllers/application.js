"use strict";
// Path: src/api/application/controllers/application.ts
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * application controller
 */
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::application.application', ({ strapi }) => ({
    /**
     * Sovrascrive il metodo update predefinito per gestire l'aggiornamento dello stato della candidatura.
     * Questo metodo è chiamato quando si esegue una richiesta PUT a /api/applications/:id
     */
    async update(ctx) {
        const { id } = ctx.params; // Estrae l'ID del record di applicazione dai parametri dell'URL
        const data = ctx.request.body.data; // Estrae i dati da aggiornare dal corpo della richiesta (formato {"data": {...}})
        // Verifica che l'ID sia presente
        if (!id) {
            return ctx.badRequest('ID della candidatura è richiesto.');
        }
        // Verifica che i dati siano presenti
        if (!data) {
            return ctx.badRequest('Dati per l\'aggiornamento sono richiesti.');
        }
        try {
            // Utilizza strapi.db.query per aggiornare il record specifico.
            // Questo bypassa il controller predefinito e ti dà un controllo diretto sul database.
            const updatedEntity = await strapi.db.query('api::application.application').update({
                where: { id: Number(id) }, // Filtra per l'ID della candidatura
                data, // I dati da aggiornare (es. { applicationStatus: "accettata" })
            });
            // Se l'entità non è stata trovata o aggiornata, restituisce un 404
            if (!updatedEntity) {
                return ctx.notFound('Candidatura non trovata o non aggiornabile.');
            }
            // Restituisce l'entità aggiornata
            return ctx.send(updatedEntity);
        }
        catch (error) {
            // Gestisce eventuali errori durante l'aggiornamento
            console.error(`Errore durante l'aggiornamento della candidatura ${id}:`, error);
            return ctx.internalServerError('Errore interno del server durante l\'aggiornamento della candidatura.');
        }
    },
}));
