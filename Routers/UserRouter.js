class UserRouter {
  constructor(userController, express) {
    this.controller = userController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.getAllStudents);
    router.get("/", this.controller.getOne);
    router.post("/", this.controller.createProfile);
    router.put("/:userId", this.controller.editProfile);
    return router;
  };
}

module.exports = UserRouter;
