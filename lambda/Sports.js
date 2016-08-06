var PROPS = require("./Props.json");
var AlexaSkill = require('./AlexaSkill');
var Answers = require('./Answers');


var APP_ID = PROPS.APP_ID;

var KentuckySports = function () {
    AlexaSkill.call(this, APP_ID);
};

KentuckySports.prototype = Object.create(AlexaSkill.prototype);
KentuckySports.prototype.constructor = KentuckySports;


KentuckySports.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
};

KentuckySports.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechOutput = "Hello";
    var repromptText = "Hello, how can I help";
    response.ask(speechOutput, repromptText);
};


KentuckySports.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
};

KentuckySports.prototype.intentHandlers = {
    "NextGameIntent": function (intent, session, response) {
        Answers.getNextGame(intent, session, response);
    }
};


exports.handler = function (event, context) {
	console.log("Before execute"+AlexaSkill);

    var skill = new KentuckySports();
    skill.execute(event, context);

	console.log("After execute");
};
