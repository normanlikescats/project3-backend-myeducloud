class TestRouter {
  constructor(testController, express, checkJwt) {
    this.testController = testController;
    this.express = express;
    this.checkJwt = checkJwt
  }
  route = () => {
    let router = this.express.Router();

    router.get("/class", this.testController.getClass)
    router.get("/all", this.testController.getAllTests);
    router.get("/:id", this.testController.getAllTestsByClassSubjectId);
    router.get("/testid/:testId", this.testController.getOneTest);
    router.post("/add", this.checkJwt, this.testController.insertOneTest);
    router.delete("/:id/:testId", this.checkJwt, this.testController.deleteOneTest);

    return router;
  };
}

module.exports = TestRouter;
