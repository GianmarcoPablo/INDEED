import Users from "../models/User.js";
import jwt from "jsonwebtoken"

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.SECRET)
            console.log(decoded);
            req.user = await Users.findById(decoded.id).select("-password -token -confirmed")
            return next()
        } catch (err) {
            const error = new Error("Invalid Token")
            return res.status(404).json({ msg: error.message })
        }
    }
    if (!token) {
        const error = new Error("Invalid Token or not exits")
        res.status(403).json({ msg: error.message })
    }
    next()
}

export default checkAuth