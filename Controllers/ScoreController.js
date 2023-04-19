class ScoreController {
  constructor(scoreModel) {
    this.scoreModel = scoreModel;
  }

  getAllScoresByTest = async (req, res) => {
    const test_id = req.params.testId
    console.log(test_id)
    try {
      const allScoresByTest = await this.scoreModel.findAll(
        {
          where: { 
            test_id: test_id
          }
        }
      );
      res.json(allScoresByTest);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllScoresByUser = async (req, res) => {
    const user_id = req.params.userId
    console.log(user_id )
    try {
      const allScoresByUser = await this.scoreModel.findAll(
        {
          where: { 
            user_id : user_id 
          }
        }
      );
      res.json(allScoresByUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOneScore = async (req, res) => {
    const test_id = req.params.testId
    const user_id = req.params.userId 
    try {
      const oneScore = await this.scoreModel.findAll(
        {
          where: {
            test_id: test_id,
            user_id: user_id
          }
        }
      );
      res.json(oneScore);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // stopped here
  insertOneScore = async (req, res) => {
    const test_id = req.params.testId;
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

module.exports = ScoreController;
