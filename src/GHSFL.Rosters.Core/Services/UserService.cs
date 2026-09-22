using System.Net;
using GHSFL.Rosters.Core.Exceptions;
using GHSFL.Rosters.Core.Models;
using GHSFL.Rosters.Core.Repositories;

namespace GHSFL.Rosters.Core.Services;

public class UserService(UserRepository repository)
{
    public async Task CreateUser(User newUser)
    {
        var error = await repository.CheckUserCanBeCreated(newUser.ClubId, newUser.EmailAddress);
        if (error is not null)
        {
            throw new GhsflException(error, HttpStatusCode.BadRequest);
        }
        repository.CreateUser(newUser);
    }
    
    
}