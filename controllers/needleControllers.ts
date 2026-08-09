import pc from 'picocolors'
import needle from "../models/needle.ts"

interface NeedleDocument {
  name: string
  shortName: string
  overview: string
}

//consulta de todos los tipos de las agujas
export async function getAllNeedleTypes() {
  try {
    const data = await needle.find({})
    const needleTypes = data.map((type: NeedleDocument) => ({
      name: type.name,
      shortName: type.shortName,
      overview: type.overview,
    }))
    return needleTypes
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(pc.yellow(`This is not possible!!! ${message}`))
  }
}

//consulta de las referencias de una aguja
export async function getNeedleDetails(shortName: string) {
  try {
    const needleNumbers = await needle.find({ shortName })
    return needleNumbers
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(pc.yellow(`This is not possible!!! ${message}`))
  }
}