# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

unless Rails.env.production?
  general_room = Chatroom.create(name: 'General')

  10.times do
    user = User.create(name: Faker::Name.name, email: Faker::Internet.email, password: Faker::Internet.password(8))
    general_room.users << user
  end

  5.times do
    chatroom = Chatroom.create(name: Faker::Company.name)
    rand(50..100).times do
      message = chatroom.messages.new(content: Faker::Lorem.paragraph)
      message.user = User.find(rand(1..10))
      message.save
    end
  end 
end