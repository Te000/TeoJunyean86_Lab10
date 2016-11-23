CREATE TABLE Users (
	user_id int(9) NOT NULL Auto_Increment,
    username VARCHAR(50) NOT NULL,
    passwrd VARCHAR(50) NOT NULL,
    email VARCHAR(70) NOT NULL,
    Primary Key (user_id)
    
);

CREATE TABLE CommentTable (
	username VARCHAR(50) NOT NULL,
    comments VARCHAR(200) NOT NULL,
    email VARCHAR(70) NOT NULL,
    id int(9) NOT NULL Auto_Increment,
    Primary Key (id)
     
);

CREATE TABLE OrderTable (
	user VARCHAR(50) NOT NULL,
    order1 VARCHAR(500) NOT NULL,
    id_order int(9) NOT NULL Auto_Increment,
    Primary Key (id_order)
     
);

INSERT INTO CommentTable(id, username, comments, email)
VALUES  ( '1', 'Thomas Omaley', 'The most delicious burger I have ever tasted. Great service!','thoom1961@jourrapide.com'),
		('2', 'Sara Pattick', 'It has quality, a good price, a great taste, and its served as you decide. What else you want?','saps1963@einrot.com'),
		('3', 'Oscar Tunskten','Excellent burgers, I want more!','osts1936@fleckens.hu'),
		('4', 'Daniel Vinck','As a food taster I can only say one thing 10/10','dinvis1952@teleworm.us'),
		('5', 'Tobias Notradame','Came all the way from Notradame to taste these deicuous hamburgers. (Im now planning to live over here :) )', 'turnot1972@rhyta.com');

INSERT INTO Users(user_id, username, passwrd, email)
VALUES  ('1','Thomas Omaley', '1', 'thoom1961@jourrapide.com'),
		('2','Sara Pattick', '1', 'saps1963@einrot.com'),
		('3','Oscar Tunskten', '1', 'osts1936@fleckens.hu'),
		('4','Daniel Vinck', '1', 'dinvis1952@teleworm.us'),
		('5','Tobias Notradame', '1', 'turnot1972@rhyta.com');



