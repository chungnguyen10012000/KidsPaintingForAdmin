import { staffList } from "../../database/data/staff"
import { User } from "../../database/model/user"

const contexParse = (res) => {
    const staffs = []
    res.forEach(element => {
        staffs.push(new User(element))
    });
    return staffs
}

export function getStaff(ok) {
    const fakeStaffList = contexParse(staffList)
    return ok(fakeStaffList);
}