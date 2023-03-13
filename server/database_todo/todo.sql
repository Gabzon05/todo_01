# teszt adatok

delete from todos;

INSERT INTO todos
  (id,name,completed)
  VALUES
  (1,'fagyi',0),(2,'mozi',0),(3,'szerviz',0);

  SELECT * from todos;

  CALL genTodos();

  #lekerdezesek
  #get
SELECT * from todos;
  #post
INSERT into todos
  (name)
  VALUES
  ('vasarlas');

#put
  UPDATE todos SET
    name = 'vasarlas',
    completed = 1
    WHERE id = 4;

  #delete
    delete from todos
      WHERE completed = 1;