using System.Security.Claims;
using GHSFL.Rosters.Core.Enums;
using GHSFL.Rosters.Core.Repositories;

namespace GHSFL.Rosters.API.Middleware;

internal class SetUserMiddleware(RequestDelegate next)
{
    private const string AdminClaimName = "Admin";
    public const string UserContextKey = "User";

    public async Task Invoke(HttpContext context, UserRepository userRepository)
    {
        var subjectClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)
                            ?? context.User.FindFirst("sub");

        if (subjectClaim is not null)
        {
            var user = await userRepository.GetUser(subjectClaim.Value);

            if (user is not null)
            {
                context.Items[UserContextKey] = user;

                var identity = context.User.Identities.FirstOrDefault();
                if (identity is not null && user.PermissionLevel == PermissionLevel.Admin)
                {
                    identity.AddClaim(new Claim(AdminClaimName, "1"));
                }
            }
        }

        await next.Invoke(context);
    }
}
