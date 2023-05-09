# ------------------------------------------------------------------------------
# (C) Copyright 2022 Hewlett Packard Enterprise Development LP
# ------------------------------------------------------------------------------

MAKEFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
DEV_IMAGE:=cds-harbor.rtplab.nimblestorage.com/devops/cds-ui-dev
#DEV_IMAGE:=cds-ui-dev
DEV_IMAGE_TAG:=latest
DEV_IMAGE:=${DEV_IMAGE}:${DEV_IMAGE_TAG}

NODE_MODULES_VOLUME:=shared-node-modules
VOLUMES_TO_MOUNT=-v $(shell git rev-parse --show-toplevel)/core:/working -v ${NODE_MODULES_VOLUME}:/working/node_modules 
DOCKER_NETWORK=--network host
HTTP_PROXY=http://web-proxy.corp.hpecorp.net:8080
NO_PROXY=127.0.0.1,localhost,0.0.0.0,.nimblestorage.com,10.0.0.0/8

#DOCKER_BUILD_ARGS_CI= --env HTTP_PROXY=${HTTP_PROXY} \
#		      --env HTTPS_PROXY=${HTTP_PROXY} \
#		      --env NO_PROXY=${NO_PROXY}

## help: Output this message and exit
.PHONY: help
help:
	@fgrep -h '##' $(MAKEFILE_LIST) | fgrep -v fgrep | column -t -s ':' | sed -e 's/## //'

## clean: Remove node_modules and build artifacts
.PHONY: clean
clean:
	-docker volume rm ${NODE_MODULES_VOLUME}
	-docker image prune -f
	-rm -rf build node_modules dist

## node_modules: install dependencies
node_modules: package.json package-lock.json tsconfig.json
	@echo "Installing dependencies..."
	npm ci

## scan: run the project scanners
.PHONY: scan
scan: trivy npm-audit

## trivy: run trivy vulnerablilty scan
.PHONY: trivy
trivy:
	trivy fs --exit-code 0 --severity UNKNOWN,LOW,MEDIUM --no-progress --skip-dirs tests --skip-dirs cypress --skip-dirs .local --skip-dirs .npm .
	@echo "CWD: `pwd`"
	trivy fs --ignore-unfixed --exit-code 1 --severity HIGH,CRITICAL --no-progress --skip-dirs tests --skip-dirs cypress --skip-dirs .local --skip-dirs .npm --skip-dirs node_modules/@cypress --skip-dirs node_modules/@storybook --skip-dirs node_modules/better-opn --skip-dirs node_modules/uri-js --skip-dirs node_modules/tiny-emitter --skip-dirs node_modules/microevent.ts --skip-dirs node_modules/browserify-zlib --skip-dirs node_modules/worker-rpc --skip-dirs node_modules/react-style-proptype .

## docker-scan: run vulnerability scan in container 
.PHONY: docker_scan
docker_scan:
	@echo "VTM: ${VOLUMES_TO_MOUNT}"
	docker volume create ${NODE_MODULES_VOLUME}
	docker run --rm -t ${DOCKER_NETWORK} ${DOCKER_BUILD_ARGS_CI} ${VOLUMES_TO_MOUNT} ${DEV_IMAGE} bash -ac 'trivy fs --exit-code 1 --severity HIGH,CRITICAL --no-progress --skip-dirs tests --skip-dirs cypress --skip-dirs .local --skip-dirs .npm ..'

## npm-audit: audit production depenencies for vulnerabilities
.PHONY: npm-audit
npm-audit: node_modules
	npm audit --production

.PHONY: npm-audit-fix
npm-audit-fix:
	npm audit fix

## lint: run linting
#.PHONY: lint
#lint: node_modules
#	npm run lint

## checks: run things that might change the code
.PHONY: checks
checks: format

## format: autoformat the code
.PHONY: format
format:
	@echo "Running format..."
	npm run format:update

## test-unit: run unit tests
.PHONY: test-unit
test-unit: node_modules
	npm run test-unit

## run-plugin-standalone: run the plugin in a standalone server
.PHONY: run-plugin-standalone
run-plugin-standalone:
	npm run start

## test-acceptance: run acceptance (cypress) tests
#.PHONY: test-acceptance
#test-acceptance: node_modules
#	npm run test:run:ci

## build: build the component
.PHONY: build
build: node_modules
	npm run build

storybook-static: node_modules
	npm run build-storybook

## storybook: build the storybook
.PHONY: storybook
storybook: storybook-static

## deploy-storybook: deploy the storybook to github pages
.PHONY: deploy-storybook
deploy-storybook:
	npm run deploy

## publish: publish the component
.PHONY: publish
publish:
	npm publish --registry=https://artifactory.eng.nimblestorage.com/artifactory/api/npm/npm-dscc-local/
