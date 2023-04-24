class QuestionnaireController {
  constructor(questionnaireModel, answersModel, scoresModel, testModel) {
    this.questionnaireModel = questionnaireModel;
    this.answersModel = answersModel;
    this.scoresModel = scoresModel;
    this.testModel = testModel;
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
    const id = req.params.id
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
    const { question, option_a, option_b, option_c, option_d, option_e } =
      req.body;
    console.log(req.body)
    try {
      await this.questionnaireModel.update(
        {
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

  deleteOneQuestion = async (req, res)=>{
    const id = req.params.id;
    let answerIdArr;
    //have to pull the ids to delete them....
    //delete scores first
    try{
      const answerId = await this.answersModel.findAll({
        attributes: ['id'],
        where:{
          questionnaire_id: id
        }
      })
      let stringifiedAnswerId = JSON.stringify(answerId)
      let parsedAnswerId = JSON.parse(stringifiedAnswerId)
      answerIdArr = parsedAnswerId.map(id => id.id)
    } catch(err) {
      return res.status(400).json({ error: true, msg: err });
    }
    /*try{
      const scoreRes = await this.scoresModel.findAll({
        where:{
          student_answer_id: answerIdArr
        }
      })
      console.log(JSON.stringify(scoreRes))
      const answerRes = await this.answersModel.findAll({
        where:{
          id: answerIdArr
        }
      })
      console.log(JSON.stringify(answerRes))
      return res.json(scoreRes)
    }catch(err) {
      return res.status(400).json({ error: true, msg: err });
    }*/
    try{
      await this.scoresModel.destroy({
        where: {
          student_answer_id: answerIdArr
        }
      })
      await this.answersModel.destroy({
          where: {
            id: answerIdArr
        }
      })
      await this.questionnaireModel.destroy({
        where: {
          id: id,
        }
      })
      return res.json({msg: "deleted"});
    }catch(err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = QuestionnaireController;
