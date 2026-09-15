using DbThing.Attributes;
using DbThing.Interfaces;

namespace GHSFL.Rosters.Core.Models;

public partial class Name : IDbPreProcessModel
{
    [DbColumn("FirstName", Required = true)]
    public string FirstName { get; set; }
    
    [DbColumn("LastName", Required = true)]
    public string LastName { get; set; }

    public override string ToString()
    {
        return $"{FirstName} {LastName}";
    }
}