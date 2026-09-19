using System.Security.Claims;

namespace WebApplication1.Auth;

public static class ClaimsPrincipalExtensions
{
    // Auth0 access tokens don't carry profile claims (email/name) by default, even when
    // the "profile email" scopes are requested — those land on the ID token instead. To
    // get them onto the access token, an Auth0 Action on the Login flow adds them as
    // namespaced custom claims (see .../GHSFL.Rosters.API's Auth0 setup notes).
    private const string ClaimsNamespace = "https://ghsfl-rosters/";

    public static AuthenticatedUser? GetAuthenticatedUser(this ClaimsPrincipal principal)
    {
        var subject = principal.FindFirstValue(ClaimTypes.NameIdentifier)
                      ?? principal.FindFirstValue("sub");

        if (subject is null)
        {
            return null;
        }

        var email = principal.FindFirstValue(ClaimsNamespace + "email")
                    ?? principal.FindFirstValue(ClaimTypes.Email)
                    ?? principal.FindFirstValue("email");
        var name = principal.FindFirstValue(ClaimsNamespace + "name")
                   ?? principal.FindFirstValue(ClaimTypes.Name)
                   ?? principal.FindFirstValue("name");

        return new AuthenticatedUser(subject, email, name);
    }
}
