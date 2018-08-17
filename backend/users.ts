export class User {
    constructor(public email: string,
                public name: string,
                private password: string){}

    matches(another: User): boolean {
        return another !== undefined &&
                another.email === this.email &&
                another.password === this.password
    }
}

export const users = {
    "email@email.com": new User('email@email.com', 'NomeDoUser', 'senha123'),
    "usuario@email.com": new User('usuario@email.com', 'OutroNome', 'senha456'),
}