require("dotenv").config();
const { createApp } = require("./app"); 
const { checkConnection } = require("./db");
const app = createApp();

// probar la conexion a la base de datos y lugo iniciar el servidor
(async () => {
  const isConnected = await checkConnection();
  if (!isConnected) {
    console.error("No se pudo conectar a Supabase. Cerrando servidor...");
    process.exit(1);
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
})();