using DbThing.Attributes;
using DbThing.Interfaces;

namespace GHSFL.Rosters.Core.Models;

public partial class Round : IDbPreProcessModel
{
    /// <remarks>
    /// This is a string to account for "Individual Championships", "IC", "Team Championships", etc. 
    /// </remarks>>
    [DbColumn("RoundId", Required = true)]
    public string RoundId { get; set; } = string.Empty;

    /// <remarks>
    /// This is plural because there can be a single round split across multiple weekends. See 2026-27 season weekends
    /// 3 and 7, in which only one school could host on each weekend, so they were combined into one. 
    /// </remarks>>
    [DbColumn("Dates", Required = true)]
    public string Dates { get; set; } = string.Empty;

    [DbColumn("Hosts", Required = true)]
    public string Hosts { get; set; } = string.Empty;
    
    [DbColumn("Notes", Required = false)]
    public string? Notes { get; set; }
}