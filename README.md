# Rails React Chatroom
  * [Project Board](https://github.com/oscarcuihang/rails-react-chat-room/projects/1)
  * [Technical Design](docs/TECHDESIGN.md)

## Development
### [Install Ruby and Rails](https://gorails.com/setup/osx/10.13-high-sierra)
You can stop after install sqlite3, this project is using sqlite, but you can easily migrate to any database by installing the database and change [database config](/config/database.yml)

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
* `$ rails s -p 3000` 

Start react server (FrontEnd)
* open a new console
* `$ bin/webpack-dev-server` 

Start redis server (Websocket)
* open a new console
* `$ redis-server` 

Visit in broswer
* http://localhost:3000 

### File Structure
```
.
|-- app
|   |-- assets
|   |   |-- stylesheets
|   |-- controllers
|   |-- channels
|   |-- helpers
|   |-- views
|   |-- webpacker
|-- config
|-- db
|-- Gemfile
|-- Gemfile.lock
|-- package.json
|-- lib
|-- log
```

##### app/controllers/
This director contains all ActionController logic
##### app/channels/
This director contains all ActionCable logic
##### app/model/
This director contains all ActiveModel
##### app/views/
This director contains all basic layout structures
##### app/webpacker/
This director contains all react components
##### db
This director contains all migration files, and `schema.rb`, and `seeds.rb`
##### config
This director contains all rails, database, and webpacker configurations
##### Gemfile
This file contains all Rails dependencies
##### package.json
This file contains all React dependencies

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
1. User Index Page
![index](https://github.com/oscarcuihang/rails-react-chat-room/raw/master/images/1.png "index page")
  1. My Chatroom
    * `General` Chatroom is added for every user by default, and user is unable to leave General Chatroom
    * User has option to create a new chatroom, if chat room already exists, no new room will be created
    * User has option to join a chatroom by typing the room name.
    * User has all joined chatrooms listed, and has options to open the chatroom by click on the room name or leave a room by click `Leave`
  2. Chatrooms
    * List of all existing chatrooms in system
    * User has option to join the chatroom, user is unable to view any message before join a chatroom
  3. Users
    * List of all users in system
    * User hsa option to open a person to person chat by click on others' name.

2. Chat Room Page
![chat-room](https://github.com/oscarcuihang/rails-react-chat-room/raw/master/images/2.png "index page")
* Chatroom will always retrive the last 100 messages for server after page is reload.
* User's message will be shown on the right, other users' messages will be shown on the left.

3. Person to Person Page
![p2p-chat](https://github.com/oscarcuihang/rails-react-chat-room/raw/master/images/3.png "index page")
* Chatroom will always retrive the last 100 messages for server after page is reload.
* User's message will be shown on the right, other users' messages will be shown on the left.
* P2P chatroom is unable for a third person

## How to run the test suite
Test to be added

## Contributing 
Bug reports and pull requests are welcome on [GitHub](https://github.com/oscarcuihang/rails-react-chat-room). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.
