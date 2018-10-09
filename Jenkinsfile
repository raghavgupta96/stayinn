pipeline {
  agent any
  stages {
    stage('Startup') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm start test:ci'
        junit 'junit.xml'
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