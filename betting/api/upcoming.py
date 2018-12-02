"""REST API for upcoming and register page."""
import flask
import betting
from betting.model import query_db, insert_bet


@betting.app.route('/api/v1/upcoming/?betID=<int:betID>', methods=["DELETE"])
@betting.app.route('/api/v1/upcoming/', methods=["GET", "DELETE"])
def upcoming_api():
    """REST API for upcoming page."""
    context = {}
    if flask.request.method == 'DELETE':

        betID = flask.request.args.get("betID", default=-1, type=int)
        query_db('''DELETE FROM upcoming WHERE betID = ?''', (betID,))

    # Some sort of REST API check to move any games that have started from Upcoming to Live

    bets = query_db('''SELECT betID, bet_date, bet_time, game,
                              selection, spread, odds,
                              wager, to_win FROM upcoming''')

    context.update({'bets': bets})

    return flask.jsonify(**context)


@betting.app.route('/api/v1/register/', methods=['POST'])
def register_api():
    """REST API for registering bets."""
    context = {}
    info = flask.request.json.get('info')
    insert_bet(info, 'upcoming')
    return flask.jsonify(**context)
