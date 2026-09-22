using GHSFL.Rosters.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GHSFL.Rosters.API.Controllers;

[Route("api/info")]
public class InfoController(InfoService infoService) : ControllerBase
{
    [Authorize] 
    [HttpGet]
    [Route("rounds")]
    public async Task<IActionResult> GetRounds()
    {
        return Ok(await infoService.GetRounds());
    }

    [HttpGet]
    [Route("clubs")]
    public async Task<IActionResult> GetClubs()
    {
        return Ok(await infoService.GetClubs());
    }
}