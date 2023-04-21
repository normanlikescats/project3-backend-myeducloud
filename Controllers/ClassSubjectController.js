class ClassSubjectController {
  constructor(model, userSubject) {
    this.model = model;
    this.userSubject = userSubject;
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

      const classUpdate = await this.userSubject.findOrCreate({
        user_id: userId,
        class_subject_id: classSubjectId,
      });

      const usersInTheClass = await this.userSubject.findAll({
        where: { class_subject_id: classSubjectId },
      });

      res.json(usersInTheClass);
    } catch (e) {
      console.log(e);
    }
  };
}
module.exports = ClassSubjectController;
