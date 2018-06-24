class ChatroomsChannel < ApplicationCable::Channel
  def subscribed
    current_user.chatrooms.each do |chatroom|
      stream_from "chatrooms:#{chatroom.id}"
    end
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
      # MessageRelayJob.perform_later(message)
      # ActionCable.server.broadcast 'chatrooms', message: render(message)
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