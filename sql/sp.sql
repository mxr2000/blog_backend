DROP PROCEDURE IF EXISTS GetAccounts;
DROP PROCEDURE IF EXISTS GetAccountByEmail;
DROP PROCEDURE IF EXISTS GetUsernameByEmail;

DELIMITER $$

CREATE PROCEDURE GetAccounts()
BEGIN
    SELECT * FROM t_account;
end $$

CREATE PROCEDURE GetAccountByEmail(
    IN email varchar(20)
)
BEGIN
    SELECT *
    FROM t_account
    WHERE t_account.email = email;
end $$

CREATE PROCEDURE GetUsernameByEmail(
    IN email varchar(20),
    OUT username varchar(20)
)
BEGIN
    SELECT t_account.username
    INTO username
    FROM t_account
    WHERE t_account.email = email;
END $$

DELIMITER ;