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

INSERT INTO blog.t_comment (id, articleId, email, content, createdTime) VALUES (2, 1, 'mxr@qq.com', 'first comment', 'June 2nd 2022, 5:51:35 pm');
INSERT INTO blog.t_comment (id, articleId, email, content, createdTime) VALUES (3, 1, 'mxr@qq.com', 'second comment', 'June 2nd 2022, 5:51:55 pm');
