using DbThing.Attributes;
using DbThing.Interfaces;

namespace GHSFL.Rosters.Core.Models;

public partial class RosterOverview : IDbPreProcessModel
{
    [DbColumn("ClubId", Required = true)]
    public int ClubId { get; set; }
    
    [DbColumn("ClubName", Required = true)]
    public int ClubName { get; set; }
    
    [DbColumn("RoundNumber", Required = true)]
    public int RoundNumber { get; set; }
    
    [DbColumn("SubmittedTime", Required = true)]
    public DateTime WhenSubmitted { get; set; }
    
    [DbColumn("NumberOfMen")]
    public int MenCount { get; set; }
    
    [DbColumn("NumberOfWomen")]
    public int WomenCount { get; set; }
        
    [DbColumn("SubmittedByEmail")]
    public string? SubmittedBy { get; set; }
}
