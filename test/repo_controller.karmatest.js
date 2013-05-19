describe('Repo controllers', function() {
  describe('RepoListController', function() {
    it('repo list should be initially void', function() {
      var scope = {};
      var ctrl = new RepoListController(scope);
      expect(scope.repos.length).toBe(0);
    });
  });
});

