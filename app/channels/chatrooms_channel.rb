class ChatroomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chatrooms:#{current_user.id}"
  end

  def send_message(payload)

    data = payload['message']
    chatroom = Chatroom.find(data['chatroom_id'])
    message = chatroom.messages.new(content: data['message_content'])
    message.user = current_user

    if message.save
      callback = { message: message, user: message.user, sender_ind: current_user.id == message.user.id }
      ActionCable.server.broadcast "chatrooms:#{message.chatroom.id}", {
        message: callback,
        chatroom_id: message.chatroom.id,
      }
    end
  end

  def unsubscribed
    stop_all_streams
  end

  private
  def render(message)
    ApplicationController.new.helpers.c('message', message: message)
  end
end