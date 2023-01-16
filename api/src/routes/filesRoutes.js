const express = require('express')
const { getFormattedFiles } = require('../controllers/filesControllers')
const router = express.Router()

/** 
 * @swagger 
 *   components: 
 *     schemas:
 *      File:
 *        type: object
 *        properties:
 *          file:
 *            type: string
 *          lines: 
 *            type: array
 *        example: 
 *          file: "test2.csv"
 *          lines: [{ "text": "ruCjUwzcRKUhbr", "number": "56864", "hex": "411b9dc1e423b8f9afc17830ae81c126" }]    
 */ 

/** 
 * @swagger 
 *   /files/data: 
 *     get:
 *      summary: Retrieves all available files in JSON format.
 *      tags: [File]
 *      responses:
 *        200:
 *          description: Retrieves all available CSV files with their corresponding data, and then transforms it into a JSON object
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/File'
 *                
 */ 

router.get('/', getFormattedFiles)

module.exports = router