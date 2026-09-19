namespace WebApplication1.Auth;

// The identity as asserted by the Auth0-issued JWT — not the GHSFL.Rosters.Core.Models.User
// DB record. Mapping a token's "sub" claim to an app-specific user record is a separate,
// not-yet-implemented step.
public record AuthenticatedUser(string Subject, string? Email, string? Name);
