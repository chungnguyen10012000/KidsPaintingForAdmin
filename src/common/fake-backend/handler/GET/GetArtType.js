import { ArtTypeList } from "../../database/data/art_type"
import { ArtType } from "../../database/model/artType"

const contexParse = (res) => {
    const artTypes = []
    res.forEach(element => {
        artTypes.push(new ArtType(element))
    });
    return artTypes
}

export function getArtType(ok) {
    const fakeArtTypeList = contexParse(ArtTypeList)
    return ok(fakeArtTypeList);
}