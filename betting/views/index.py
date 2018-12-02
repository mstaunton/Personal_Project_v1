"""
Betting main views.

URLs include:
/
"""
import flask
import betting


@betting.app.route('/')
def show_index():
    """Display / route."""
    context = {}
    return flask.render_template("index.html", **context)


@betting.app.route('/register/')
def show_register():
    """Display /register route."""
    context = {}
    return flask.render_template("register.html", **context)


@betting.app.route('/upcoming/')
def show_upcoming():
    """Display /upcoming route."""
    context = {}
    return flask.render_template("upcoming.html", **context)


@betting.app.route('/live/')
def show_live():
    """Display /live route."""
    context = {}
    return flask.render_template("live.html", **context)


@betting.app.route('/results/')
def show_results():
    """Display /results route."""
    context = {}
    return flask.render_template("results.html", **context)
