const proveedorService = require("../services/ProveedorService");

// maneja las solictudes relacionadas con proveedor en ProveedorService
class ProveedorController {
  async list(req, res, next) {
    try {
      const proveedor = await proveedorService.list();
      res.json(proveedor);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const proveedor = await proveedorService.getById(req.params.id);
      res.json(proveedor);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
  try {
    const proveedor = await proveedorService.create(req.body);
    res.status(201).json({ id_proveedor: proveedor.id_proveedor });
  } catch (err) {
    console.error("Detalle del error:", err);
    if (err.code === "23503") {
      return res.status(400).json({ 
        error: "Error de relación." 
      });
    }

    // 2. Error de campos nulos (Falta algún dato obligatorio)
    if (err.code === "23502") {
      return res.status(400).json({ error: `El campo ${err.column} es obligatorio.` });
    }

    // 3. Tus validaciones manuales
    if (err.message === "proveedor ya registrado") {
      return res.status(409).json({ error: err.message }); 
    }
    
    if (err.message === "Datos son requeridos") {
      return res.status(400).json({ error: err.message });
    }

    // Si nada coincide, enviamos el error detallado para no recibir un 500 genérico
    res.status(500).json({ 
      message: "Error interno del servidor", 
      dev_info: err.message 
    });
    }
    }

  async update(req, res, next) {
    try {
      const proveedor = await proveedorService.update(req.params.id, req.body);
      res.json(proveedor);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await proveedorService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProveedorController();