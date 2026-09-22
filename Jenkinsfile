pipeline {
    agent none

    stages {

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:16'
                }
            }
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            agent {
                docker {
                    image 'node:16'
                }
            }
            steps {
                sh 'npm test'
            }
        }

        stage('Dependency Security Scan') {
            agent {
                docker {
                    image 'node:16'
                }
            }
            steps {
                sh 'npm audit --audit-level=high'
            }
        }

        stage('Build Docker Image') {
            agent any
            steps {
                sh 'docker version'
                sh 'docker build -t kunal4242/isec60001-demo:latest .'
            }
        }

        stage('Push Image to Container Registry') {
            agent any
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push kunal4242/isec60001-demo:latest
                        docker logout
                    '''
                }
            }
        }
    }
}
