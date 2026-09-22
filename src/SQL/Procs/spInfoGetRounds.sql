CREATE PROCEDURE GHSFL.spInfoGetRounds 
AS
    
    SELECT
        *
    FROM GHSFL.Rounds
    ORDER BY OrderIndex
    
RETURN 0