using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers;

[Route("api/test")]
public class TestController : ControllerBase
{
    [Route("hello-world")]
    public ActionResult Test()
    {
        return Ok($"Hello world! {DateTime.UtcNow}");
    }
}