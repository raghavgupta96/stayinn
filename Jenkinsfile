pipeline {
  agent any
  stages {
    stage('Startup') {
      steps {
        script {
          sh 'npm install'
        }

      }
    }
    stage('Test') {
      steps {
        script {
          sh 'npm run test:ci'
        }

      }
    }
  }
  tools {
    nodejs 'default-nodejs'
  }
  post {
    always {
      junit 'junit.xml'

    }

  }
}