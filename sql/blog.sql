create table t_account
(
    email    varchar(20)   not null
        primary key,
    username varchar(20)   not null,
    pwd      varchar(20)   not null,
    avatarId int default 0 not null
);

create table t_block
(
    id   int auto_increment
        primary key,
    name varchar(20) not null
);

create table t_article
(
    id          int auto_increment
        primary key,
    email       varchar(20) not null,
    blockId     int         not null,
    header      varchar(50) not null,
    content     text        not null,
    createdTime varchar(30) not null,
    updatedTime varchar(30) not null,
    constraint t_article_t_account_email_fk
        foreign key (email) references t_account (email),
    constraint t_article_t_block_id_fk
        foreign key (blockId) references t_block (id)
);

create table t_comment
(
    id          int auto_increment
        primary key,
    articleId   int          not null,
    email       varchar(20)  not null,
    content     varchar(144) not null,
    createdTime varchar(30)  null,
    constraint t_comment_t_account_email_fk
        foreign key (email) references t_account (email),
    constraint t_comment_t_article_id_fk
        foreign key (articleId) references t_article (id)
);

create table t_file
(
    id    int auto_increment
        primary key,
    email varchar(20) not null,
    name  varchar(50) not null,
    constraint t_file_t_account_email_fk
        foreign key (email) references t_account (email)
);

create table t_article_file
(
    articleId int not null,
    fileId    int not null,
    primary key (articleId, fileId),
    constraint t_article_file_t_article_id_fk
        foreign key (articleId) references t_article (id),
    constraint t_article_file_t_file_id_fk
        foreign key (fileId) references t_file (id)
);

create table t_article_image
(
    fileId    int not null,
    articleId int not null,
    primary key (fileId, articleId),
    constraint t_article_image_t_article_id_fk
        foreign key (articleId) references t_article (id),
    constraint t_article_image_t_file_id_fk
        foreign key (fileId) references t_file (id)
);

create table t_like
(
    articleId int         not null,
    email     varchar(20) not null,
    positive  tinyint(1)  not null,
    primary key (articleId, email),
    constraint t_like_t_account_email_fk
        foreign key (email) references t_account (email),
    constraint t_like_t_article_id_fk
        foreign key (articleId) references t_article (id)
);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '123456';

INSERT INTO t_block (name) VALUES ('default');

