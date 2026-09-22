CREATE PROCEDURE GHSFL.spCheckUser
    @clubId INT,
    @email NVARCHAR(320)
AS
    
    IF EXISTS (SELECT 1 FROM GHSFL.Users WHERE EmailAddress = @email)
    BEGIN
        SELECT 'Email already in use. Contact james.wallace@ghsfl.net if you believe this is in error.' AS Error
        RETURN
    END
    
    
    IF EXISTS (SELECT 1 FROM GHSFL.Clubs WHERE ClubId = @clubId AND SeatsUsed = 3)
    BEGIN 
        SELECT 'Club has maximum number of seats used. Contact james.wallace@ghsfl.net if you believe this is in error.' AS Error
    END
    
    SELECT NULL AS ERROR
    
RETURN 0