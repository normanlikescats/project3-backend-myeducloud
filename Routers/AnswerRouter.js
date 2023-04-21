class AnswerRouter {
  constructor(answerController, express) {
    this.answerController = answerController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/:questionnaireId", this.answerController.getAllAnswers);
    router.get("/:questionnaireId/:id", this.answerController.getOneAnswer);
    router.post("/:questionnaireId", this.answerController.insertOneAnswer);
    router.put("/:questionnaireId/:id", this.answerController.editOneAnswer);
    router.delete("/:questionnaireId/:id", this.answerController.deleteOneAnswer);

    return router;
  };
}

module.exports = AnswerRouter;
