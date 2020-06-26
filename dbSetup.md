## Create a new table

CREATE TABLE NOTES (
id VARCHAR(30) UNIQUE PRIMARY KEY NOT NULL,
content TEXT,
location INT,
created_at TIMESTAMP NOT NULL DEFAULT now(),
updated_at TIMESTAMP NOT NULL
);
