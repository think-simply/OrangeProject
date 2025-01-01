pipeline {
    agent {
        label 'ubuntu'
    }
    triggers {
        pollSCM('H/5 * * * *')
    }
    options {
        timestamps()
        disableConcurrentBuilds()
    }
    environment {
        // Define any environment variables here if needed
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Set Up Node.js') {
            steps {
                script {
                    def nodejsVersion = 'lts/*'
                    sh "nvm install ${nodejsVersion}"
                    sh "nvm use ${nodejsVersion}"
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps chromium'
            }
        }
        stage('Install Cucumber') {
            steps {
                sh 'npm install --save-dev @cucumber/cucumber'
            }
        }
        stage('Run Global File to Get Session Login') {
            steps {
                sh 'npx playwright test || true'
            }
        }
        stage('Run Automated Test Case with Cucumber') {
            steps {
                sh 'npm run test -- --parallel 5'
            }
        }
        stage('Archive Test Results') {
            steps {
                archiveArtifacts artifacts: 'test-results/cucumber-report.*,test-results/screenshots/*.png', allowEmptyArchive: true
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'test-results/cucumber-report.*,test-results/screenshots/*.png', allowEmptyArchive: true
        }
        success {
            echo 'Tests passed successfully!'
        }
        failure {
            echo 'Tests failed. Check the test results for more details.'
        }
    }
}
