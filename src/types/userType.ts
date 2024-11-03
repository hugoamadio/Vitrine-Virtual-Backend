interface User{
    name: string,
    lastName: string,
    cpf: string,
    email: string,
    birthDate: string,
    password: string,
    preference: "MASCULINE" | "FEMININE"
}

export default User