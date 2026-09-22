CREATE PROCEDURE GHSFL.spInfoGetClubs
AS
    
    SELECT
        *
    FROM GHSFL.Clubs
    WHERE Enabled = 1
    ORDER BY ClubName 
    
RETURN 