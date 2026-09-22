namespace GHSFL.Rosters.Core.Models;

public class Roster
{
    public required string SubmittedBy { get; set; }
    public int ClubId { get; set; }
    public int Round { get; set; }
    public char Gender { get; set; }
    public List<Name> Fencers { get; set; } = new();
}