class TestRouter {
  constructor(testController, express, checkJwt) {
    this.testController = testController;
    this.express = express;
    this.checkJwt = checkJwt
  }
  route = () => {
    let router = this.express.Router();

    router.get("/all", this.checkJwt, this.testController.getAllTests);
    router.get("/:id", this.checkJwt, this.testController.getAllTestsByClassSubjectId);
    router.get("/:id/:testId", this.checkJwt, this.testController.getOneTest);
    router.post("/:id", this.checkJwt, this.testController.insertOneTest);
    router.delete("/:id/:testId", this.checkJwt, this.testController.deleteOneTest);

    return router;
  };
}

module.exports = TestRouter;
