class MessageController {
  constructor(model, chatrooms, users) {
    this.model = model;
    this.chatrooms = chatrooms;
    this.users = users;
  }

  // getMessages = async (req, res) => {
  //   try {
  //     const messages = await this.model.findAll();

  //     res.json(messages);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  getMessages = async (req, res) => {
    try {
      const messages = await this.model.findAll({
        attributes: ["message", "user_id", "chatroom_id", "createdAt"],
      });

      const formattedMessages = messages.map((message) => ({
        ...message.toJSON(),
        createdAt: `${new Date(message.createdAt).getHours()}:${new Date(
          message.createdAt
        ).getMinutes()}`,
      }));

      res.json(formattedMessages);
    } catch (e) {
      console.log(e);
    }
  };

  addMessage = async (req, res) => {
    const { message, chatroom_id, user_id } = req.body;
    try {
      const newMessage = await this.model.create({
        message: message,
        chatroom_id: chatroom_id,
        user_id: user_id,
      });

      res.json(newMessage);
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = MessageController;
