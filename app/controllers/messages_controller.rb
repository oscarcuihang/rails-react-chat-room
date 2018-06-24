class MessagesController < ApplicationController
  before_action :authenticate_user!

  before_action :set_chatroom

  def create
    message = @chatroom.messages.new(content: msg_params)
    message.user = current_user
    if message.save!
      render json: { status: 'success'}, status:200
    else
      render json: { status: 'noooooo failed'}, status:400
    end
  end

  private

  def set_chatroom
    @chatroom = Chatroom.find(params[:chatroom_id])
  end

  def msg_params
    params.require(:message_content)
  end
end
