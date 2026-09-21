using GHSFL.Rosters.Core.Models;
using GHSFL.Rosters.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace GHSFL.Rosters.API.Controllers;

[Route("api/roster")]
public class RosterController(RosterService rosterService) : ControllerBase
{
    [HttpPost]
    [Route("")]
    public async Task<IActionResult> SubmitRoster([FromBody] Roster roster)
    {
        return NotFound();
    }
}