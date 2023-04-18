class TestController {
  constructor(testModel) {
    this.testModel = testModel;
  }

  getAllTests = async (req, res) => {
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
    try {
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
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = TestController;
