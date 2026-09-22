using DbThing;
using GHSFL.Rosters.Core.Models;
using Microsoft.Extensions.Configuration;

namespace GHSFL.Rosters.Core.Repositories;

public class InfoRepository(IConfiguration config) : DbRepository(config)
{
    public async Task<List<Round>> GetRounds()
    {
        return await QueryAsync<Round>("GHSFL.spInfoGetRounds");
    }
    
    public async Task<List<Club>> GetClubs()
    {
        return await QueryAsync<Club>("GHSFL.spInfoGetClubs");
    }
}