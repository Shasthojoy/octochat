alltests:
	./node_modules/.bin/mocha test/*.mochatest.js
	./node_modules/.bin/karma start ./test/karmaconf.js $$*

karmadev:
	./node_modules/.bin/karma start ./test/karmadev.js $$*
