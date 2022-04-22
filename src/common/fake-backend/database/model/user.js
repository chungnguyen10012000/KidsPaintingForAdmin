export class User {
    constructor(userJson) {
        this.userID = userJson.id
        this.username = userJson.username
        this.email = userJson.email
        this.password = userJson.password
        this.firstName = userJson.first_name
        this.lastName = userJson.last_name
        this.dateOfDay = userJson.date_of_birth
        this.sex = userJson.sex
        this.address = userJson.address
        this.phone = userJson.phone
        this.profile_image_url = userJson.profile_image_url
    }
}