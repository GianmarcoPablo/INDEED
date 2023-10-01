import generateID from "../helpers/generateID.js"
import generateJWT from "../helpers/generateJWT.js"
import Users from "../models/User.js"


const newAccount = async (req, res) => {
    const { email, nombre } = req.body

    const userexists = await Users.findOne({ email })
    if (userexists) {
        const error = new Error("This Email already has another account")
        return res.status(400).json({ msg: error.message })
    }
    try {
        const userObject = new Users(req.body)
        const saveUser = await userObject.save()
        res.json(saveUser)
    } catch (error) {
        console.log(error);
    }
}

const confirmAccount = async (req, res) => {
    const { token } = req.params
    const userConfirm = await Users.findOne({ token })
    if (!userConfirm) {
        const error = new Error("Token not valid")
        return res.status(404).json({ msg: error.message })
    }

    try {
        userConfirm.confirmed = true
        userConfirm.token = ""
        await userConfirm.save()
        res.json({ msg: "Confirmed Successfully" })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await Users.findOne({ email })
    if (!user) {
        const error = new Error("Account not found")
        return res.status(404).json({ msg: error.message })
    }
    if (!user.confirmed) {
        const error = new Error("Unconfirmed Account ")
        return res.status(404).json({ msg: error.message })
    }
    if (await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user.id)
        })
    } else {
        const error = new Error("Incorrect password")
        return res.status(404).json({ msg: error.message })
    }
}

const profile = (req, res) => {
    const { user } = req
    res.json(user)
}

const forgetPassword = async (req, res) => {
    const { email } = req.body
    const userexists = await Users.findOne({ email })
    if (!userexists) {
        const error = new Error("Account not Found")
        return res.status(400).json({ msg: error.message })
    }
    try {
        userexists.token = generateID()
        await userexists.save()
        res.json({ msg: "We have sent an eamil with instructions" })
    } catch (error) {
        console.log(error);
    }
}

const confirmToken = async (req, res) => {
    const { token } = req.params
    const tokenValid = await Users.findOne({ token })
    if (!tokenValid) {
        const error = new Error("Invalid Token")
        return res.status(400).json({ msg: error.message })
    }
    res.json({ msg: "Token valid and user exits" })
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    const user = await Users.findOne({ token })
    if (!user) {
        const error = new Error("Has a error")
        return res.status(400).json({ msg: error.message })
    }
    try {
        user.token = ""
        user.password = password
        await user.save()
        res.json({ msg: "Password Modified Correctly" })
    } catch (error) {
        console.log(error);
    }
}

export {
    newAccount,
    confirmAccount,
    login,
    forgetPassword,
    confirmToken,
    newPassword,
    profile
}