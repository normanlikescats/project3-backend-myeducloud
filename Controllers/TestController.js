class TestController {
  constructor(testModel, questionnaireModel, answersModel, scoresModel) {
    this.testModel = testModel;
    this.questionnaireModel = questionnaireModel;
    this.answersModel = answersModel;
    this.scoresModel = scoresModel;
  }

  getAllTests = async(req, res) => {
    try {
      const allTests = await this.testModel.findAll()
      res.json(allTests);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllTestsByClassSubjectId = async (req, res) => {
    const users_class_subject_id = req.params.id;
    try {
      const allTests = await this.testModel.findAll(
        {
          where: { 
            users_class_subject_id: users_class_subject_id
          }
        }
      );
      res.json(allTests);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOneTest = async (req, res) => {
    const id = req.params.testId 
    try {
      const oneTest = await this.testModel.findAll(
        {
          where: {
            id: id
          }
        }
      );
      res.json(oneTest);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  insertOneTest = async (req, res) => {
    const users_class_subject_id = req.params.id;
    try {
      const newTest = await this.testModel.create({
        users_class_subject_id: users_class_subject_id,
      });
      return res.json(newTest);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // should delete all questionnaires + answers that rely on this....
  deleteOneTest = async (req, res)=>{
    const id = req.params.testId;
    const users_class_subject_id = req.params.id;
    let questionnaireIdArr;
    let answerIdArr;
    try{
      const questionnaireId = await this.questionnaireModel.findAll({
        attributes: ['id'],
        where: {
          test_id: id
        }
      })
      let stringifiedQuestionnaireId = JSON.stringify(questionnaireId)
      let parsedQuestionnaireId = JSON.parse(stringifiedQuestionnaireId)
      questionnaireIdArr = parsedQuestionnaireId.map(id => id.id)
      const answerId = await this.answersModel.findAll({
        attributes: ['id'],
        where:{
          questionnaire_id: questionnaireIdArr
        }
      })
      let stringifiedAnswerId = JSON.stringify(answerId)
      let parsedAnswerId = JSON.parse(stringifiedAnswerId)
      answerIdArr = parsedAnswerId.map(id => id.id)
    }catch (err) {
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
      const questionnaireRes = await this.questionnaireModel.findAll({
        where:{
          id: questionnaireIdArr
        }
      })
      console.log(JSON.stringify(answerRes))
      return res.json(questionnaireRes)
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
          id: questionnaireIdArr,
        }
      })
      await this.testModel.destroy({
        where: {
          id: id,
        }
      })
      const allTests = await this.testModel.findAll({
          where: { 
            users_class_subject_id: users_class_subject_id
          }
        });
      return res.json(allTests);
    }catch(err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = TestController;
