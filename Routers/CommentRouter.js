class CommentRouter {
  constructor(messageController, express) {
    this.controller = messageController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.getComment);
    router.post("/", this.controller.postComment);
    router.put("/", this.controller.editComment);
    router.delete("/", this.controller.deleteComment);

    return router;
  };
}

module.exports = CommentRouter;
