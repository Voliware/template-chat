/**
 * Chat room message template manager
 * @extends {ElementManager}
 */
class ChatRoomMessageTemplateManager extends ElementManager {

    /**
     * Constructor
     * @param {HTMLElement} wrapper 
     * @return {ChatRoomMessageTemplateManager}
     */
    constructor(wrapper){
        let template = document.getElementById('chatroom-message-template');
        super(wrapper, template, {
            removeTemplate: false,
            removeDeadTemplates: false
        });
        return this;
    }

    /**
     * Append a single message.
     * @param {string} messageId
     * @param {object} message
     * @return {ElementManager} 
     */
    appendMessage(messageId, message){
        return this.renderSingle(messageId, message);
    }
}