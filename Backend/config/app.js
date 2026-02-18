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


// creamos la instancia de express
function createApp() {
    const app = express();

    // Servir archivos estáticos del frontend
    app.use(express.static(path.join(__dirname, "../../Frontend")));

    // Fallback para SPA
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/index.html"));
    });


    app.disable("x-powered-by");

    //middleware para parsear JSON con limite
    app.use(express.json({limit: "1mb"}));

    //middleware de seguridad HTTP
    app.use(helmet());

    //middleware de logging
    app.use(morgan("combined"));

    //middleware de CORS
    app.use(cors({origin:"*"}));
    
    
    //middleware de limitacion de peticiones
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: { error : " Demasiadas peticiones, por favor intenta más tarde."}
    });
    app.use(limiter);

    // middleware de manejo de errores
    app.use((err, req, res, next)=> {
        console.error("Error:", err);
        res.status(err.status || 409).json({
            error: err.message || "Error interno del servidor"
        });
    });

    app.use("/api/clients", clientRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/documents", docRoutes);
    app.use("/api/user", userRoutes);

    return app;
}

module.exports = { createApp };