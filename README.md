# SportsAlexa
This is a simple Amazon Alexa skill that allows you to ask questions about sporting events.  The skill will then look up the information and respond accordingly.

## Building
1.  Add the Alexa app id to ./lambda/Props.json.
2.  Add a gradle.properties file and add a variable called aws.accountId set to your AWS account id
3.  "gradle deploy" from the command line will deploy the code into AWS Lambda.

