var UserController = function($scope, $http) {
  $http.get('/user').success(function(retrievedUser) {
    $scope.User = retrievedUser;
  });

  $scope.update = function() {
    $http.put('/user').success(function(retrievedUser) {
      $scope.User = retrievedUser;
    });
  };
};
