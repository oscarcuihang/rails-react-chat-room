# Rails React Chatroom
### Technical Design
Originally the Backend was using Python Flask, but after a week of learning, setup, and integrating with React and database. I finally decided to use Rails as the server for the sake of time.

Since I already have the project started and partial implemented for [Flask-React-Chatroom](https://github.com/oscarcuihang/react-flask-chat-room), I'm going to keep working working on this project while learning Python, Flask, and other tools which are needed.

Stack Compare

| Tables | Rails Version| Flask Version |
| ------------- |:-------------:| -----:|
| Server | Rails | Flask |
| Websocket | ActionCable | gevent |
| Database | ActiveRecord(Any DB) | pymysql |


#### Backend ([Ruby on Rails](https://rubyonrails.org/))

Rails is a powerful framework for fullstack project. But in this project, Rails is used as a backend server and providing Data and API. By initialize a new project, generate new MVCs, the project is good to run at any time.

Difficulties and Solutions:

1. First time with Rails [ActionCable](http://guides.rubyonrails.org/action_cable_overview.html).
  * Action Cable seamlessly integrates WebSockets with the rest of your Rails application.
  * [ActionCable integrat with React](https://blog.bigbinary.com/2015/07/19/using-reactjs-with-rails-actioncable.html)

2. User System with [Devise](https://github.com/plataformatec/devise)
  * User system has a `.erb` version UI, I have to keep it unit all UI is migrated to React
  * Doesn't implement user count retrieval by email

Future Improvements:
1. Rails API only backend
2. Migrate User System to components

#### Frontend ([React](https://reactjs.org/))

Difficulties and Solutions:
1. Webpack for dev
  * [Rails WebPakcer](https://github.com/rails/webpacker)
2. WebSocket with Rails ActionCable
  * [npm actioncable](https://www.npmjs.com/package/actioncable)
  * cable initialize
  ```
    import cable from 'actioncable';
  let consumer;

  function createChannel(...args) {
      if (!consumer) {
          consumer = cable.createConsumer();
        }
        return consumer.subscriptions.create(...args);
  }
  export default createChannel;
  ```
    * Connect rails ActionCables channel
    ```(javascript)
    import createChannel from "./cable";
    let callback; // declaring a variable that will hold a function later
    
    // initialize chat, ChatroomChannel matches the server side channel's name
    const chat = createChannel("ChatroomChannel", {
      received({ message }) {
        if (callback) callback.call(null, message);
      }
    });

  // any parent comment(s) is able to call this function and pass a message to the server channel listener
    function sendMessage(message) {
      chat.perform("send_message", { message });
    }

  // any parent comment(s) is able to call this callback function from the service channel, and update component based on callback
    function setCallback(fn) {
      callback = fn;
    }

    export { sendMessage, setCallback };

    ```

#### UI Frameworks
##### [Material-UI](https://material-ui.com/)

For the mojarity part of this project is using Material-UI as a UI framework. And it's compatible easily with React. But there are some downside of this framework. I'm trying to find a project navigation bar that matchs the rails portion, but unfortunately I have to leave the navbar as the rails layout at this time until I can find a better UI framework that has more elements options.

##### rails-bootstrap
This this only used on the rails side. The project needs this b/c of the navbar and user system(devise), devise has pre-build front-end in bootstrap. I'll keep as it is until there is a better UI framework,

#### Future Improvements:
1. Reconstruct folder and files directory
2. Add foreman to start project with rails, react, and redis
3. Eliminate bootstrap, and all un-nessary libraries from the server side.

#### Datamodel
##### User
User Table is ceated by devise, but the core columns are

| Column        | Type           |
| ------------- |:-------------:|
|id|int|
|email|string|
|encrypted_password|string|
|name|string|

##### Chatroom
| Column        | Type           |
| ------------- |:-------------:|
|id|int|
|name|string|

##### ChatroomUser
| Column        | Type           |
| ------------- |:-------------:|
|id|int|
|chatroom_id|int|
|user_id| int|

##### Message
| Column        | Type           |
| ------------- |:-------------:|
|id|int|
|chatroom_id|int|
|user_id|int|
|content| text|
