DROP FUNCTION IF EXISTS CalcIncome;


DELIMITER $$

CREATE FUNCTION CalcIncome (
starting_val INT
) RETURNS INT
BEGIN
    DECLARE income INT;
    SET income = starting_val + 100;
    RETURN income;
end $$


DELIMITER ;