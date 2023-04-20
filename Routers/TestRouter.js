class TestRouter {
  constructor(testController, express) {
    this.testController = testController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/:id", this.testController.getAllTests);
    router.get("/:id/:testId", this.testController.getOneTest);
    router.post("/:id", this.testController.insertOneTest);
    router.delete("/:id/:testId", this.testController.deleteOneTest);

    return router;
  };
}

module.exports = TestRouter;
