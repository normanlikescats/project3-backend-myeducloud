class UserRouter {
  constructor(userController, express) {
    this.controller = userController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.getAllStudents);
    router.post("/", this.controller.getOrCreate);
    router.put("/", this.controller.editProfile);
    return router;
  };
}

module.exports = UserRouter;
