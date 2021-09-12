pipeline{  
  environment {
    registry = "rishabhrapatwar/nodeproject"
    registryCredential = 'dockerhub-cred'
    dockerImage = 'nodeproject'
  }
  agent any
    stages {
	stage('Unit tests'){
           steps{
              script{
                sh 'npm run test'
              }
           }
        }
	stage('SonarQube-SAST'){
           steps{
              script{
                sh 'npm run sonar'
              }
           }
        }
	stage('Mutation test-STRYKER'){
           steps{
              script{
                sh 'npx stryker run'
              }
           }
        }
	stage ('Dependency-Check Analysis') {
    		steps {
        		sh '/var/lib/jenkins/dependency-check/bin/dependency-check.sh --scan `pwd` --format JSON --out /var/lib/jenkins/dependency-check/bin/reports/dependency-check-report --prettyPrint --disableYarnAudit'
   		 }		
	}
        stage('Build'){
           steps{
              script{
                sh 'npm install'
              } 
           }   
        }
	
        stage('Building image') {
            steps{
                script {
                  dockerImage = docker.build registry + ":latest"
                 }
             }
          }
          stage('Push Image') {
              steps{
                  script {
                       docker.withRegistry( '', registryCredential){                            
                       dockerImage.push()
                      }
                   }
                } 
           }
           stage('Deploying into k8s'){
            steps {
		  sh 'kubectl apply -f deployment.yml'
            }
        }
    }
}
