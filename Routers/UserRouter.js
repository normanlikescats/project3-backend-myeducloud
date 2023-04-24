class UserRouter {
  constructor(userController, express, checkJwt) {
    this.controller = userController;
    this.express = express;
    this.checkJwt = checkJwt;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.getAllStudents);
    router.post("/", this.controller.getOrCreate);
    router.put("/", this.checkJwt, this.controller.editProfile);
    return router;
  };
}

module.exports = UserRouter;
