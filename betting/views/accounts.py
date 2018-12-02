"""Betting Account Views."""
import flask
import betting


@betting.app.route('/accounts/login/', methods=['GET', 'POST'])
def login_page():
    """Display /accounts/login/ route."""
    if 'username' in flask.session:
        return flask.redirect(flask.url_for('index_page'))
    return flask.render_template("/accounts/login.html")


@betting.app.route('/login/')
def login_reroute():
    """Reroute User to correct Login Page."""
    return flask.redirect(flask.url_for('login_page'))


@betting.app.route('/accounts/logout/')
def logout():
    """Log User out of session and return to login screen."""
    flask.session.clear()
    return flask.redirect(flask.url_for('login_page'))


@betting.app.route('/accounts/create/', methods=['GET', 'POST'])
def create_page():
    """Create new user in DB, redirect to index page for successful login."""
    if 'username' in flask.session:
        return flask.redirect(flask.url_for('edit_page'))
    return flask.render_template("/accounts/create.html")
