const productService = require("../services/ProductService");

// maneja las solictudes relacionadas con product en ProductService
class ProductController {
  async list(req, res, next) {
    try {
      const products = await productService.list();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const product = await productService.getById(req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const product = await Service.create(req.body);
      res.status(201).json({id_producto:product.id_producto});
    } catch (err) {
  // Manejo de errores conocidos
    console.error(err.message);

    if (err.message === "producto ya registrado") {
      return res.status(409).json({ error: err.message }); 
    }
    if (err.message === "Datos son requeridos") {
      return res.status(400).json({ error: err.message });    }

    // Si viene un error de Supabase con código
    if (err.code === "23505") {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }
    next(err)
    }
  }

  async update(req, res, next) {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await productService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();