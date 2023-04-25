class AnswerRouter {
  constructor(answerController, express, checkJwt) {
    this.answerController = answerController;
    this.express = express;
    this.checkJwt = checkJwt;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/:questionnaireId", this.checkJwt, this.answerController.getAllAnswers);
    router.get("/:questionnaireId/:userId", this.checkJwt, this.answerController.getOneAnswer);
    router.post("/:questionnaireId", this.checkJwt, this.answerController.insertOneAnswer);
    router.put("/:questionnaireId/:userId",this.checkJwt, this.answerController.editOneAnswer);
    router.delete("/:questionnaireId/:id", this.checkJwt, this.answerController.deleteOneAnswer);

    return router;
  };
}

module.exports = AnswerRouter;
