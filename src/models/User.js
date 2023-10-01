import mongoose from "mongoose"
import generateID from "../helpers/generateID.js"
import Bcrypt from "bcrypt"

const users = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generateID() //para email
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['recruiter', 'jobseeker'],
        required: true
    },
    vacante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vacante"
    }
})

users.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await Bcrypt.genSalt(10)
    this.password = await Bcrypt.hash(this.password, salt)
})

users.methods.checkPassword = async function (passwordForm) {
    return await Bcrypt.compare(passwordForm, this.password)
}

const Users = mongoose.model("Users", users)

export default Users