import pc from 'picocolors';
import needle from "../models/needle.js";
//consulta de todos los tipos de las agujas
export async function getAllNeedleTypes() {
    try {
        const data = await needle.find({});
        const needleTypes = data.map((type) => ({
            name: type.name,
            shortName: type.shortName,
            overview: type.overview,
        }));
        return needleTypes;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(pc.yellow(`This is not possible!!! ${message}`));
    }
}
//consulta de las referencias de una aguja
export async function getNeedleDetails(shortName) {
    try {
        const needleNumbers = await needle.find({ shortName });
        return needleNumbers;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(pc.yellow(`This is not possible!!! ${message}`));
    }
}
