class QuestionnaireController {
  constructor(questionnaireModel) {
    this.questionnaireModel = questionnaireModel;
  }

  getAllQuestions = async (req, res) => {
    const test_id = req.params.testid
    console.log(test_id)
    try {
      const allQuestions = await this.questionnaireModel.findAll(
        {
          where: { 
            test_id: test_id
          }
        }
      );
      res.json(allQuestions);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOneQuestion = async (req, res) => {
    const test_id = req.params.testid 
    const id = req.params.id
    console.log(id)
    console.log(test_id)
    try {
      const oneQuestion = await this.questionnaireModel.findAll(
        {
          where: {
            id: id
          }
        }
      );
      res.json(oneQuestion);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  insertOneQuestion = async (req, res) => {
    const test_id = req.params.testid;
    const { question, option_a, option_b, option_c, option_d, option_e } =
      req.body;
    try {
      const newQuestion = await this.questionnaireModel.create({
        test_id: test_id,
        question: question,
        option_a: option_a,
        option_b: option_b,
        option_c: option_c,
        option_d: option_d,
        option_e: option_e,
      });
      return res.json(newQuestion);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }


  // should include a line to remove answers if teacher removes options?
  editOneQuestion = async (req, res) => {
    const id  = req.params.id;
    const test_id = req.params.testid;
    const { question, option_a, option_b, option_c, option_d, option_e } =
      req.body;
    console.log(req.body)
    try {
      await this.questionnaireModel.update(
        {
          test_id: test_id,
          question: question,
          option_a: option_a,
          option_b: option_b,
          option_c: option_c,
          option_d: option_d,
          option_e: option_e,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const updatedQuestion = await this.questionnaireModel.findByPk(id);
      return res.json(updatedQuestion);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }


  // put in a line to delete all answers associated with this question
  deleteOneQuestion = async (req, res)=>{
    const id = req.params.id;
    const test_id = req.params.testid;
    try {
      await this.questionnaireModel.destroy({
        where: {
          id: id,
        }
      })
      const allQuestions = await this.questionnaireModel.findAll({
          where: { 
            test_id: test_id
          }
        });
      return res.json(allQuestions);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = QuestionnaireController;
