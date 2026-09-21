using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Utils;

namespace WebApplication1.Controllers;

[Route("api/test")]
public class TestController : ControllerBase
{
    [Route("hello-world")]
    public ActionResult Test()
    {
        return Ok($"Hello world! {DateTime.UtcNow}");
    }

    [Authorize]
    [Route("auth/hello-world")]
    public ActionResult TestAuthed()
    {
        var user = HttpContext.GetUser();
        return Ok(new
        {
            Message = $"Hello world! {DateTime.UtcNow}",
            User = user
        });
    }
}
