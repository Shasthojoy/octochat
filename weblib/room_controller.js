var RoomController = function($scope, $http) {

  $scope.enable = function(roomId) {
    var roomIdUE = encodeURIComponent(roomId);
    $http.post('/room/' + roomIdUE).success(function(retrievedRoom) {
      $scope.User.repos[roomId].enabled = true;
    });
  };

  $scope.disable = function(roomId) {
    var roomIdUE = encodeURIComponent(roomId);
    $http.delete('/room/' + roomIdUE).success(function(retrievedRoom) {
      $scope.User.repos[roomId].enabled = false;
    });
  };

};
