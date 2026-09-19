CREATE PROCEDURE GHSFL.spGetUserById
    @userId nvarchar(250)
AS
    
    SELECT
        *
    FROM GHSFL.Users
    WHERE UserId = @userId
    
RETURN 0
