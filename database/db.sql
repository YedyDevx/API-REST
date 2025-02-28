CREATE TABLE users  (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email)
	VALUES
	('John Doe', 'jhona@gmial.com'),
	('Yedixon Ramones', 'yedixon@gmail.com');

SELECT * FROM users;
```
