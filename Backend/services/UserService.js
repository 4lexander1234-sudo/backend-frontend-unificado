const userRepository = require("../repositories/UserRepository");

class UserService {
  async list() {
    return await userRepository.findAll();
  }

  async getById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }
}

module.exports = new UserService();