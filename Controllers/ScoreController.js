class ScoreController {
  constructor(scoreModel, answerModel) {
    this.scoreModel = scoreModel;
    this.answerModel = answerModel;
  }


  getAllScoresByTest = async (req, res) => {
    const test_id = req.params.testId
    try {
      const allScoresByTest = await this.scoreModel.findAll({
        where: { 
          test_id: test_id
        }
      });
      res.json(allScoresByTest);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllScoresByQuestion = async (req,res) => {
    const question_id = req.params.questionId
    let answerIdArr;
    try{
      const allStudentAnswerIds = await this.answerModel.findAll({
        attributes: ['id'],
        where: { 
          questionnaire_id : question_id 
        }
      })
      let stringifiedAnswerId = JSON.stringify(allStudentAnswerIds)
      let parsedAnswerId = JSON.parse(stringifiedAnswerId)
      answerIdArr = parsedAnswerId.map(id => id.id)
      const allScoresByQuestion = await this.scoreModel.findAll({
        where:{
          student_answer_id: answerIdArr
        }
      })
      return res.json(allScoresByQuestion);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  getAllScoresByUser = async (req, res) => {
    const user_id = req.params.userId
    try {
      const allScoresByUser = await this.scoreModel.findAll({
          where: { 
            user_id : user_id 
          }
      });
      res.json(allScoresByUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOneScore = async (req,res) => {
    const question_id = req.params.questionId
    const user_id = req.params.userId
    try{
      const studentAnswerId = await this.answerModel.findAll({
        attributes: ['id'],
        where: { 
          questionnaire_id : question_id,
          user_id: user_id 
        }
      })
      let stringifiedAnswerId = JSON.stringify(studentAnswerId)
      let parsedAnswerId = JSON.parse(stringifiedAnswerId)
      console.log(parsedAnswerId)
      const allScoresByQuestion = await this.scoreModel.findAll({
        where:{
          student_answer_id: parsedAnswerId[0].id
        }
      })
      return res.json(allScoresByQuestion);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  insertOneScore = async (req, res) => {
    const student_answer_id = req.params.studentAnswerId
    const { score, test_id, user_id } = req.body;
    console.log(score)
    try {
      const newScore = await this.scoreModel.create({
        test_id: test_id,
        user_id: user_id,
        student_answer_id: student_answer_id,
        score: score,
      })
      return res.json(newScore);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  editOneScore = async (req, res) => {
    const student_answer_id  = req.params.id;
    const score = req.body.score;
    try {
      await this.scoreModel.update(
        {
          score: score
        },
        {
          where: {
            student_answer_id: student_answer_id,
          },
        }
      );
      const updatedScore = await this.scoreModel.findAll(
        { attributes:['id', 'user_id', 'test_id', 'student_answer_id', 'score'], 
          where: {
            student_answer_id: student_answer_id
          }
        }
      );
      return res.json(updatedScore);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  deleteOneScore = async (req, res)=>{
    const student_answer_id = req.params.id;
    const test_id = req.params.testId;
    try {
      await this.scoreModel.destroy({
        where: {
          student_answer_id: student_answer_id,
        }
      })
      const allScoresByTest = await this.scoreModel.findAll({
          where: { 
            test_id: test_id
          }
        });
      return res.json(allScoresByTest);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ScoreController;
