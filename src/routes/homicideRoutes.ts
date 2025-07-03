import express from 'express';
import { getHomicidesByYearAndLocation, getTaxaHomicidiosPorRegiao } from '../controllers/homicideController';

const router = express.Router();
/**
 * @swagger
 * /homicidios:
 *   get:
 *     summary: Retorna dados de homicídios filtrados por ano, região ou UF.
 *     parameters:
 *       - in: query
 *         name: ano
 *         schema:
 *           type: integer
 *         description: Ano desejado.
 *       - in: query
 *         name: regiao
 *         schema:
 *           type: string
 *         description: Nome da região (Norte, Nordeste, etc.).
 *       - in: query
 *         name: UF
 *         schema:
 *           type: string
 *         description: Sigla da Unidade Federativa (ex: SP, BA).
 *     responses:
 *       200:
 *         description: Lista de registros.
 */
router.get("/homicidios", getHomicidesByYearAndLocation);

/**
 * @swagger
 * /homicidios/regions:
 *   get:
 *     summary: Retorna dados de homicídios para todas as regiões.
 *     responses:
 *       200:
 *         description: Lista de registros.
 */
router.get("/homicidios/regioes", getTaxaHomicidiosPorRegiao);

export default router;
