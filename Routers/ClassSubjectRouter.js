class ClassSubjectRouter {
  constructor(userController, express) {
    this.controller = userController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.getAllClassSubjects);
    router.get("/:userId", this.controller.getEnrolledClass);
    router.post("/", this.controller.joinClass);

    return router;
  };
}

module.exports = ClassSubjectRouter;
