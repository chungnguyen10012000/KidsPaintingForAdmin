import { listUser } from "../../database/data/user"
import { User } from "../../database/model/user"

const contexParse = (res) => {
    const users = []
    res.forEach(element => {
        users.push(new User(element))
    });
    return users
}

export function PostUser(created) {
    const fakeUserList = contexParse(listUser)
    return created(fakeUserList);
}