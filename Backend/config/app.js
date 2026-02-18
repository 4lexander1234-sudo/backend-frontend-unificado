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

    // 2. ARCHIVOS ESTÁTICOS
    // Esto permite que si el HTML pide "index/style.css", Express lo encuentre
    app.use(express.static(path.join(__dirname, "../../Frontend")));

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