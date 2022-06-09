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

INSERT INTO blog.t_like (articleId, email, positive) VALUES (1, 'mxr@qq.com', 0);
