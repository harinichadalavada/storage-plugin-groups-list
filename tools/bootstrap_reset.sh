#!/usr/bin/bash
# Simple script to undo customizations if you choose to try again.  This can only be used
# before reseting git, afterwards (post commit) it will no longer work.
git restore readme.md
git restore framework-bindings/react
git restore core/

#git restore Jenkinsfile Makefile package.json cypress.json README.md make_files/nginx.config

