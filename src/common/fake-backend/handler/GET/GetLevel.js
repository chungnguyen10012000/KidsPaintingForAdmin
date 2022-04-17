import { levelList } from "../../database/data/level"
import { Level } from "../../database/model/level"

const contexParse = (res) => {
    const levels = []
    res.forEach(element => {
        levels.push(new Level(element))
    });
    return levels
}

export function getLevel(ok) {
    const fakeLevelList = contexParse(levelList)
    return ok(fakeLevelList);
}