# Rails React Chatroom

## Development
### [Install Ruby and Rails](http://railsapps.github.io/installrubyonrails-mac.html)
* Ruby Verions: `2.5.0`
* Rails Version: `5.1.6`

### Install Redis
`$ brew install redis`
### Install dependencies
```
$ git clone https://github.com/oscarcuihang/rails-react-chat-room
$ cd rails-react-chat-room

$ bundle install
(this will install all rails project dependencies)

$ yarn install
(this will install all react dependencies)
```

### Database initialization
Database Setup
```
$ rake db:create db:migrate db:seed
```

Reset Database
```
$ rake db:drop db:create db:migrate db:seed
```

### Start servers
Start rails server (Backend)
* open a new console
* `$ rails s` 

Start react server (FrontEnd)
* open a new console
* `$ bin/webpack-dev-server` 

Start redis server (Websocket)
* open a new console
* `$ redis-server` 

## Datamodel
### User
* User has a name and en email, a user also has multiple chatrooms and message

### Chatroom
* Chatroom has many users and many messages
* General Chatroom is available for all users once signed up
* User can create new chatroom or join an existing chat room

### Message
* Message belongs to a single user and a single Chatroom
* User can send a message on a chatroom, and this message will be viewable for all users in that chatroom

### Screenshots
#### chat room
![chat-room](https://github.com/oscarcuihang/rails-react-chat-room/raw/master/images/chatroom.png "Logo Title Text 1")


## How to run the test suite
Test to be added

## Contributing 
Bug reports and pull requests are welcome on [GitHub](https://github.com/oscarcuihang/rails-react-chat-room). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.
