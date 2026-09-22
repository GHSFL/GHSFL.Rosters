using GHSFL.Rosters.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GHSFL.Rosters.API.Controllers;

[Authorize]
[Route("api/info")]
public class InfoController(InfoService infoService) : ControllerBase
{
    [HttpGet]
    [Route("api/info/rounds")]
    public async Task<IActionResult> GetRounds()
    {
        return Ok(await infoService.GetRounds());
    }

    [HttpGet]
    [Route("api/info/clubs")]
    public async Task<IActionResult> GetClubs()
    {
        return Accepted();
    }
}