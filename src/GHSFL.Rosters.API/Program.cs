using Azure.Monitor.OpenTelemetry.AspNetCore;
using GHSFL.Rosters.API.Middleware;
using GHSFL.Rosters.Core.Repositories;
using GHSFL.Rosters.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Hosting;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog((context, services, configuration) => configuration
        .ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext()
        .Enrich.WithMachineName()
        .Enrich.WithThreadId()
        .WriteTo.Console());

    // Add services to the container.

    builder.Services.AddControllers();
    // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
    builder.Services.AddOpenApi();

    builder.Services.AddOpenTelemetry().UseAzureMonitor();

    var auth0Domain = builder.Configuration["Auth0:Domain"];
    var auth0Audience = builder.Configuration["Auth0:Audience"];

    builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.Authority = $"https://{auth0Domain}/";
            options.Audience = auth0Audience;
        });

    builder.Services.AddScoped<UserService>();
    builder.Services.AddScoped<UserRepository>();
    builder.Services.AddScoped<RosterService>();
    builder.Services.AddScoped<RosterRepository>();
    builder.Services.AddScoped<InfoService>();
    builder.Services.AddScoped<InfoRepository>();
    builder.Services.AddAuthorization();

    var corsAllowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
                              ?? [];

    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
            policy.WithOrigins(corsAllowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod());
    });

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();
    }

    app.UseSerilogRequestLogging();

    app.UseMiddleware<ExceptionHandlingMiddleware>();

    app.UseHttpsRedirection();

    app.UseCors();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseMiddleware<SetUserMiddleware>();

    app.MapControllers();

    app.Run();
}
catch (Exception ex) when (ex is not HostAbortedException)
{
    Log.Fatal(ex, "GHSFL.Rosters.API terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
