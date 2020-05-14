/**
 * Chat room user template manager
 * @extends {ElementManager}
 */
class ChatRoomUserTemplateManager extends ElementManager {

    /**
     * Constructor
     * @param {HTMLElement} wrapper 
     * @return {ChatRoomUserTemplateManager}
     */
    constructor(wrapper){
        let template = document.getElementById('chatroom-user-template');
        super(wrapper, template, {
            removeTemplate: false,
            removeDeadTemplates: false
        });
        return this;
    }

    /**
     * Append a single client to the list.
     * @param {string} clientId
     * @param {object} client
     * @return {ChatRoomUserTemplateManager} 
     */
    appendClient(clientId, client){
        this.renderSingle(clientId, client);
        return this;
    }

    /**
     * Remove a client from the client list
     * @param {string} clientId
     * @return {ChatRoomUserTemplateManager}
     */
    removeClient(clientId){
        this.removeElement(clientId);
        return this;
    }
}