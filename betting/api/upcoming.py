import flask
import betting
from betting.model import query_db, insert_bet

@betting.app.route('/api/v1/upcoming/', methods=['GET', 'DELETE'])
def upcoming_api():
	context = {}
	if flask.request.method == 'GET':

		# Some sort of REST API check to move any games that have started from Upcoming to Live

		bets = query_db('''SELECT betID, bet_date, bet_time, game,
						selection, spread, odds, wager, to_win FROM upcoming''')

		context.update({'bets': bets})
		
		return flask.jsonify(**context)


	context.update({'message': 'FUCK THIS SHIT'})
	return flask.jsonify(**context)

@betting.app.route('/api/v1/register/', methods=['POST'])
def register_api():
	context = {}
	info = flask.request.json.get('info')
	insert_bet(info, 'upcoming')	
	# print(info)
	return flask.jsonify(**context)