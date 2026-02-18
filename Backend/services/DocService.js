const docRepository = require("../repositories/DocRepository");

class DocService {
  async list() {
    return await docRepository.findAll();
  }
}

module.exports = new DocService();