/**
 * Chat room manager
 * @extends {ElementManager}
 */
class ChatRoomTemplateManager extends ElementManager {

    /**
     * Constructor
     * @return {ChatRoomTemplateManager}
     */
    constructor(){
        let wrapper = document.getElementById('chatroom-list');
        let template = document.getElementById('chatroom-template');
        super(wrapper, template, {
            removeTemplate: false
        });
        return this;
    }

    attachElementHandlers(chatroom){
        chatroom.on('message', function(message){
            console.log(message);
        })
    }
}