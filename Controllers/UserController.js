class UserController {
  constructor(model) {
    this.model = model;
  }

  getAllStudents = async (req, res) => {
    try {
      const condition = { where: { status: false } };
      const allStudents = await this.model.findAll();

      res.json(allStudents);
    } catch (e) {
      console.log(e);
    }
  };

  getOrCreate = async (req, res) => {
    try {
      const condition = {
        where: { email: req.body.userEmail },
      };
      const newProfile = await this.model.findOrCreate(condition);
      const profile = await this.model.findAll(condition);
      return res.json(profile);
    } catch (e) {
      console.log(e);
    }
  };

  editProfile = async (req, res) => {
    try {
      const { first_name, last_name, status, photo_url, userEmail } = req.body;

      const condition = { where: { email: userEmail } };
      const updatedProfile = await this.model.update(
        {
          first_name: first_name,
          last_name: last_name,
          status: status,
          photo_url: photo_url,
        },
        condition
      );
      const profile = await this.model.findAll(condition);
      res.json(profile);
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = UserController;
