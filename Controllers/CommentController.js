class CommentController {
  constructor(model) {
    this.model = model;
  }

  getComment = async (req, res) => {
    try {
      const { userId, questionnaireId } = req.body;
      const condition = {
        where: { user_id: userId, questionnaire_id: questionnaireId },
      };
      const comments = await this.model.findAll(condition);

      res.json(comments);
    } catch (e) {
      console.log(e);
    }
  };

  postComment = async (req, res) => {
    try {
      const { userId, questionnaireId, comment } = req.body;

      const postNewComment = await this.model.create({
        user_id: userId,
        questionnaire_id: questionnaireId,
        comment: comment,
      });

      res.json(postNewComment);
    } catch (e) {
      console.log(e);
    }
  };

  editComment = async (req, res) => {
    try {
      const { commentId, comment } = req.body;
      const condition = { where: { id: commentId } };
      const updatedComment = await this.model.update(
        { comment: comment },
        condition
      );
      const newUpdatedComment = await this.model.findByPk(commentId);
      res.json(newUpdatedComment);
    } catch (e) {
      console.log(e);
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { userId, questionnaireId, commentId } = req.body;
      const deletedComment = await this.model.destroy({
        where: { id: commentId },
      });
      const condition = {
        where: { user_id: userId, questionnaire_id: questionnaireId },
      };
      const comments = await this.model.findAll(condition);
      res.json(comments);
    } catch (e) {
      console.log(e);
    }
  };
}
module.exports = CommentController;
