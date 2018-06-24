class MessagesController < ApplicationController
  before_action :authenticate_user!

  before_action :set_chatroom

  def create
    # binding.pry
    message = @chatroom.messages.new(content: msg_params)
    message.user = current_user
    message.save!
    redirect_to @chatroom
    # respond_to do |format|
    #   format.html { redirect_to @chatroom }
    #   format.json { render json: 'wtf' }
    #   format.js { render 'chatrooms/show', format: :js }
    # end

    # MessageRelayJob.perform_later(message)
  end

  private

  def set_chatroom
    @chatroom = Chatroom.find(params[:chatroom_id])
  end

  def msg_params
    params.require(:message_content)
  end
end
