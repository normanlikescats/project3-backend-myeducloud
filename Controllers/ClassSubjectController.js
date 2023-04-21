class ClassSubjectController {
  constructor(model) {
    this.model = model;
  }

  getAllClassSubjects = async (req, res) => {
    try {
      const allClasses = await this.model.findAll();

      return res.json(allClasses);
    } catch (e) {
      console.log(e);
    }
  };
}
module.exports = ClassSubjectController;
