pipeline {
    agent any
    environment {
        IMAGE_NAME = "tictactoe-nginx"
        CONTAINER_NAME = "tictactoe-app"
        PROJECT_KEY = "tictactoe"
    }
    stages {
        stage('Checkout') {
            steps {
                echo "📥 Cloning repository..."
                git url: 'https://github.com/aioticstraining/Aiotics_TicTacToe.git', branch: 'main'
            }
        }
        stage('Unit Test') {
            steps {
                echo "🧪 Running unit tests..."
                sh "docker run --rm -v \$(pwd):/app -w /app node:16-alpine sh -c \"npm install && npm test\""
            }
        }
        stage('SonarQube Analysis') {
            steps {
                echo "🔍 Running SonarQube analysis..."
                withSonarQubeEnv('Sonarqube') {
                    sh "/opt/sonar-scanner/bin/sonar-scanner -Dsonar.projectKey=${PROJECT_KEY} -Dsonar.sources=."
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image..."
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }
        stage('Run Docker Container') {
            steps {
                echo "🚀 Running Docker container..."
                sh """
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p 9090:80 ${IMAGE_NAME}
                """
            }
        }
        stage('Integration Test') {
            steps {
                echo "🔬 Running integration tests with Cypress..."
                sh """
                    docker run --rm --network=host --dns 8.8.8.8 -v \$(pwd):/app -w /app node:18 sh -c "
                        apt-get update && apt-get install -y libgtk-3-dev libgconf-2-4 libnss3 libasound2 libxss1 libxkbcommon-x11-0 libgbm-dev xvfb &&
                        npm install &&
                        npm run test
                    "
                """
            }
        }
    }
    post {
        success {
            echo "✅ Application deployed successfully at http://<jenkins-host>:9090"
        }
        failure {
            echo "❌ Build or deployment failed."
        }
    }
}
