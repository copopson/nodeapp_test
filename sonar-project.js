const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl : 'http://ec2-50-19-54-175.compute-1.amazonaws.com:9000',
    token : "ee6ade24cdb2c625ffb216c43dce347224716030",
    options: {
      'sonar.projectName': 'node-app',
      'sonar.projectDescription': 'Description for "node-app" project...',
    }
  },
  () => process.exit()
)
