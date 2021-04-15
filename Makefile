#!/usr/bin/env make -f
.POSIX:
.SUFFIXES:

.PHONY: help
help: ## Show this help (default)
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: test
test: test-node test-node-predicate test-deno test-deno-predicate ## Run all tests

.PHONY: test-node
test-node: cli.js ## Run node tests
	node $< 1.0 1.0
	node $< 1.0 0.9 || ([ $$? -eq 1 ] && true || exit 3)
	node $< 1.0 1.9 || ([ $$? -eq 2 ] && true || exit 3)
	node $< abc abc >/dev/null || ([ $$? -eq 3 ] && true || exit 3)

.PHONY: test-node-predicate
test-node-predicate: cli.js ## Run node tests
	node $< 1.0 eq 1.0
	node $< 1.0 eq 2.0 || ([ $$? -eq 1 ] && true || exit 3)
	node $< 1.0 le 1.0
	node $< 1.0 ge 1.0
	node $< 1.0 le 1.0.1
	node $< 1.0 le 0.9 || ([ $$? -eq 1 ] && true || exit 3)
	node $< 1.0.2 ge 1.0.1
	node $< 1.0 ge 1.9 || ([ $$? -eq 1 ] && true || exit 3)
	node $< abc ge abc >/dev/null || ([ $$? -eq 3 ] && true || exit 3)

.PHONY: test-deno
test-deno: semver-compare.js ## Run deno tests
	deno run $< 1.0 1.0
	deno run $< 1.0 0.9 || ([ $$? -eq 1 ] && true || exit 3)
	deno run $< 1.0 1.9 || ([ $$? -eq 2 ] && true || exit 3)
	deno run $< abc abc >/dev/null || ([ $$? -eq 3 ] && true || exit 3)

.PHONY: test-deno-predicate
test-deno-predicate: semver-compare.js ## Run deno tests
	deno run $< 1.0 eq 1.0
	deno run $< 1.0 eq 2.0 || ([ $$? -eq 1 ] && true || exit 3)
	deno run $< 1.0 le 1.0
	deno run $< 1.0 ge 1.0
	deno run $< 1.0 le 1.0.1
	deno run $< 1.0 le 0.9 || ([ $$? -eq 1 ] && true || exit 3)
	deno run $< 1.0.2 ge 1.0.1
	deno run $< 1.0 ge 1.9 || ([ $$? -eq 1 ] && true || exit 3)
	deno run $< abc ge abc >/dev/null || ([ $$? -eq 3 ] && true || exit 3)
