export class RegisterRequest {
    firstName : string;
    lastName : string;
    username : string;
    password : string;
    roles : string[];

    constructor(firstName : string, lastName : string, username : string, password : string, roles : string[]){
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.roles = roles;
    }
}
