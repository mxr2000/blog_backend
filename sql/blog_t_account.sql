create table t_account
(
    email    varchar(20) not null
        primary key,
    username varchar(20) not null,
    pwd      varchar(20) not null
);

INSERT INTO blog.t_account (email, username, pwd) VALUES ('mxr@qq.com', 'Dick', '654321');
