const authService = require("../services/authService");

class AuthController {
    async login(req, res, next){
        try {
            const { email, password } = req.body;
            const session = await authService.login(email, password );

            // retornar tokens y datos del usuario
            return res.status(200).json(session);
        } catch (err) {
            console.error("error en authController :", err.message);
            next(err);
            
        }
    }
}

module.exports = new AuthController();
