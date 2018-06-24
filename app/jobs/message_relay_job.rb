class MessageRelayJob < ApplicationJob
  queue_as :default

  def perform(message)
      callback = { message: message, user: message.user, sender_ind: current_user.id == message.user.id }
      ActionCable.server.broadcast "chatrooms:#{message.chatroom.id}", {
        message: callback,
        chatroom_id: message.chatroom.id,
      }
  end
end
