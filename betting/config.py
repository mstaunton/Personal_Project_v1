import os

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = b'\x03B\x17\x1c\x06\xb0\xf92\x88\xb0\x042\xfbV\x00\xf8\x01OC\xa4\xea\x13?\xd4'  # noqa: E501  pylint: disable=line-too-long
SESSION_COOKIE_NAME = 'login'

# Database file is var/betting.sqlite3
DATABASE_FILENAME = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'var', 'betting.sqlite3'
)
