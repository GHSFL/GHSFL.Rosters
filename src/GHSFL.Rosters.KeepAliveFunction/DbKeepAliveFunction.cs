using Microsoft.Azure.Functions.Worker;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace GHSFL.Rosters.KeepAliveFunction;

public class DbKeepAliveFunction(IConfiguration config, ILogger<DbKeepAliveFunction> logger)
{
    [Function("DbKeepAlive")]
    public async Task Run([TimerTrigger("0 0 * * * *")] TimerInfo timer)
    {
        try
        {
            var connectionStringKey = config["DbThing:DbConnectionStringKey"];
            var connectionString = config[connectionStringKey!];

            await using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            await using var command = connection.CreateCommand();
            command.CommandText = "SELECT 1";
            await command.ExecuteScalarAsync();

            logger.LogInformation("DB keep-alive ping succeeded");
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "DB keep-alive ping failed");
        }
    }
}
