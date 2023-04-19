class ScoreController {
  constructor(scoreModel) {
    this.scoreModel = scoreModel;
  }

  testfunc =  async (req, res) =>{
    try{
      console.log('run')
      const result = await this.scoreModel.findByPk(1)
      console.log(result)
      return res.json(result);
    } catch(err){
      console.log(err)
    }
  }

  getAllScoresByTest = async (req, res) => {
    const test_id = req.params.testId
    try {
      const allScoresByTest = await this.scoreModel.findAll({
        attributes: ['id', 'user_id', 'test_id', 'student_answer_id', 'score'], 
        where: { 
          test_id: test_id
        }
      });
      res.json(allScoresByTest);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllScoresByUser = async (req, res) => {
    const user_id = req.params.userId
    console.log(user_id)
    try {
      const allScoresByUser = await this.scoreModel.findAll({
        attributes: ['id', 'user_id', 'test_id', 'student_answer_id', 'score'],     
          where: { 
            user_id : user_id 
          }
      });
      res.json(allScoresByUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOneScore = async (req, res) => {
    const test_id = req.params.testId
    const user_id = req.params.userId
    console.log(test_id)
    console.log(user_id)
    try {
      const oneScore = await this.scoreModel.findAll(
        { attributes:['id', 'user_id', 'test_id', 'student_answer_id', 'score'], 
          where: {
            test_id: test_id,
            user_id: user_id
          }
        }
      );
      return res.json(oneScore);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  insertOneScore = async (req, res) => {
    const test_id = req.params.testId;
    const user_id = req.params.userId
    const { score, student_answer_id } =
      req.body;
    try {
      const newScore = await this.scoreModel.create({
        test_id: Number(test_id),
        user_id: Number(user_id),
        student_answer_id: student_answer_id,
        score: score,
      },
      {
        fields: ['id','test_id','user_id','student_answer_id','score']
      });
      return res.json(newScore);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  editOneScore = async (req, res) => {
    const id  = req.params.id;
    const score = req.body.score;
    console.log(id)
    try {
      await this.scoreModel.update(
        {
          score: score
        },
        {
          where: {
            id: id,
          },
        }
      );
      const updatedScore = await this.scoreModel.findByPk(id);
      return res.json(updatedScore);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  deleteOneScore = async (req, res)=>{
    const id = req.params.id;
    const test_id = req.params.testId;
    try {
      await this.scoreModel.destroy({
        where: {
          id: id,
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
