using System.Data;
using GHSFL.Rosters.Core.Models;

namespace GHSFL.Rosters.Core.Utils;

public static class Extensions
{
    public static DataTable ToTable(this IEnumerable<Name> names)
    {
        var dt = new DataTable();
        dt.Columns.Add("FirstName");
        dt.Columns.Add("LastName");
        
        foreach (var n in names)
        {
            var row = dt.NewRow();
            row["FirstName"] = n.FirstName;
            row["LastName"] = n.LastName;
            dt.Rows.Add(row);
        }

        return dt;
    }
}