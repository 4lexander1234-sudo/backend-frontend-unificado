const docService = require("../services/DocService");

// maneja las solictudes de tipos de documento
class DocController {
  async list(req, res, next) {
    try {
      const tipo_documento = await docService.list();
      res.json(tipo_documento);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DocController();