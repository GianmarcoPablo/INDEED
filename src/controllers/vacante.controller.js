import Vacante from "../models/Vacante.js";

const crearVacante = async (req, res) => {
    const objVacante = new Vacante(req.body)
    objVacante.user = user._id
    const vacanteGuardada = await objVacante.save()
    console.log(vacanteGuardada);
}

export {
    crearVacante
}