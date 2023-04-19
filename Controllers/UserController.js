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

  getOne = async (req, res) => {
    try {
      const { userEmail } = req.body;
      const condition = { where: { email: userEmail } };
      const profile = await this.model.find(condition);

      return res.json(profile);
    } catch (e) {
      console.log(e);
    }
  };

  createProfile = async (req, res) => {
    try {
      const { first_name, last_name, email, password, status, photo_url } =
        req.body;

      // const condition = { where: { email: email } };
      // const [user] = await this.model.findOrCreate(condition);
      const newProfile = await this.model.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        status: status,
        photo_url: photo_url,
      });
      res.json(newProfile);
    } catch (e) {
      console.log(e);
    }
  };

  editProfile = async (req, res) => {
    try {
      const { first_name, last_name, email, password, status, photo_url } =
        req.body;

      const { userId } = req.params;
      const condition = { where: { id: userId } };
      const updatedProfile = await this.model.update(
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          status: status,
          photo_url: photo_url,
        },
        condition
      );
      const allStudents = await this.model.findAll({
        where: { status: false },
      });
      res.json(allStudents);
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = UserController;
