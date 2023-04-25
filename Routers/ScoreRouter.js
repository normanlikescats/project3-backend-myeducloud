class ScoreRouter {
  constructor(scoreController, express, checkJwt) {
    this.scoreController = scoreController;
    this.express = express;
    this.checkJwt = checkJwt
  }
  route = () => {
    let router = this.express.Router();
    
    router.get("/test/:testId", this.checkJwt, this.scoreController.getAllScoresByTest);
    router.get("/question/:questionId", this.checkJwt, this.scoreController.getAllScoresByQuestion);
    router.get("/user/:userId", this.checkJwt, this.scoreController.getAllScoresByUser);
    router.get("/question/:questionId/user/:userId", this.checkJwt, this.scoreController.getOneScore);
    router.post("/add/:studentAnswerId", this.checkJwt, this.scoreController.insertOneScore);
    router.put("/edit/:id", this.checkJwt, this.scoreController.editOneScore);
    router.delete("/delete/:testId/:id", this.checkJwt, this.scoreController.deleteOneScore);

    return router;
  };
}

module.exports = ScoreRouter;
