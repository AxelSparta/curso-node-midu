-- BASE DE DATOS UTILIZADA: POSTGRESQL

create table movie (
	id uuid primary key default gen_random_uuid(),
	title varchar(255) not null,
	year integer not null,
	director varchar(255) not null,
	duration integer not null,
	poster text,
	rate decimal(2, 1) not null
);


create table genre (
	id integer generated always as identity primary key,
	name varchar(255) not null unique
);

create table movie_genres (
	movie_id uuid references movie(id),
	genre_id int references genre(id),
	primary key (movie_id, genre_id)
);

insert into genre (name) values
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance');


insert into movie (title, year, director, duration, poster, rate) values
('The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 9.3),
('The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0),
('Inception', 2010, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8);

insert into movie_genres (movie_id, genre_id) values
((select id from movie where title = 'The Shawshank Redemption'), (select id from genre where name = 'Drama')),
((select id from movie where title = 'The Dark Knight'), (select id from genre where name = 'Action')),
((select id from movie where title = 'The Dark Knight'), (select id from genre where name = 'Crime')),
((select id from movie where title = 'The Dark Knight'), (select id from genre where name = 'Drama')),
((select id from movie where title = 'Inception'), (select id from genre where name = 'Action')),
((select id from movie where title = 'Inception'), (select id from genre where name = 'Adventure')),
((select id from movie where title = 'Inception'), (select id from genre where name = 'Sci-Fi'));