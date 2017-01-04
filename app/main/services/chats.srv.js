'use strict';

angular.module('starter')

.factory('Chats', function () {

  // Some fake testing data
  let chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'main/assets/images/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'main/assets/images/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'main/assets/images/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'main/assets/images/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'main/assets/images/mike.png'
  }];

  /** service public interface **/

  const Chats = {
    all: all,
    remove: remove,
    get: get
  };
  return Chats;

  /** service implementation **/

  function all () {
    return chats;
  }

  function remove (chat) {
    chats.splice(chats.indexOf(chat), 1);
  }

  function get (chatId) {
    chatId = parseInt(chatId);
    return _.find(chats, chat => chat.id === chatId);
  }

})

;
