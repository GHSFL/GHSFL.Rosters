using GHSFL.Rosters.Core.Models;
using GHSFL.Rosters.Core.Repositories;

namespace GHSFL.Rosters.Core.Services;

public class InfoService(InfoRepository repository)
{
    public async Task<List<Round>> GetRounds()
    {
        return await repository.GetRounds();
    }
}