const express = require("express");
const path = require("path"); // ¡Obligatorio para las rutas!
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const clientRoutes = require("../routes/clientRoutes");
const authRoutes = require("../routes/authRoutes");
const docRoutes = require("../routes/docRoutes");
const userRoutes = require("../routes/userRoutes");
const productRoutes = require("../routes/productRoutes");

function createApp() {
    const app = express();

    // 1. SEGURIDAD Y MIDDLEWARES BÁSICOS
    app.use(cors({ origin: "*" }));
    // Ajustamos Helmet para que no bloquee tus estilos/scripts locales
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(morgan("combined"));
    app.use(express.json({ limit: "1mb" }));
    app.disable("x-powered-by");

    // 2. CONFIGURACIÓN DE ARCHIVOS ESTÁTICOS (EL FRONTEND)
    // __dirname está en Backend/config, subimos dos niveles para llegar a Frontend
    const frontendPath = path.join(__dirname, "../../Frontend");

    // Servimos la carpeta raíz del frontend
    app.use(express.static(frontendPath));

    // Mapeos específicos según tu estructura de carpetas
    app.use('/css', express.static(path.join(frontendPath, "css")));
    app.use('/img', express.static(path.join(frontendPath, "img")));
    app.use('/javascript', express.static(path.join(frontendPath, "javascript")));
    app.use('/index', express.static(path.join(frontendPath, "index")));

    // 3. RUTA RAÍZ (Para que no salga "Cannot GET /")
    app.get('/', (req, res) => {
        res.sendFile(path.join(frontendPath, "index/index.html"));
    });

    // 4. LIMITADOR DE PETICIONES
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: { error: "Demasiadas peticiones, por favor intenta más tarde." }
    });
    app.use(limiter);

    // 5. RUTAS DE LA API
    app.use("/api/clients", clientRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/documents", docRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/proveedor", proveedorRoutes);

    
    // 6. MANEJO DE ERRORES
    app.use('/api/*path', (req, res) => {
    res.status(404).json({
        error: "Ruta de API no encontrada"
    });
    });

    app.use((err, req, res, next) => {
        console.error("Error:", err);
        res.status(err.status || 500).json({
            error: err.message || "Error interno del servidor"
        });
    });

    // 7. FALLBACK PARA RUTAS NO ENCONTRADAS (SPLAT)
    // Si alguien refresca la página, lo mandamos al index
    app.get('/*splat', (req, res) => {
        if (req.path.includes('.')) return res.status(404).send("Archivo no encontrado");
        res.sendFile(path.join(frontendPath, "index/index.html"));
    });

    return app;
}

module.exports = { createApp };