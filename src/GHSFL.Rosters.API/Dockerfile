# Build context must be the solution root (src/), not this folder, since
# GHSFL.Rosters.API references GHSFL.Rosters.Core:
#
#   docker build -f GHSFL.Rosters.API/Dockerfile -t ghsfl-rosters-api .
#
# (run from the src/ directory)

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy just the project files first so `dotnet restore` is cached
# independently of source-code changes.
COPY GHSFL.Rosters.API/GHSFL.Rosters.API.csproj GHSFL.Rosters.API/
COPY GHSFL.Rosters.Core/GHSFL.Rosters.Core.csproj GHSFL.Rosters.Core/

RUN dotnet restore GHSFL.Rosters.API/GHSFL.Rosters.API.csproj

COPY GHSFL.Rosters.API/ GHSFL.Rosters.API/
COPY GHSFL.Rosters.Core/ GHSFL.Rosters.Core/

RUN dotnet publish GHSFL.Rosters.API/GHSFL.Rosters.API.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

# Azure Container Apps routes to whatever port the container listens on;
# .NET's container images default to 8080 since .NET 8.
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

COPY --from=build /app/publish .

USER $APP_UID
ENTRYPOINT ["dotnet", "GHSFL.Rosters.API.dll"]
