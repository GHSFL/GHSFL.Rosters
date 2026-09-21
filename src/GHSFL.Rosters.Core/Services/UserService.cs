using GHSFL.Rosters.Core.Models;
using GHSFL.Rosters.Core.Repositories;

namespace GHSFL.Rosters.Core.Services;

public class UserService(UserRepository repository)
{
    public void CreateUser(User newUser)
    {
        repository.CreateUser(newUser);
    }
}