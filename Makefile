install:
	npm ci
publish:
	npm publish --dry-run
chmod:
	chmod +x ./bin/gendiff.js
lint:
	npx eslint
lint-fix:
	npx eslint --fix
test:
	npm test
test-watch:
	npm test --watch
test-coverage:
	npm test -- --coverage
