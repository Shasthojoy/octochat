alltests:
	./node_modules/.bin/mocha test/*.mochatest.js
	./node_modules/.bin/karma start ./test/karmaconf.js $$*

karmadev:
	PHANTOMJS_BIN="/usr/local/share/npm/bin/phantomjs" ./node_modules/.bin/karma start ./test/karmadev.js $$*
