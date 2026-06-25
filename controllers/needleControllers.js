import needle from "../models/needle.js"

//consulta de todos los tipos de las agujas
export async function getAllNeedleTypes (req,res){
    try {
        const needleTypes = await needle.find({})
        console.log(needleTypes)
        res.json(needleTypes)
    } catch (error) {
      console.log('This is not possible' +error)
    }
}

//consulta de las referencias de una aguja
export async function getNeedleDetails (shortName){
    try {
        const needleNumbers = await needle.find({shortName:shortName})
        console.log(needleNumbers)
        res.json(needleNumbers)
    } catch (error) {
        console.log('This is not possible'+ error)
    }
}