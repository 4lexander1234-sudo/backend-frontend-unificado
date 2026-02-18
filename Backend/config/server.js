require("dotenv").config();
const { createApp } = require("./app"); 
const { checkConnection } = require("./db");
const app = createApp();

// probar la conexion a la base de datos y lugo iniciar el servidor
(async () => {
  try {
    const isConnected = await checkConnection();
    if (!isConnected) {
      console.error("No se pudo conectar a Supabase. Cerrando servidor...");
      process.exit(1);
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error al iniciar el servidor:", err);
    process.exit(1);
  }
})();