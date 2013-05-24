alltests: nodetest firefoxtest

compile:
	./node_modules/.bin/uglifyjs weblib/* -o assets/js/octochat.min.js

nodetest:
	./node_modules/.bin/mocha test/*.mochatest.js

firefoxtest:
	./node_modules/.bin/karma start ./test/karmaconf.js $$*

karmadev:
	PHANTOMJS_BIN="/usr/local/share/npm/bin/phantomjs" ./node_modules/.bin/karma start ./test/karmadev.js $$*
