using DbThing;
using GHSFL.Rosters.Core.Enums;
using GHSFL.Rosters.Core.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace GHSFL.Rosters.Core.Repositories;

public class UserRepository(IConfiguration config) : DbRepository(config)
{
    public async Task<User?> GetUser(string userId)
    {
        var result = await QueryAsync<User>("spGetUserById", [new SqlParameter("@userId", userId)]);
        return result.FirstOrDefault();
    }

    public void CreateUser(User user)
    {
        Execute("spCreateUser", [
            new SqlParameter("@userId", user.UserId),
            new SqlParameter("@userName", user.UserName),
            new SqlParameter("@permissionLevel", user.PermissionLevel),
            new SqlParameter("@emailAddress", user.EmailAddress),
            new SqlParameter("@clubId", user.ClubId)
        ]);
    }

    public void UpdateUserPermissionLevel(string userId, PermissionLevel level)
    {
        Execute("spUpdatePermissionLevelForUser", [
            new SqlParameter("@userId", userId),
            new SqlParameter("@permissionLevel", level)
        ]);
    }
}