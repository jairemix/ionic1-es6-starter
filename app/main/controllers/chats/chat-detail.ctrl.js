'use strict';

angular.module('starter.main')

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

;
