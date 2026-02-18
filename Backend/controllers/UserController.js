const userService = require("../services/UserService");

// maneja las solictudes relacionadas 
class UserController {
  async list(req, res, next) {
    try {
      const user = await userService.list();
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const user = await userService.getById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();