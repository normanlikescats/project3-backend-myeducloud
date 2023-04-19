class MessageRouter {
  constructor(messageController, express) {
    this.controller = messageController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.getMessages);
    router.post("/", this.controller.addMessage);

    return router;
  };
}

module.exports = MessageRouter;
