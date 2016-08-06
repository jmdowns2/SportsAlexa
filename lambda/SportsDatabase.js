var http = require('http');

var CURRENT_SEASON = 2016;
var NFL = "nfl";
var CBB = "ncaabb";
var CFB = "ncaafb";


// Type = ncaabb|ncaafb|nfl
function buildQueryUrl(type, query)
{
	return "http://sportsdatabase.com/"+type+"/query.json?output=json&jsoncallback=$&sdql="+query;
}

function executeQuery(url, callback)
{
	console.log(url);
	http.get(url, function (response) {

        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
			callback(processResponse(body));
        });

	}).on('error', function (err) {
        console.log('Error, with: ' + err.message);
        callback(null);
    });
}

function processResponse(response)
{

	response = response.substr(2, response.length-5); // Strip jsonp
	response = response.replace(/'/g, "\"");
		console.log(response);

	response = JSON.parse(response);

	var cols = response.headers;
	var len = response.groups[0].columns[0].length;

	var ret = [];
	for(var i=0; i<len; ++i)
	{
		var row = {};
		for(var iCol=0; iCol<cols.length; ++iCol)
		{
			var col = cols[iCol];
			row[col] = response.groups[0].columns[iCol][i];
		}

		ret.push(row);
	}

	return ret;
}

exports.getNextGame = function(callback)
{
	// Default to college football for now
	exports.getCFBSchedule(CURRENT_SEASON, "KTKY", function(res){
		callback(res[0]);
	});
}

exports.getCFBSchedule = function(season, team, callback)
{
	exports.getSchedule(season, team, CFB, callback);
}

exports.getNFLSchedule = function(season, team, callback)
{
	exports.getSchedule(season, team, NFL, callback);
}

exports.getCBBSchedule = function(season, team, callback)
{
	exports.getSchedule(season, team, CBB, callback);
}


exports.getSchedule = function(season, team, type, callback)
{
	if(!season) season = CURRENT_SEASON;

	var query = "team,o:team,date,start time@season="+season;

	if(team)
	{
		query += " and team="+team;
	}
	
	var url = buildQueryUrl(type, query);
	executeQuery(url, callback);
}

