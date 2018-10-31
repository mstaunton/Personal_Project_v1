"""
Insta485 index (main) view.

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
    context = {}
    return flask.render_template("register.html", **context)

@betting.app.route('/upcoming/')
def show_upcoming():
    context = {}
    return flask.render_template("upcoming.html", **context)

@betting.app.route('/live/')
def show_live():
    context = {}
    return flask.render_template("live.html", **context)

@betting.app.route('/results/')
def show_results():
    context = {}
    return flask.render_template("results.html", **context)
