/**
 * Chat room message template
 * @extends {Template}
 */
class ChatRoomMessageTemplate extends Template {

    /**
     * Constructor
     * @return {ChatRoomMessageTemplate}
     */
    constructor(){
        super({
            elements: {
                avatar: '[data-name="avatar"]',
                user: '[data-name="user"]',
                text: '[data-name="text"]'
            }
        });
        return this;
    }

    /**
     * Process render data
     * @param {object} data 
     * @return {object}
     */
    processRenderData(data){
        data.user = data.user + ":";
        return data;
    }
}
customElements.define('template-chatroom-message', ChatRoomMessageTemplate);