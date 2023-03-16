# users tábla létrehozása
CREATE TABLE todo.users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(50) DEFAULT NULL,
  lastName VARCHAR(50) DEFAULT NULL,
  gender VARCHAR(10) DEFAULT NULL,
  userName VARCHAR(50) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  password VARCHAR(100) DEFAULT NULL,
  number INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 23,
AVG_ROW_LENGTH = 5461,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

ALTER TABLE todo.users 
  ADD UNIQUE INDEX UK_users_email(email);




#teszt adatok

DELETE FROM todos;

INSERT INTO todos
  (id, name, completed)
  VALUES
  (1, "fagyi", 0), (2, "mozi", 0), (3, "szerviz", 0);

SELECT * FROM todos;

call genTodos();

# lekérdezések
# get
SELECT * FROM todos;

# post
INSERT INTO todos
  (name)
  VALUES
  ('vásárlás');

# put
UPDATE todos SET
  name = 'szerviz',
  completed = 1
  WHERE id = 3;

# delete
DELETE from todos
  WHERE completed = 1;

