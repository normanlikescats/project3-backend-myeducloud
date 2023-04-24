class AnswerRouter {
  constructor(answerController, express) {
    this.answerController = answerController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/:questionnaireId", this.answerController.getAllAnswers);
    router.get("/:questionnaireId/:userId", this.answerController.getOneAnswer);
    router.post("/:questionnaireId", this.answerController.insertOneAnswer);
    router.put("/:questionnaireId/:userId", this.answerController.editOneAnswer);
    router.delete("/:questionnaireId/:id", this.answerController.deleteOneAnswer);

    return router;
  };
}

module.exports = AnswerRouter;
