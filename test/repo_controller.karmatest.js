var assert = chai.assert;

describe('repo_controller', function() {
  it('should contain a repo list array', function(done) {
    var scope = {};
    var ctrl = new RepoListController(scope);

    assert.typeOf(scope.repos, 'array');
    done();
  });

  
});

