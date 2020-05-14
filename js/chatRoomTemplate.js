/**
 * Chat room template.
 * @extends {Template}
 */
class ChatRoomTemplate extends Template {

    /**
     * Constructor
     * @param {object} [options={}
     * @return {ChatRoomTemplate}
     */
    constructor(options = {}){
        let defaults = {
            elements: {
                // header
                header: '.chatroom-header',
                icon: '.chatroom-icon',
                img: '.chatroom-img',
                lock: '.chatroom-ock',
                info: '.chatroom-info',
                users: '.chatroom-users',
                clientCount: '[data-name="clientCount"]',
                name: '[data-name="name"]',
                // room
                room: '.chatroom-room',
                chat: '.chatroom-chat',
                userList: '.chatroom-userlist',
                textInput: '[name="text"]',
                submitButton: '[type="submit"]'
            }
        };
        super(Object.extend(defaults, options));
        this.userManager = new ChatRoomUserTemplateManager(this.elements.userList);
        this.messageManager = new ChatRoomMessageTemplateManager(this.elements.chat);
        return this;
    }

    /**
     * Connected callback
     */
    connectedCallback(){
        super.connectedCallback();
        this.attachInputHandlers();
        this.attachDomHandlers();
        this.attachButtonHandlers();
    }

    /**
     * Attach input handlers
     * @return {ChatRoomTemplate}
     */
    attachInputHandlers(){
        let self = this;
        
        /**
         * If enter key is pressed, submit the chat text
         * @param {KeyboardEvent} event 
         */
        function documentOnEnterKey(event){
            if(event.keyCode === 13){
                self.submit();
            }
        }
        this.elements.textInput.addEventListener('focus', function(){
            document.addEventListener('keyup', documentOnEnterKey);
        });
        this.elements.textInput.addEventListener('blur', function(){
            document.removeEventListener('keyup', documentOnEnterKey)
        });
        return this;
    }

    /**
     * Attach DOM handlers
     * @return {ChatRoomTemplate}
     */
    attachDomHandlers(){
        this.elements.header.addEventListener('click', function(){
            Template.toggle(self.elements.room);
        });
        return this;
    }

    /**
     * Attach button handlers.
     * @return {ChatRoomTemplate}
     */
    attachButtonHandlers(){
        let self = this;
        this.elements.submitButton.addEventListener('click', function(){
            self.submit();
        });
        return this;
    }


    /**
     * Serialize the message
     * @return {object}
     */
    serializeMessage(){
        return {
            text: this.elements.textInput.value
        };
    }

    /**
     * Clear the text input
     * @return {ChatRoomTemplate}
     */
    clearInput(){
        this.elements.textInput.value = "";
        return this;
    }

    /**
     * Scroll the chat area to the bottom
     * @return {ChatRoomTemplate}
     */
    scrollChatToBottom(){
        this.elements.chat.scrollTop = this.elements.chat.scrollHeight - this.elements.chat.clientHeight;
        return this;
    }

    /**
     * Serialize and submit the message.
     * Clear the input.
     * @return {ChatRoomTemplate}
     */
    submit(){
        let message = this.serializeMessage();
        this.emit('message', message);
        this.clearInput();
        return this;
    }

    /**
     * Process data to be rendered
     * @param {object} data
     * @param {number} data.maxClient
     * @return {object}
     */
    processRenderData(data){
        data.maxClients = data.maxClients ? "/" + data.maxClients : "";
        return data;
    }

    /**
     * Render the client count
     * @param {number} count
     * @return {ChatRoomTemplate}
     */
    renderClientCount(count){
        this.elements.clientCount.innerHTML = count;
        return this;
    }

    /**
     * Append a message to the chat log
     * @param {object} message 
     * @return {ChatRoomTemplate}
     */
    appendMessage(message){
        this.messageManager.appendMessage(message.id, message);
        this.scrollChatToBottom();
        return this;
    }

    /**
     * Append a client to the client list
     * @param {object} client
     * @return {ChatRoomTemplate}
     */
    appendClient(client){
        this.userManager.appendClient(client.id, client);
        this.cachedData.clientCount++;
        this.renderClientCount(this.cachedData.clientCount);
        return this;
    }

    /**
     * Remove a client from the client list
     * @param {object} client
     * @return {ChatRoomTemplate}
     */
    removeClient(id){
        this.userManager.removeClient(id);
        this.cachedData.clientCount--;
        this.renderClientCount(this.cachedData.clientCount);
        return this;
    }

    /**
     * Render the template
     * @param {object} data 
     * @return {ChatRoomTemplate}
     */
    render(data){
        super.render(data);
        let clients = ElementManager.dataArrayToDataObject(data.clients);
        this.userManager.render(clients);
        this.messageManager.render(data.messages);
        return this;
    }
}
customElements.define('template-chatroom', ChatRoomTemplate);