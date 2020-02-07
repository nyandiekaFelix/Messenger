import SendBird from "sendbird";

const appId = "";
const sb = new SendBird({ appId: appId });


export default {
  
  /**
   * @function loginUser
   * @param {number} userId
   * @description Login a user to SendBird application 
   */
  loginUser(userId) {
    return new Promise((resolve, reject) => {
      sb.connect(userId, function(user, error){
        if (error) reject(new Error(`Login Failed: ${error}`));
        resolve(user);
      });
    });
  },

  /**
   * @function startChat
   * @param {Array} userIds
   * @description SendBird enables the creation of private channels; To start a one-on-one chat needs creation of a channel with two members  
   */
  startChat(userIds) {
    return new Promise((resolve, reject) => {
      // The boolean argument below directs the app to look for an existing chat between
      // the two users. Creates a new chat if no match is found
      sb.GroupChannel.createChannelWithUserIds(
        userIds, true, function(channel, error) {
        if (error) reject(new Error(`Channel creation Failed: ${error}`));
        resolve(channel);
      });
    });
  },
  
  /**
   * @function getChat
   * @param {string} channelUrl
   * @description get a single chat
   */
  getChat(channelUrl) {
    return new Promise((resolve, reject) => {
      sb.GroupChannel.getChannel(channelUrl, function(groupChannel, error) {
        if(error) reject(new Error(`Could not get channel: ${error}`));
        resolve(groupChannel);
      });
    });
  },
  
  /**
   * @function deleteChat
   * @param {string} channelUrl
   * @description clear chat history for a specific chat
   */
  deleteChat(channel) {
    return new Promise((resolve,reject) => {
      channel.resetMyHistory(function(response, error) {
        if (error) reject(new Error(`Couldn't delete chat: ${error}`));
        resolve(response);
      });
    });
  },

   /**
   * @function sendMessage
   * @param {Object} channel
   * @param {string} message
   * @description Send a message to another user
   */
  sendMessage(channel, message) {
    return new Promise((resolve, reject) => {
      channel.sendUserMessage(message, (message, error) => {
        if (error) reject(new Error(`Message send Failure: ${error}`));
        resolve(message);
      })
    })
  },
  
  /**
   * @function getChatList
   * @description get a list of chats for current user
   */
  getChatList() {
    return new Promise((resolve, reject) => {
      const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
      channelListQuery.includeEmpty = true;
      channelListQuery.order = 'latest_last_message';

      if (channelListQuery.hasNext) {
        channelListQuery.next(function(channelList, error) {
          if (error) reject(new Error(`Could not get list: ${error}`));
          resolve(channelList);
        });
      }
    });
  },

  /**
   * @function getChatMessages
   * @param {Object} channel
   * @description get message history for selected chat
   */
  getChatMessages(channel) {
    return new Promise((resolve, reject) => {
      const previousMessages = channel.createPreviousMessageListQuery();
      previousMessages.reverse = false;
      previousMessages.load(function(messages, error) {
        if (error) reject(new Error(`Could not get messages: ${error}`));
        resolve(messages);
      });
    });
  },
}
