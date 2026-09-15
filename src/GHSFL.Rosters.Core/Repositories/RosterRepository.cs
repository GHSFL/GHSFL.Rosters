using DbThing;
using GHSFL.Rosters.Core.Models;
using GHSFL.Rosters.Core.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace GHSFL.Rosters.Core.Repositories;

public class RosterRepository(IConfiguration config) : DbRepository(config)
{
    public async Task<List<Name>> SubmitRoster(int submittedByUserId, int round, int clubId, char gender, List<Name> fencers)
    {
        var result = await QueryAsync<Name>("spSubmitRoster", [
            new SqlParameter("@clubId", clubId),
            new SqlParameter("@gender", gender),
            new SqlParameter("@round", round),
            new SqlParameter("@userId", submittedByUserId),
            new SqlParameter("@roster", fencers.ToTable()),
        ]);
        
        return result;
    }

    public async Task<List<Name>> GetRosterById(int userId, long rosterId)
    {
        throw new NotImplementedException();
    }

    public async Task<RosterOverview> GetRosterOverview(int userId)
    {
        throw new NotImplementedException();
    }
}