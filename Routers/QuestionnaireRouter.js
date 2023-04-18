class QuestionnaireRouter {
  constructor(questionnaireController, express) {
    this.questionnaireController = questionnaireController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/:testid", this.questionnaireController.getAllQuestions);
    router.get("/:testid/:id", this.questionnaireController.getOneQuestion);
    router.post("/:testid", this.questionnaireController.insertOneQuestion);
    router.put("/:testid/:id", this.questionnaireController.editOneQuestion);
    router.delete("/:testid/:id", this.questionnaireController.deleteOneQuestion);

    return router;
  };
}

module.exports = QuestionnaireRouter;
