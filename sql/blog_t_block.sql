create table t_block
(
    id   int auto_increment
        primary key,
    name varchar(20) not null
);

INSERT INTO blog.t_block (id, name) VALUES (1, 'default');
INSERT INTO blog.t_block (id, name) VALUES (3, 'game');
