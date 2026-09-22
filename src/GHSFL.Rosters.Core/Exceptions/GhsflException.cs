using System.Net;

namespace GHSFL.Rosters.Core.Exceptions;

public class GhsflException : Exception
{
    public HttpStatusCode StatusCode { get; }

    public GhsflException(string message)
        : this(message, HttpStatusCode.InternalServerError)
    {
    }

    public GhsflException(string message, HttpStatusCode statusCode)
        : base(message)
    {
        StatusCode = statusCode;
    }
}
