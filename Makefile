# ------------------------------------------------------------------------------
# (C) Copyright 2023 Hewlett Packard Enterprise Development LP
# ------------------------------------------------------------------------------

MAKEFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))

## help: Output this message and exit
.PHONY: help
help:
	@fgrep -h '##' $(MAKEFILE_LIST) | fgrep -v fgrep | column -t -s ':' | sed -e 's/## //'

## clean: Remove node_modules and build artifacts
.PHONY: clean
clean:
	npm run clean

## node_modules: install dependencies
node_modules: package.json package-lock.json
	@echo "Installing dependencies..."
	npm ci
	npm run bootstrap

## build: build the component
.PHONY: build
build: node_modules
	npm run build

## publish: publish the component
.PHONY: publish
publish:
	npm publish --registry=https://artifactory.eng.nimblestorage.com/artifactory/api/npm/npm-dscc-local/
