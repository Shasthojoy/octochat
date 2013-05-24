var UserController = function($scope, $http) {
  $http.get('/user').success(function(retrievedUser) {
    $scope.User = retrievedUser;
  });
};
