const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const clientRoutes = require("../routes/clientRoutes");
const authRoutes = require("../routes/authRoutes");
const docRoutes = require("../routes/docRoutes");
const userRoutes = require("../routes/userRoutes");

function createApp() {
    const app = express();

    // 1. SEGURIDAD Y LOGGING (Primero lo básico)
    app.use(cors({ origin: "*" }));
    app.use(morgan("combined"));
    
    // Configuración de Helmet ajustada para que permita cargar CSS/JS locales sin dramas
    app.use(helmet({
        contentSecurityPolicy: false, 
    }));

    app.disable("x-powered-by");
    app.use(express.json({ limit: "1mb" }));

    const frontendPath = path.join(__dirname, "../../Frontend");

// 1. Mapeo para que el navegador encuentre "/Frontend/..."
// Esto soluciona las rutas que ya tienes en el HTML
app.use("/Frontend", express.static(frontendPath));

// 2. Mapeo para rutas cortas (por si acaso)
app.use(express.static(frontendPath));

// 3. RUTA RAÍZ (Fundamental para evitar el 404)
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, "index/index.html"));
});

    // 3. Mapeos específicos (esto fuerza a Express a encontrar las subcarpetas)
    app.use('/css', express.static(path.join(frontendPath, "css")));
    app.use('/js', express.static(path.join(frontendPath, "js"))); 
    app.use('/index', express.static(path.join(frontendPath, "index")));

    // 3. RUTAS DE LA API
    app.use("/api/clients", clientRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/documents", docRoutes);
    app.use("/api/user", userRoutes);


    // 4. EL FALLBACK PARA SPA (DEBE IR AL FINAL)
    // Solo si no encontró un archivo estático ni una ruta de API, entrega el HTML
    app.get('/*splat', (req, res) => {
        res.sendFile(path.join(__dirname, "../../Frontend/index/index.html"));
    });

    // 5. MANEJO DE ERRORES
    app.use((err, req, res, next) => {
        console.error("Error:", err);
        res.status(err.status || 409).json({
            error: err.message || "Error interno del servidor"
        });
    });

    return app;
}

module.exports = { createApp };