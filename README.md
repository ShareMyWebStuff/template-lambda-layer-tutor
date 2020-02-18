# template-lambda-layer-tutor

**Note: please see the template-aws-infrastructure before using this**

## Introduction

This lambda layer only contains the specific code for the tutoring functionality.
* Tutor validation
* Tutor database model for reading and writing to the database

This layer can only be used in conjunction with the common layer.

In order to deploy this layer you will need to build it and deploy it. 

**Before doing this you will need to change the layer name to one you want in the package.json file.**

## Build

To build this layer run the below command. This will create a zip file for deployment.

npm run build

## Deploy

To deploy this layer requires the zip file. The zip file will be deployed to AWS. This can be run via the npm command

npm run deploy  

The npm command runs an AWS CLI command.

aws lambda publish-layer-version --layer-name "<layer-name>" --description "..." --license-info "MIT" --zip-file fileb://..\lambda-layer.zip --compatible-runtimes nodejs10.x

## Lambda Function Layer Usage

In order to use code in a layer in a lambda function is the same.

require('bcryptjs');

In order to use your own code such as the db.js file we require as follows (if using node).

require('/opt/nodejs/<file>');
