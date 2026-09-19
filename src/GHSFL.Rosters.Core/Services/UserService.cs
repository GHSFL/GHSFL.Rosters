using GHSFL.Rosters.Core.Models;
using GHSFL.Rosters.Core.Repositories;

namespace GHSFL.Rosters.Core.Services;

public class UserService(UserRepository repository)
{
    public void CreateUser(User newUser)
    {
        repository.CreateUser(newUser);
    }

    public async Task<User> GetUser(string userId)
    {
        var user = await repository.GetUser(userId) ?? throw new ArgumentException("Invalid user");
        return user;
    }
}