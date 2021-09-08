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
        	withKubeConfig([credentialsId: 'kubeconfig']) {
		  sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'  
        	  sh 'chmod u+x ./kubectl'  
		  sh 'kubectl apply -f deployment.yml'
		}
            }
        }
    }
}
