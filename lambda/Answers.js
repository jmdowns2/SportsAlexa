var SportsDatabase = require("./SportsDatabase");

function parseDate(date)
{
	var str = date.toString();
	console.log(str);
	var year = str.substr(0, 4);
	var month = str.substr(4, 2);
	var day = str.substr(6);

	return month+"-"+day+"-"+year;
}

function parseTime(time)
{
	time -= 1200;
	time = time.toString();
	return time.substr(0, 2) + ":" + time.substr(2);
}

exports.getNextGame = function(intent, session, response)
{
	SportsDatabase.getNextGame(function(res){
		if(!res)
		{
			response.tell("I'm sorry.  I don't know when the next game is.");
			return;
		}

		var date = parseDate(res.date);
		var opponent = res["o:team"];
		var time = res["start time"];

		var ret = "The next game is on "+date+" against "+opponent;

		if(time)
			ret += " at " + parseTime(time);
		
		response.tell(ret);

	});
}

