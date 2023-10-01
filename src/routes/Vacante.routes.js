    import { Router } from "express"
    import { crearVacante } from "../controllers/vacante.controller.js"
    import checkAuth from "../middleware/checkAuth.js"

    const router = Router()

    router.post("/nueva-vacante", checkAuth, crearVacante)

    export default router