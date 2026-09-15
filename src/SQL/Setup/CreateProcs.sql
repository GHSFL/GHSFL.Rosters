CREATE PROCEDURE spGetUserById
    @userId NVARCHAR(256)
AS
    
    SELECT 
        * 
    FROM GHSFL.Users
    WHERE UserId = @userId;
    
RETURN 0; 
    
CREATE PROCEDURE spCreateUser
    @userId NVARCHAR(256),
    @userName NVARCHAR(100),
    @permissionLevel SMALLINT,
    @emailAddress NVARCHAR(320),
    @clubId INT
AS
    
    INSERT INTO GHSFL.Users (UserId, UserName, EmailAddress, ClubId, PermissionLevel)
    VALUES (@userId, @userName, @emailAddress, @clubId, @permissionLevel);
    
RETURN 0;
    
CREATE PROCEDURE spUpdatePermissionLevelForUser
    @userId NVARCHAR(256),
    @permissionLevel SMALLINT
AS
    
    UPDATE GHSFL.Users
    SET PermissionLevel = @permissionLevel
    WHERE UserId = @userId;
    
RETURN 0;

CREATE PROCEDURE spAdminGetUsers
    @userId NVARCHAR(256)
AS
    
    IF EXISTS (SELECT 1 FROM GHSFL.Users WHERE UserId = @userId AND PermissionLevel = 1)
    BEGIN 
       SELECT * FROM GHSFL.Users 
    END
    
RETURN 0;