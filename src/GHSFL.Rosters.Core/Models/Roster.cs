namespace GHSFL.Rosters.Core.Models;

public class Roster
{
    public int ClubId { get; set; }
    public int Round { get; set; }
    public char Gender { get; set; }
    public List<Name> Fencers { get; set; }
}