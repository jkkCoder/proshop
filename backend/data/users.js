import bcrypt from "bcryptjs"

const users = [
    {
        name:"Admin user",
        email:"admin@example.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin:true
    },
    {
        name:"jay kumar",
        email:"jay@example.com",
        password: bcrypt.hashSync("123456",10),
    },
    {
        name:"golu karn",
        email:"golu@example.com",
        password: bcrypt.hashSync("123456",10),
    },
]

export default users