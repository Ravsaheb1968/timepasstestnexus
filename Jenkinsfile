pipeline {
    agent any
    tools { nodejs 'NodeJS-18' }
    parameters {
        string(
            name: 'BASE_URL',
            defaultValue: 'https://parabank.parasoft.com/parabank/index.htm',
            description: 'Application URL to test'
        )
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Ravsaheb1968/timepasstestnexus.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx playwright test --reporter=html'
            }
        }
        stage('Publish Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }
    post {
        success { echo 'All tests passed successfully' }
        failure { echo 'Some tests failed - check report' }
        always  { archiveArtifacts artifacts: 'playwright-report/**' }
    }
}