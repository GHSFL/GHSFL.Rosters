using DbThing.Attributes;
using DbThing.Interfaces;
using GHSFL.Rosters.Core.Enums;

namespace GHSFL.Rosters.Core.Models;

public partial class User : IDbPreProcessModel
{
    [DbColumn("UserId", Required = true)]
    public string UserId { get; set; } = string.Empty;
    
    [DbColumn("UserName", Required = true)]
    public string UserName { get; set; } = string.Empty;
    
    [DbColumn("PermissionLevel", Required = true)]
    public PermissionLevel PermissionLevel { get; set; }
    
    [DbColumn("EmailAddress", Required = true)]
    public string EmailAddress { get; set; } = string.Empty;
    
    [DbColumn("ClubId", Required = true)]
    public int ClubId { get; set; }
}