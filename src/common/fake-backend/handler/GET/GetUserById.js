import { listUser } from "../../database/data/admin"
import { User } from "../../database/model/user"

const contexParse = (res) => {
    const users = []
    res.forEach(element => {
        users.push(new User(element))
    });
    return users
}

export function getUserById(ok) {
    const fakeUserList = contexParse(listUser)
    return ok(fakeUserList);
}