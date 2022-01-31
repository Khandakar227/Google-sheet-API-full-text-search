import { google } from "googleapis";
import axios from "axios";
import Papa from "papaparse";
import { config } from "dotenv";

config();

//GOOGLE API SETUP
const spreadsheetId = process.env.SPREADSHEETID;
const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n");

/**
 * 
 * @param {string} tableQuery Query language string. Quite similar to SQL queries.
 * example: \
 ``` Select A, B, C Limit 10 ``` \
 * A, B & C are column ids in Google sheet. Limit is a reserved keyword in google query language. \

 For adding parameters dynamically: \
 ``` Select A, B, C Where A contains '${params}' or C contains '${params}' ``` \
 ``` Where B contains '${params}' ``` \

 * For more information: [https://developers.google.com/chart/interactive/docs/querylanguage](https://developers.google.com/chart/interactive/docs/querylanguage)
 * 
 * @param {any} googleSheetOptions 
 * @returns {Promise<any>}
 */

export const getSheetData = async (tableQuery = 'Select A, B, C Limit 10',
    googleSheetOptions = { spreadsheetId: spreadsheetId, clientEmail: clientEmail, privateKey: privateKey, sheetId: 2067756176 }) => {

    const gAuth = new google.auth.JWT(
        googleSheetOptions.clientEmail,
        undefined,
        googleSheetOptions.privateKey,
        ["https://www.googleapis.com/auth/spreadsheets.readonly",])

    const authorization = await gAuth.getRequestHeaders();

    let options = {
        url: `https://docs.google.com/spreadsheets/d/${googleSheetOptions.spreadsheetId}/gviz/tq`,
        params: {
            tq: tableQuery,
            gid: googleSheetOptions.sheetId,
            tqx: "out:csv"
        },
        method: "get",
        headers: authorization
    };

    try {
        const { data } = await axios.request(options)
        if (data.length) {
            const { data: parsedData, errors } = Papa.parse(data, { dynamicTyping: true, header: true })

            if (errors) {
                console.log(errors);
            }
            return parsedData
        }
        else {
            return data
        }
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}
