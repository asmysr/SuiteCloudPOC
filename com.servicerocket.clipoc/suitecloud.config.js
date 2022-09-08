const SuiteCloudJestUnitTestRunner = require('@oracle/suitecloud-unit-testing/services/SuiteCloudJestUnitTestRunner');

module.exports = {
    defaultProjectFolder: 'src',
    commands: {
        "project:deploy": {
            projectFolder: 'dist',
            beforeExecuting: async options => {
                options.arguments.validate = true;
                // You can run some build processes or unit tests here.
                // You should return the options object or a Promise that returns the options object on resolve.
                return options;
            },
            onCompleted: output => {
                console.log("Eureka! The deployment was a success.");
            },
            onError: error => {
                console.log("Houston, we've had a problem here. The deployment failed.");
            },
        },
        "project:validate": {
            projectFolder: 'dist',
        },
        "project:adddependencies": {
            projectFolder: 'dist',
        },
    },
}; 

              