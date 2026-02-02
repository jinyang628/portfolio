.PHONY: lint

lint:
	npm run lint:fix
	npx prettier --write .
