import mongoose from "mongoose"

const vacante = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    empresa: {
        type: String,
        required: true,
        trim: true
    },
    ubicacion: {
        type: String,
        required: true,
        trim: true
    },
    sueldo: {
        type: String,
        required: true,
        trim: true
    },
    contrato: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    }
})

const Vacante = mongoose.model("Vacante", vacante)

export default Vacante