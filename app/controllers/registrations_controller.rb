class RegistrationsController < Devise::RegistrationsController
  after_action :add_general_chatroom, only: [create]

  def create
    super
  end
  
  private
  def add_general_chatroom
    binding.pry
    current_user.chatrooms << Chatroom.first
  end
end
