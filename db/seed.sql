CREATE TABLE helo_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(200) NOT NULL,
  profile_pic text
);
CREATE TABLE helo_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(45) NOT NULL, 
  content TEXT, 
  img TEXT,
  author_id INTEGER REFERENCES helo_users(id),
  date_created TIMESTAMP
);


INSERT INTO helo_users (username, password, profile_pic)
VALUES ('dummyUser', 'password', 'fakeURL');


ALTER TABLE helo_users
ALTER password
SET DATA TYPE VARCHAR(1000);


INSERT INTO helo_posts (title, content, img, author_id)
VALUES (' test title', 'some content', 'fakeURL', 1);