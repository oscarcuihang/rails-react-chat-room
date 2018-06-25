Rails.application.routes.draw do
  root to: 'chatrooms#index'

  resources :chatrooms do
    patch 'join', on: :collection
    resource :chatroom_users
    resources :messages
  end

  devise_for :users
  # devise_for :users, :controllers => {:registrations => "registrations"}
  # mount ActionCable.server, at: ‘/cable’

end
