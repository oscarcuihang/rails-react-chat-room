class ChatroomsController < ApplicationController
  before_action :set_chatroom, only: [:show, :edit, :update, :destroy]

  # GET /chatrooms
  # GET /chatrooms.json
  def index
    @data = {}
    chatrooms =
      if current_user.nil?
        nil
      else
        current_user.chatrooms << Chatroom.first unless current_user.chatrooms.include?(Chatroom.first)
        current_user.chatrooms
      end
    @data['chatrooms'] = chatrooms.reject{ |room| room.name.nil? }
    @data['allChatrooms'] = Chatroom.all.reject{ |room| room.name.nil? || room.users.include?(current_user) }
    @data['currentUser'] = current_user
    @data['users'] = User.all.reject{ |user| user == current_user }
  end

  # GET /chatrooms/1
  # GET /chatrooms/1.json
  def show
    messages = @chatroom.messages.order(created_at: :desc).limit(100).reverse
    @data = {}
    msgs = []
    if  !current_user_view_permission
      @data['messages'] = msgs
      @data['chatUsers'] = []
    else
      messages.each do |msg|
        msgs << {message: msg, user: msg.user}
      end
      @data['messages'] = msgs
      @data['chatUsers'] = @chatroom.users.reject{ |user| user == current_user }
    end
      @data['viewPermission'] = current_user_view_permission
      @data['chatroom'] = @chatroom
      @data['currentUser'] = current_user
  end

  # GET /chatrooms/new
  def new
    @chatroom = Chatroom.new
  end

  # GET /chatrooms/1/edit
  def edit
  end

  # POST /chatrooms
  # POST /chatrooms.json
  def create
    if Chatroom.find_by(name: chatroom_params)
      return render json: { status: 'fail', message: 'data exists' }, status: 442
    end
    chatroom = Chatroom.new(name: chatroom_params)
    user = User.find(user_params[:id])
    chatroom.users << user unless chatroom.users.include?(user)
    chatroom.save
    render json: { status: 'success', data: chatroom }, status: 200
  end

  def join
    # binding.pry
    chatroom = Chatroom.find_by(name: chatroom_params)
    return render json: { status: 'fail', message: 'data does not exist' }, status: 404 unless chatroom
    user = User.find(user_params[:id])
    return render  json: { status: 'fail', message: 'data does not exist' }, status: 442 if chatroom.users.include?(user)
    chatroom.users << user
    render json: { status: 'success', data: chatroom }, status: 200
  end


  def leave
    chatroom = Chatroom.find(chatroom_id_params)
    user = User.find(user_params[:id])
    return render  json: { status: 'fail', message: 'data does not exist' }, status: 442 unless chatroom.users.include?(user)
    ChatroomUser.where(user: user, chatroom: chatroom).destroy_all
    render json: { status: 'success', data: 'left chatroom' }, status: 200
  end

  def personal
    sender = User.find(user_params[:id])
    reciever = User.find(reciever_params[:id])
    chatrooms = Chatroom.where(name: nil).reject{|room| room.users.count != 2}
    chatrooms = chatrooms.reject{ |room| !room.users.include?(sender) || !room.users.include?(reciever) }
    
    if chatrooms.present?
      return render json: { status: 'success', data: chatrooms.first }, status: 200
    end
    chatroom = Chatroom.new()
    chatroom.users << sender
    chatroom.users << reciever
    chatroom.save!
    return render json: { status: 'success', data: chatroom }, status: 200

  end

  # PATCH/PUT /chatrooms/1
  # PATCH/PUT /chatrooms/1.json
  def update
    respond_to do |format|
      if @chatroom.update(chatroom_params)
        format.html { redirect_to @chatroom, notice: 'Chatroom was successfully updated.' }
        format.json { render :show, status: :ok, location: @chatroom }
      else
        format.html { render :edit }
        format.json { render json: @chatroom.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /chatrooms/1
  # DELETE /chatrooms/1.json
  def destroy
    @chatroom.destroy
    respond_to do |format|
      format.html { redirect_to chatrooms_url, notice: 'Chatroom was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chatroom
      @chatroom = Chatroom.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def chatroom_params
      params.require(:chatroomName)
    end

    def chatroom_id_params
      params.require(:chatroomId)
    end

    def user_params
      params.require(:currentUser).permit(:id)
    end

    def reciever_params
      params.require(:reciever).permit(:id)
    end

    def current_user_view_permission
      @chatroom.users.include?(current_user)
    end
end
