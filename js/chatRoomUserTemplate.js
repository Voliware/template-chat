/**
 * Chat room user template.
 * Represents a user in a chat room.
 * @extends {Template}
 */
class ChatRoomUserTemplate extends Template {

    /**
     * Constructor
     * @return {ChatRoomUserTemplate}
     */
    constructor(){
        super({
            elements: {
                avatar: '[data-name="avatar"]',
                name: '[data-name="name"]'
            }
        });
        return this;
    }

    /**
     * Process render data.
     * Provide a default avatar if there is none.
     * @param {object} data 
     * @extends {Template}
     */
    processRenderData(data){
        if(!data.avatar || data.avatar === ""){
            data.avatar = "<img src='/img/avatar.png'>"
        }
        return data;
    }
}
customElements.define('template-chatroom-user', ChatRoomUserTemplate);