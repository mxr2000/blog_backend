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

INSERT INTO blog.t_article (id, email, blockId, header, content, createdTime, updatedTime) VALUES (1, 'mxr@qq.com', 1, 'updated header', 'Penis', 'June 2nd 2022, 5:28:46 pm', 'June 2nd 2022, 6:33:31 pm');
