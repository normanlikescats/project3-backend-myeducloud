class ClassSubjectController {
  constructor(model, classModel, usersModel) {
    this.model = model;
    this.classModel = classModel;
    this.usersModel = usersModel;
  }

  getAllClassSubjects = async (req, res) => {
    try {
      const allClasses = await this.model.findAll();

      return res.json(allClasses);
    } catch (e) {
      console.log(e);
    }
  };

  joinClass = async (req, res) => {
    try {
      const { userId, classSubjectId } = req.body;

      const enrollment = await this.classModel.create({
        userId: userId,
        classSubjectId: classSubjectId,
      });

      const student = await this.usersModel.findOne({
        where: userId,
        include: this.model,
      });

      res.json(student);
    } catch (e) {
      console.log(e);
    }
  };

  getEnrolledClass = async (req, res) => {
    try {
      const { userId } = req.body;

      const enrolled = await this.usersModel.findOne({
        where: { id: 6 },
        include: this.model,
      });
      res.json(enrolled);
    } catch (e) {
      console.log(e);
    }
  };
}
module.exports = ClassSubjectController;
