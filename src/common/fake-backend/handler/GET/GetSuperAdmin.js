import { listSuperAdmin } from "../../database/data/super-admin"
import { User } from "../../database/model/user"

const contexParse = (res) => {
    const superAdmins = []
    res.forEach(element => {
        superAdmins.push(new User(element))
    });
    return superAdmins
}

export function getSuperAdmin(ok) {
    const fakeSuperAdminList = contexParse(listSuperAdmin)
    return ok(fakeSuperAdminList);
}