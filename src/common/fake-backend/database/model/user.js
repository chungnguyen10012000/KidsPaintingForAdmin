export class User {
    constructor(userJson) {
        this.userID = userJson.userID
        this.username = userJson.username
        this.email = userJson.email
        this.password = userJson.password
        this.firstName = userJson.firstName
        this.lastName = userJson.lastName
        this.dateOfDay = userJson.dateOfBirth
        this.sex = userJson.sex
        this.address = userJson.address
        this.phone = userJson.phone
    }
}