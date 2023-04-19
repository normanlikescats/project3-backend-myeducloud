class ScoreRouter {
  constructor(scoreController, express) {
    this.scoreController = scoreController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();
    
    router.get("/", this.scoreController.testfunc)
    router.get("/test/:testId", this.scoreController.getAllScoresByTest);
    router.get("/user/:userId", this.scoreController.getAllScoresByUser);
    router.get("/test/:testId/user/:userId", this.scoreController.getOneScore);
    router.post("/test/:testId/user/:userId", this.scoreController.insertOneScore);
    router.put("/edit/:id", this.scoreController.editOneScore);
    router.delete("/delete/:testId/:id", this.scoreController.deleteOneScore);

    return router;
  };
}

module.exports = ScoreRouter;
