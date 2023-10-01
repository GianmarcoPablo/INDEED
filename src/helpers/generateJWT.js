import jwt from "jsonwebtoken"
const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: "30d"
    })
}

export default generateJWT