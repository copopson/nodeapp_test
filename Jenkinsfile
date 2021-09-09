pipeline{  
  environment {
    registry = "rishabhrapatwar/nodeproject"
    registryCredential = 'dockerhub-cred'
    dockerImage = 'nodeproject'
  }
  agent any
    stages {
        stage('Build'){
           steps{
              script{
                sh 'npm install'
              } 
           }   
        }
	stage('SonarQube - SAST') {
      		steps {
		   withSonarQubeEnv('SonarQube') {
			 sh "sonar-scanner \
  			-Dsonar.projectKey=nodeapp-test \
  			-Dsonar.sources=. \
  			-Dsonar.host.url=http://ec2-3-95-212-169.compute-1.amazonaws.com:9000 \
  			-Dsonar.login=6372298eabe1a814105716f473572ae87b4a8d63"
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
