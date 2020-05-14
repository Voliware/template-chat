/**
 * Chat module
 * @extends {EventSystem}
 */
class Chat extends EventSystem  {

    /**
     * Constructor
     * @return {Chat}
     */
    constructor(){
        super();
        this.wrapper = document.getElementById('chat');
        this.webSocketClient = new WebSocketClient({
            ip: "ws://localhost",
            port: 5001,
        });
        this.attachWebSocketClientHandlers();
        this.chatRoomManager = new ChatRoomTemplateManager();
        return this;
    }

    /**
     * Attach handlers to the web socket client
     * @return {Chat}
     */
    attachWebSocketClientHandlers(){
        let self = this;
        this.webSocketClient.on('open', function(){
            self.getChatRooms();
        });
        this.webSocketClient.on('message', function(data){
            self.routeMessage(data);
        });
        return this;
    }

   /**
    * Route a message from the web socket client
    * @param {object} message 
    * @param {number} message.status
    * @param {number} message.route
    * @param {object} [message.data]
    * @return {ChatRoomTemplate}
    */
   routeMessage(message){
       if(message.status === 0){
           console.error("bad message");
           console.error(message);
           return this;
       }
       return this;
   }

    /**
     * Send a message through the web socket
     * @param {object} message 
     * @return {Chat}
     */
    sendMessage(message){
        this.webSocketClient.sendJson(message);
        return this;
    }

    /**
     * Get all chat rooms
     * @return {Chat}
     */
    getChatRooms(){
        let self = this;
        fetch("/rooms")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                self.renderChatRooms(data);
            })
            .catch(function(e){
                console.error(e);
            });
        return this;
    }
    
    /**
     * Render chat rooms
     * @param {object[]} rooms 
     * @return {Chat}
     */
    renderChatRooms(rooms){
        this.chatRoomManager.render(rooms);
        return this;
    }

    /**
     * Toggle the visibility of the module
     * @return {Chat}
     */
    toggle(state){
        Template.toggle(this.wrapper, state);
        return this;
    }

    /**
     * Initialize the module
     * @return {Chat}
     */
    initialize(){
        this.webSocketClient.connect();
        return this;
    }
}