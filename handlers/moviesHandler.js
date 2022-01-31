import { getSheetData } from "../lib/index.js";

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 */
const handler = (req, res, next) => {
    try {

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

        const { search, sort } = req.query;
        const query = `Select A, B, C Where LOWER(A) contains LOWER('${search}') or LOWER(C) contains LOWER('${search}') `;

        getSheetData(query).then((data) => {
            res.status(200).json( data );
        });

    } catch (error) {
        console.log(error);
        res.json({ error: err.message }).status(500);
    }
}

export default handler;