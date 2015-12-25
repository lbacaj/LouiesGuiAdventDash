#I "bin"
 
#r "Debug\Newtonsoft.Json.dll"
#r "Debug\Microsoft.AspNet.SignalR.Core.dll"
#r "Debug\Microsoft.AspNet.SignalR.Owin.dll"
#r "Debug\Microsoft.Owin.Cors.dll"
#r "Debug\Microsoft.Owin.dll"
#r "Debug\Microsoft.Owin.Hosting.dll"
#r "Debug\Owin.dll"
#r "Debug\FSharp.Interop.Dynamic.dll"
#r "Debug\Dynamitey.dll"

#r "Debug\LouiesGuiAdventDash.dll"

open Owin
open System
open FSharp.Interop.Dynamic
open Microsoft.AspNet.SignalR
open Microsoft.AspNet.SignalR.Owin
open Microsoft.Owin.Hosting
open Microsoft.Owin.Cors
open Microsoft.AspNet.SignalR.Hubs
open Startup
open MetricsHub
open LouiesGuiAdventDash


let url = "http://localhost:8085/"

AdventDash.start url
0