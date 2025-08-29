pipeline {
    agent any

    environment {
        IMAGE_NAME = "tictactoe-nginx"
        CONTAINER_NAME = "tictactoe-app"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Cloning repository..."
                git url: 'https://github.com/aioticstraining/Aiotics_TicTacToe.git', branch: 'main'
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
                    docker run -d --name ${CONTAINER_NAME} -p 8080:80 ${IMAGE_NAME}
                """
            }
        }
    }

    post {
        success {
            echo "✅ Application deployed successfully at http://<jenkins-host>:8080"
        }
        failure {
            echo "❌ Build or deployment failed."
        }
    }
}