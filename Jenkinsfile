pipeline {
  agent {
    node {
      label 'default-nodejs'
    }

  }
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test:ci'
        junit(testResults: 'junit.xml', allowEmptyResults: true)
      }
    }
  }
}