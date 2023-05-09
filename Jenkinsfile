/**
 * (C) Copyright 2023 Hewlett Packard Enterprise Development LP
 *
 * Build pipeline for the plugin component.
 */


pipeline {
    agent {
        kubernetes {
            inheritFrom 'cds-ui-dev'
            defaultContainer 'cds-ui-dev'
        }
    }

    environment {
        REPO_NAME = 'storage-plugin-groups-list'
        PROXY = 'http://web-proxy.corp.hpecorp.net:8080'
        HTTPS_PROXY = "${PROXY}"
        HTTP_PROXY = "${PROXY}"
        NO_PROXY  = '127.0.0.1,localhost,.nimblestorage.com,10.0.0.0/8'
        https_proxy = "${PROXY}"
        http_proxy = "${PROXY}"
        no_proxy = "${NO_PROXY}"
        TOOL_NODE_FLAGS = '--max_old_space_size=4096'
    }

    options {
        disableConcurrentBuilds()
        timeout(time: 180, unit: 'MINUTES')
        buildDiscarder(
            logRotator(numToKeepStr: '10')
        )
    }

    stages {
        stage('Install dependencies') {
            steps {                
                sh 'make node_modules'                
            }
        }

        // stage('Checks') {
        //     steps {
        //         dir ('core') {
        //             sh 'make checks'
        //         }
        //         // check that nothing has changed in the code
        //         echo 'WARNING: if the following git status check fails, run "make checks" and try again'
        //         sh '''
        //             if [ $(git status --porcelain | wc -l) -ne "0" ]; then
        //                 echo "Missing / modified files:"
        //                 git status --porcelain
        //                 echo
        //                 echo "Diff of changed files:"
        //                 git diff
        //                 exit 1
        //             fi
        //         '''
        //     }
        // }

        stage('Parallel Checks') {
            failFast true
            parallel {
                // TODO remove this stage...
                stage('Format Code') {
                    steps {                        
                        dir('core'){
                            sh 'make format'
                        }
                    }
                }
                
                stage('Unit Tests') {
                    steps {
                        dir ('core'){
                            sh 'make test-unit'
                        }
                    }
                }
                /**
                * Will uncomment this if we decide to have Acceptance tests for Atomic Plugins
                * We'll have this enabled for service plugins.
                stage('Acceptance Tests') {
                    steps {                        
                        // Force reinstall to ensure cypress is installed correctly in container
                        sh 'make -B node_modules'
                        dir('core'){
                            sh 'npm run cypress-version'
                            sh 'make test-acceptance'
                        }
                    }
                }
                **/
                stage('Trivy scan') {
                    steps {
                        dir ('core') {
                            sh 'make trivy'
                        }
                    }
                }

                stage('npm audit') {
                    steps {
                        dir ('core') {
                            sh 'make npm-audit'
                        }
                    }
                }

            }
        }

        stage('Tag') {
            steps {
                script {
                    // only add tags to the master branch
                    if (env.GIT_BRANCH == 'master') {
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'sc-github-app',
                                usernameVariable: 'GITHUB_APP',
                                passwordVariable: 'TAG_MANAGE_TOKEN',
                            )
                        ]) {
                            // configure git user since we're not using the tag-manage docker image
                            sh 'git config user.name cds-github-ci'
                            sh 'git config user.email cds-github-ci@hpe.com'

                            // starting tagging version by incrementing current npm version of the plugin.
                            sh 'tag-manage create --min 0.0.12 --push -vv'
                        }
                    }
                    currentBuild.description = sh(
                        script: 'tag-manage describe --default 0.0.0 --short',
                        returnStdout: true,
                    ).trim()
                }
            }
        }

        stage('Build plugin and framework binding') {
            steps {
                script {
                    if (currentBuild.description == "") {
                        currentBuild.result = 'ABORTED'
                        error('Aborting build: build description not found')
                    }
                }                
                sh 'make build'
            }
        }        

        // stage('Publish plugin') {
        //     // from https://confluence.eng.nimblestorage.com/pages/viewpage.action?spaceKey=CDSDEVOPS&title=Storage+Central+Application+Build+and+Deployment+Demo#StorageCentralApplicationBuildandDeploymentDemo-PublishNodepackagestoArtifactory
        //     when {
        //         expression {(env.GIT_BRANCH == 'master' && !env.CHANGE_TARGET)}
        //     }
        //     steps {
        //         script {
        //             if (currentBuild.description == "") {
        //                 currentBuild.result = 'ABORTED'
        //                 error('Aborting build: build description not found')
        //             }
        //         }

        //         dir ('core'){
        //             withCredentials([string(credentialsId: 'cds-devops-artifactory-base64', variable: 'NPM_TOKEN')]) {
        //                 // copy project level .npmrc for setting the registry
        //                 sh 'cp .npmrc ~/.npmrc'
        //                 // add auth and email
        //                 sh 'echo "_auth=$NPM_TOKEN" >> ~/.npmrc'
        //                 sh 'echo "always-auth=true" >> ~/.npmrc'
        //                 sh 'echo "email=cds-devops@nimblestorage.com" >> ~/.npmrc'
        //                 // Modify version in package.json here to ensure all subsequent build steps use the correct version                
        //                 //sh "npm version ${currentBuild.description} --no-git-tag-version"
        //                 // npm publish image
        //                 sh 'make publish'
        //             }
        //         }
        //         dir ('framework-bindings/react'){
        //             withCredentials([string(credentialsId: 'cds-devops-artifactory-base64', variable: 'NPM_TOKEN')]) {
        //                 // copy project level .npmrc for setting the registry
        //                 sh 'cp .npmrc ~/.npmrc'
        //                 // add auth and email
        //                 sh 'echo "_auth=$NPM_TOKEN" >> ~/.npmrc'
        //                 sh 'echo "always-auth=true" >> ~/.npmrc'
        //                 sh 'echo "email=cds-devops@nimblestorage.com" >> ~/.npmrc'
        //                 // Modify version in package.json here to ensure all subsequent build steps use the correct version                
        //                 // sh "npm version ${currentBuild.description} --no-git-tag-version"
        //                 // npm publish image
        //                 sh 'npm publish'
        //             }
        //         }
                
        //     }
        // }

        stage('Build storybook') {
            steps {
                script {
                    if (currentBuild.description == "") {
                        currentBuild.result = 'ABORTED'
                        error('Aborting build: build description not found')
                    }
                }
                dir ('core') {
                    sh 'make storybook'
                }
            }
        }

        stage('Publish Storybook') {
            when {
                expression {(env.GIT_BRANCH == 'master' && !env.CHANGE_TARGET)}
            }
            steps {
                script {
                    if (currentBuild.description == "") {
                        currentBuild.result = 'ABORTED'
                        error('Aborting build: build description not found')
                    }
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'sc-github-app',
                            usernameVariable: 'GITHUB_APP',
                            passwordVariable: 'GITHUB_TOKEN',
                        )
                    ]) {
                        sh 'git config --global url."https://x-oauth-basic:${GITHUB_TOKEN}@github.hpe.com/".insteadof https://github.hpe.com/'
                        dir ('core') {
                            sh 'make deploy-storybook'
                        }
                    }
                }
            }
        }
    }
}
