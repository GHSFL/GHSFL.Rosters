CREATE PROCEDURE spSubmitRoster
    @clubId INT,
    @gender CHAR,
    @round INT,
    @userId NVARCHAR(256),
    @roster ttRoster READONLY
AS
    
    DECLARE @submittedTime DATETIME = GETDATE();

    SELECT 
        R.FirstName,
        R.LastName
    INTO #NewFencers
    FROM @roster R
    WHERE NOT EXISTS (
        SELECT 
            1
        FROM GHSFL.Fencers F
        WHERE F.FirstName = R.FirstName AND
              F.LastName  = R.LastName AND
              F.ClubId = @clubId
    );
    
    INSERT INTO GHSFL.Fencers (FirstName, LastName, ClubId, Gender)
    SELECT
        FirstName,
        LastName,
        @clubId,
        @gender
    FROM #NewFencers;
    
    INSERT INTO GHSFL.Rosters (ClubId, RoundNumber, SubmittedTime, SubmittedById, Gender)
    VALUES (@clubId, @round, @submittedTime, @userId, @gender);
    DECLARE @rosterId BIGINT = SCOPE_IDENTITY();
    
    INSERT INTO GHSFL.RosterFencers (RosterId, FencerId)
    SELECT
        @rosterId,
        F.FencerId
    FROM @roster R
    INNER JOIN GHSFL.Fencers F
    ON R.FirstName = F.FirstName AND
       R.LastName = F.LastName AND 
       F.ClubId = @clubId

    SELECT * FROM #NewFencers;
    
RETURN 0