module Startup

open Microsoft.AspNet.SignalR
open Microsoft.AspNet.SignalR.Hubs
open Microsoft.Owin.Hosting
open Microsoft.AspNet.SignalR.Owin

type public Startup() = 
    member public this.Configuration(app:Owin.IAppBuilder) = 
        let config = new HubConfiguration(EnableDetailedErrors = true)
        Owin.MapExtensions.Map(app, "/signalr",
            fun map -> 
                Owin.CorsExtensions.UseCors(map, Microsoft.Owin.Cors.CorsOptions.AllowAll) |> ignore
                Owin.OwinExtensions.RunSignalR(map, config)) |> ignore
          
        ()