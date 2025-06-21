install:
	npm ci
publish:
	npm publish --dry-run
chmod:
	chmod +x ./bin/gendiff.js
lint:
	npx eslint

