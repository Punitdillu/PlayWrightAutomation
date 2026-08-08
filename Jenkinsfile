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

        stage('Generate Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
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

            // Send Email
            emailext(
                subject: "Playwright Automation - Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                body: """
Hello,

Playwright automation execution has completed.

Build Number: ${env.BUILD_NUMBER}
Build Status: ${currentBuild.currentResult}

Allure Report:
${env.BUILD_URL}allure/

Jenkins Build:
${env.BUILD_URL}

Regards,
Jenkins Automation
""",
                to: 'punitrajranjan5@gmail.com'
            )
        }

    }
}