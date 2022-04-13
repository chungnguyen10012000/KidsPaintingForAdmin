export class User {
    constructor(userJson) {
        this.userID = userJson.userID
        this.username = userJson.username
        this.email = userJson.email
        this.password = userJson.password
        this.firstName = userJson.firstName
        this.lastName = userJson.lastName
        this.dateOfBirth = userJson.dateOfBirth
        this.sex = userJson.sex
        this.address = userJson.Address
        this.phone = userJson.phone
    }
}