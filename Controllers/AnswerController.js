class AnswerController {
  constructor(studentAnswerModel) {
    this.studentAnswerModel = studentAnswerModel;
  }

  getAllAnswers = async (req, res) => {
    const questionnaire_id = req.params.questionnaireId;
    try {
      const allAnswers = await this.studentAnswerModel.findAll(
        {
          where: { 
            questionnaire_id: questionnaire_id
          }
        }
      );
      res.json(allAnswers);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOneAnswer = async (req, res) => {
    const id = req.params.id 
    try {
      const oneAnswer = await this.studentAnswerModel.findAll(
        {
          where: {
            id: id
          }
        }
      );
      res.json(oneAnswer);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  insertOneAnswer = async (req, res) => {
    const questionnaire_id = req.params.questionnaireId;
    const { user_id, answer } =
      req.body;
    try {
      const newAnswer = await this.studentAnswerModel.create({
        questionnaire_id: questionnaire_id,
        user_id: user_id,
        answer: answer
      });
      return res.json(newAnswer);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  editOneAnswer = async (req, res) => {
    const id = req.params.id;
    const { answer } = req.body;
    try {
      await this.studentAnswerModel.update(
        {
          answer: answer
        },
        {
          where: {
            id: id,
          },
        }
      );
      const updatedAnswer = await this.studentAnswerModel.findByPk(id);
      return res.json(updatedAnswer);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }


  deleteOneAnswer = async (req, res)=>{
    const id = req.params.id;
    const questionnaire_id = req.params.questionnaireId;
    console.log(questionnaire_id)
    console.log(id)
    try {
      await this.studentAnswerModel.destroy({
        where: {
          id: id,
        }
      })
      const allAnswers = await this.studentAnswerModel.findAll({
          where: { 
            questionnaire_id: questionnaire_id
          }
        });
      return res.json(allAnswers);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = AnswerController;
