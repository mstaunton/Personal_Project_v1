"""Betting model (database) API."""
import sqlite3
import flask
import betting


def dict_factory(cursor, row):
    """Convert database row objects to a dictionary."""
    output = {}
    for idx, col in enumerate(cursor.description):
        output[col[0]] = row[idx]
    return output


def get_db():
    """Open a new database connection."""
    if not hasattr(flask.g, 'sqlite_db'):
        flask.g.sqlite_db = sqlite3.connect(
            betting.app.config['DATABASE_FILENAME'])
        flask.g.sqlite_db.row_factory = dict_factory

        # Foreign keys have to be enabled per-connection.  This is an sqlite3
        # backwards compatibility thing.
        flask.g.sqlite_db.execute("PRAGMA foreign_keys = ON")

    return flask.g.sqlite_db


@betting.app.teardown_appcontext
def close_db(error):
    # pylint: disable=unused-argument
    """Close the database at the end of a request."""
    if hasattr(flask.g, 'sqlite_db'):
        flask.g.sqlite_db.commit()
        flask.g.sqlite_db.close()


def query_db(query, args=(), one=False):
    """Query database."""
    cur = get_db().execute(query, args)
    r_v = cur.fetchall()
    cur.close()
    return (r_v[0] if r_v else None) if one else r_v


def insert_bet(info, table):
    """Insert Bet into database."""
    if table == 'upcoming':
        odds = int(info['odds'])
        wager = float(info['wager'])
        spread = float(info['spread'])
        if int(info['odds']) < 0:  # Negative Spread
            to_win = round(float(-100 / odds) * wager, 2)
        else:
            to_win = round(float(odds / 100) * wager, 2)

        query = '''INSERT INTO upcoming (gameID, league, bet_date,
                                         bet_time, game, selection,
                                         spread, odds, wager, to_win)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'''

        bet_info = (info['gameID'], info['league'], info['date'], info['time'],
                    info['game'], info['selection'], spread,
                    odds, wager, to_win)

        cur = get_db().execute(query, bet_info)
        cur.close()
