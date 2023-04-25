class QuestionnaireRouter {
  constructor(questionnaireController, express, checkJwt) {
    this.questionnaireController = questionnaireController;
    this.express = express;
    this.checkJwt = checkJwt
  }
  route = () => {
    let router = this.express.Router();

    router.get("/:testid", this.checkJwt, this.questionnaireController.getAllQuestions);
    router.get("/question/:id", this.checkJwt, this.questionnaireController.getOneQuestion);
    router.post("/:testid", this.checkJwt, this.questionnaireController.insertOneQuestion);
    router.put("/edit/:id", this.checkJwt, this.questionnaireController.editOneQuestion);
    router.delete("/delete/:id", this.checkJwt, this.questionnaireController.deleteOneQuestion);

    return router;
  };
}

module.exports = QuestionnaireRouter;
