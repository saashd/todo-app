export class User {
    constructor(public _id: string = "",
                public first_name = "",
                public last_name = "",
                public email = "") {

    }

    get name() {
        return this.first_name + ' ' + this.last_name
    }
}