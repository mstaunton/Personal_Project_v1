CREATE TABLE upcoming(
	betID INTEGER Primary Key,
	gameID INTEGER NOT NULL,
	league VARCHAR(20) NOT NULL,
	bet_date VARCHAR(20) NOT NULL,
	bet_time VARCHAR(20) NOT NULL,
	game VARCHAR(40) NOT NULL,
	selection VARCHAR(20) NOT NULL,
	spread REAL NOT NULL,
	odds INTEGER NOT NULL,
	wager REAL NOT NULL,
	to_win REAL NOT NULL
);