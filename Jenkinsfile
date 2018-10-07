pipeline {
  agent any
  tools {
    nodejs 'default-nodejs'
  }
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

  post {
    always {
      junit 'junit.xml'
    }
  }
}
