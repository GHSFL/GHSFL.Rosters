CREATE PROCEDURE spGetRosterOverview
    @userId NVARCHAR(250)
AS
    
    WITH ALL_FENCERS AS (
        SELECT
            R.RosterId,
            R.ClubId,
            F.FencerId,
            F.Gender
        FROM GHSFL.Rosters R
        INNER JOIN GHSFL.RosterFencers RF
            ON R.RosterId = RF.RosterId
        INNER JOIN GHSFL.Fencers F
            ON RF.FencerId = F.FencerId
        INNER JOIN GHSFL.Clubs C
            ON R.ClubId = C.ClubId
        INNER JOIN GHSFL.Users U
            ON C.ClubId = U.ClubId
    ),
    MEN_COUNT AS (
        SELECT 
            RosterId,
            COUNT(*) AS MenCount
        FROM ALL_FENCERS AF
        WHERE AF.Gender = 'M'
        GROUP BY AF.RosterId
    ),
    WOMEN_COUNT AS (
        SELECT
            RosterId,
            COUNT(*) AS WomenCount
        FROM ALL_FENCERS AF
        WHERE AF.Gender = 'F'
        GROUP BY AF.RosterId
    )
    SELECT count(*)  FROM MEN_COUNT
    
    
    
RETURN 0;