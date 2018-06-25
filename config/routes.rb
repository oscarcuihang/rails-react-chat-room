Rails.application.routes.draw do
  root to: 'chatrooms#index'

  resources :chatrooms do
    patch 'join', on: :collection
    delete 'leave', on: :collection
    resource :chatroom_users
    resources :messages
  end

  devise_for :users
end
