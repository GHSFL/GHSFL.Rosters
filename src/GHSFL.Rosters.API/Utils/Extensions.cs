using GHSFL.Rosters.API.Middleware;
using GHSFL.Rosters.Core.Models;

namespace WebApplication1.Utils;

public static class Extensions
{
    public static User GetUser(this HttpContext context)
    {
        return context.Items[SetUserMiddleware.UserContextKey] as User ?? throw new ArgumentException("Could not get user from context");
    }
}