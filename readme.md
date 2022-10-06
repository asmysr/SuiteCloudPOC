# SuiteCloud CLI for GHA
 
- [SuiteCloud CLI for GHA](#suitecloud-cli-for-gha)
  - [Requirements For Visual Studio Code](#requirements-for-visual-studio-code)
  - [Requirements For GitHub Action](#requirements-for-github-action)
  - [Initializing SuiteCloud for GHA and local](#initializing-suitecloud-for-gha-and-local)
  - [Installing SuiteCloud CLI](#installing-suitecloud-cli)
  - [Creating SuiteCloud Application](#creating-suitecloud-application)
    - [Account Customization Project](#account-customization-project)
    - [SuiteApps](#suiteapps)
  - [File manipulation commands](#file-manipulation-commands)
    - [Creating SuiteScript file](#creating-suitescript-file)
    - [Importing a file to Account Customization Project](#importing-a-file-to-account-customization-project)
    - [Listing files from File Cabinet](#listing-files-from-file-cabinet)
    - [Uploading files from project to an account](#uploading-files-from-project-to-an-account)
  - [Object Manipulation](#object-manipulation)
    - [Importing Objects](#importing-objects)
    - [Listing custom objects](#listing-custom-objects)
    - [Update Object](#update-object)
  - [Deploying Project](#deploying-project)
  - [Unit Testing](#unit-testing)
 
## Requirements For Visual Studio Code
 
1) [SuiteCloud Extention](https://marketplace.visualstudio.com/items?itemName=Oracle.suitecloud-vscode-extension)
2) [Java JDK 17](https://jdk.java.net/17/)
 
Note: MUST BE VERSION 17
 
## Requirements For GitHub Action
 
1) [SuiteCloud CLI](https://www.npmjs.com/package/@oracle/suitecloud-cli)
2) [Actions Checkout](https://github.com/actions/checkout)
3) [Setup Java](https://github.com/actions/setup-java)
 
## Initializing SuiteCloud for GHA and local
 
Ensure that this is before doing anything
 
```
suitecloud account:savetoken --account 0000001 --authid myDevRole --tokenid ABC123 --tokensecret 321CBA
```
 
## Installing SuiteCloud CLI
 
When running this on CI, be sure to use --acceptSuiteCloudSDKLicense like so:
 
```
npm install -g --acceptSuiteCloudSDKLicense @oracle/suitecloud-cli
```
 
the usage for SuiteCloud are basically
 
```
suitecloud <command> <option> <argument>
```
 
## Creating SuiteCloud Application
 
There are two types:
 
- Account Customization Project (ACP)
- SuiteApps
 
The latter requires publisher ID when performing account:setup
 
we are unable to create these two in GitHub Actions, therefore it is required to perform such things in the local machine
 
### Account Customization Project
 
```
suitecloud project:create --type ACCOUNTCUSTOMIZATION --projectname MyACP
 
```
 
Note: feel free to replace "MyACP" with any name you want
 
### SuiteApps
 
```
suitecloud project:create
    --type SUITEAPP  --projectid mysuiteapp123 --projectname MySuiteApp
         --publisherid com.netsuite --projectversion 1.0.0
```
 
Note: Do replace "mysuiteapp123", "MySuiteApp", "com.netsuite" and "1.0.0" with what is required
 
## File manipulation commands
 
### Creating SuiteScript file
 
```
file:create [-- type]
[--path]
```
 
For example, the following command creates a SuiteScript file of type Map/Reduce in the FileCabinet folder of the SDF SuiteApp project:
 
```
suitecloud file:create --type 'mapReduce' --path 'FileCabinet/SuiteApps/com.example.currency/currency.js'
```
 
### Importing a file to Account Customization Project
 
Imports a file from an account to your Account Customization Project.
 
```
file:import <--paths FileCabinetPath1>
   [--excludeproperties]
```
 
For example,
 
```
suitecloud file:import --paths "/SuiteScripts/test.js"
```
 
REMEMBER: You cannot import files from a SuiteApp.
 
### Listing files from File Cabinet
 
```
file:list <--folder FileCabinetPath1>
```
 
for example:
 
```
suitecloud file:list --folder "/SuiteScripts"
```
 
REMEMBER: You cannot list the files from a SuiteApp.
 
### Uploading files from project to an account
 
```
file:upload [--paths  "/SuiteScripts/File.js"]
```
 
For example, the command imports two objects, custtmpl_2 and custcentercategory_2, into a project using the non-interactive mode.
 
```
suitecloud file:upload --paths  "/SuiteScripts/myFile.js" "/SuiteScripts/SuiteScriptFile.js"
 
```
 
## Object Manipulation
 
### Importing Objects
 
In Account Customization Projects (ACP), if SuiteScript files are referenced in custom objects you import, these files are also imported by default.
 
```
object:import <--destinationfolder DestinationPath>
   <--scriptid ScriptID1 ScriptID2>
   <--type CustomObjectType>
   [--appid QualifiedAppID]
```
The following command imports two objects, custtmpl_2 and custcentercategory_2, into a project using the non-interactive mode.
 
```
suitecloud object:import --destinationfolder "/Objects" --scriptid custtmpl_2
        --type ALL --appid org.mycompany.helloworldapp
```
 
### Listing custom objects
 
```
object:list [--appid QualifiedAppID]
   [--scriptid ScriptID]
   [--type CustomObjectType1 CustomObjectType2
```
 
command to list the custom objects in your current account:
 
```
suitecloud object:list --appid org.mycompany.helloworldapp --type advancedpdftemplate centercategory
```
 
### Update Object
 
```
object:update <-scriptid scriptID>
```
 
## Deploying Project
 
```
suitecloud project:deploy
```
 
## Unit Testing
 
SuiteCloud for nodejs uses [Jest](https://jestjs.io) for unit testing.
 
Ensure, the file structure is as follows:
 
```
myAccountCustomizationProject
├── __tests__
│   └── sample-test.js
├── node_modules
├── src
│   ├── AccountConfiguration
│   ├── FileCabinet
│       ├── SuiteScripts
│           └── Suitelet.js
│   ├── Objects
│   ├── Translations
│   ├── deploy.xml
│   └── manifest.xml
├── jest.config.js
├── suitecloud.config.js
├── package-lock.json
├── package.json
└── project.json
```
 
For more detail: https://www.npmjs.com/package/@oracle/suitecloud-unit-testing