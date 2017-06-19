pipeline {
  agent {
    label 'ubuntu'
  }
  tools {
    nodejs '6.9.5'
  }
  stages {
    stage ('Build') {
      steps {
        configFileProvider ([configFile (fileId: 'GLOBAL_NPMRC', targetLocation: '.npmrc')]) {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }
    stage ('test') {
      steps {
        configFileProvider ([configFile (fileId: 'BROWNSEA_ORM_ENV', targetLocation: '.env')]) {
          sh 'npm run test:ci'
        }
      }
      post {
        always {
          junit 'test-results.xml'
        }
        success {
          sh 'npm run coverage'
          publishHTML target: [
            allowMissing: false,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: 'coverage',
            reportFiles: 'index.html',
            reportName: 'RCov Report'
          ]
        }
      }
    }
  }
}