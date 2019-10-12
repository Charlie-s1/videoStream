create database if not exists media;

create table if not exists media.film (
  id int primary key auto_increment,
  title varchar(30),
  url varchar(100),
  length varchar(30),
  quality varchar(30)
);

create table if not exists media.tv(
  id int primary key auto_increment,
  title varchar(30),
  url varchar(100),
  length varchar(30),
  quality varchar(30)
);
