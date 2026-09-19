
using GHSFL.Rosters.Core.Models;
using GHSFL.Rosters.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers;

[Route("api/user")]
public class UserController(UserService userService) : ControllerBase
{
    [HttpPost]
    [Route("")]
    public IActionResult CreateUser([FromBody] User newUser)
    {
        userService.CreateUser(newUser);
        return Ok();
    }
}