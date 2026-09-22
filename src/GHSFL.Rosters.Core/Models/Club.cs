using DbThing.Attributes;
using DbThing.Interfaces;

namespace GHSFL.Rosters.Core.Models;

public partial class Club : IDbPreProcessModel 
{
    [DbColumn("ClubId", Required = true)]
    public int ClubId { get; set; }

    [DbColumn("ClubName", Required = true)]
    public string ClubName { get; set; } = string.Empty;
}