pipeline {
    agent any
    /* triggers {
        pollSCM('H/5 * * * *')
    } */
    tools {
        nodejs 'NodeJS' // Use the name you provided in the Global Tool Configuration
    }
    options {
        timestamps()
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install pnpm') {
            steps {
                sh 'npm install -g pnpm'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'pnpm install --no-frozen-lockfile'
            }
        }
        stage('Install Playwright Browser') {
            steps {
                sh 'pnpm exec playwright install --with-deps chromium'
            }
        }
        stage('Run Global File to Get Session Login') {
            steps {
                sh 'npx playwright test || true'
            }
        }
        stage('Run Automated Test Case with Cucumber') {
            steps {
                sh 'pnpm run test -- --reporter json:test-results/cucumber-report.json'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'test-results/cucumber-report.*,test-results/screenshots/*.png', allowEmptyArchive: true
            // Clean Workspace
            sh "ls"
            deleteDir()
            sh "ls"
        }
        success {
            echo 'Tests passed successfully!'
        }
        failure {
            echo 'Tests failed. Check the test results for more details.'
        }
    }
}
