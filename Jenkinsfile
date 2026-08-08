pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Chromium') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Regression Tests') {
            steps {
                bat 'npm run regressionCases'
            }
        }

    }

    post {

        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**/*',
                allowEmptyArchive: true
            )

            archiveArtifacts(
                artifacts: 'allure-results/**/*',
                allowEmptyArchive: true
            )

            archiveArtifacts(
                artifacts: 'test-results/**/*',
                allowEmptyArchive: true
            )
        }

    }
}