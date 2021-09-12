const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl : 'http://ec2-50-19-54-175.compute-1.amazonaws.com:9000',
    token : "58295258a8c2fd6df442bd40626a7eb3efb0acd2",
    options: {
      'sonar.projectName': 'node-app',
      'sonar.projectDescription': 'Description for "node-app" project...',
    }
  },
  () => process.exit()
)
