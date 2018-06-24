class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    current_user.chatrooms.each do |chatroom|
      stream_from "chatroom:#{chatroom.id}"
    end
  end

  def send_message(payload)
    data = payload['message']
    chatroom = Chatroom.find(data['chatroom_id'])
    message = chatroom.messages.new(content: data['message_content'])
    message.user = current_user

    if message.save
      callback = { message: message, user: message.user, sender_ind: current_user.id == message.user.id }
      ActionCable.server.broadcast "chatroom:#{message.chatroom.id}", {
        message: callback,
        chatroom_id: message.chatroom.id,
      }
    end
  end

  def unsubscribed
    stop_all_streams
  end
end