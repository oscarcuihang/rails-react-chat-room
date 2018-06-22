class MessageRelayJob < ApplicationJob
  queue_as :default

  def perform(msg)
    ActionCable.server.broadcast "chatrooms:#{message.chatroom.id}", {
      message: MessagesController.render(message),
      chatroom_id: message.chatroom.id,
    }
  end
end
