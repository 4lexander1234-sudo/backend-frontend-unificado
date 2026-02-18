
const { supabase } = require("../config/db");


async function authMiddleware(req, res, next) {
  try {
    // obtener el token de autorizacion
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];

    // Validar el token con Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }

    // Guardar el usuario en la request
    req.user = data.user;
    next();
  } catch (err) {
    console.error("❌ Error en authMiddleware:", err.message);
    res.status(500).json({ error: "Error interno de autenticación" });
  }
}

module.exports = { authMiddleware };