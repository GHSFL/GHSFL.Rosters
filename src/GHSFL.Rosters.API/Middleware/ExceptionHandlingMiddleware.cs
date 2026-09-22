using System.Net;
using System.Text.Json;
using GHSFL.Rosters.Core.Exceptions;

namespace GHSFL.Rosters.API.Middleware;

internal class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (GhsflException ex)
        {
            logger.LogWarning(ex, "GhsflException while handling {Method} {Path}",
                context.Request.Method, context.Request.Path);

            await WriteResponse(context, ex.StatusCode, ex.Message);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception while handling {Method} {Path}",
                context.Request.Method, context.Request.Path);

            await WriteResponse(context, HttpStatusCode.InternalServerError, "An unexpected error occurred.");
        }
    }

    private static Task WriteResponse(HttpContext context, HttpStatusCode statusCode, string message)
    {
        if (context.Response.HasStarted)
        {
            return Task.CompletedTask;
        }

        context.Response.Clear();
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var payload = JsonSerializer.Serialize(new { message });
        return context.Response.WriteAsync(payload);
    }
}
