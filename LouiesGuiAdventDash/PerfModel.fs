module PerfModel
    open Newtonsoft.Json

    type PerfModel = {
        [<JsonProperty("machineName")>]
        MachineName   : string
        [<JsonProperty("categoryName")>]
        CategoryName  : string 
        [<JsonProperty("counterName")>]
        CounterName   : string 
        [<JsonProperty("instanceName")>]
        InstanceName  : string 
        [<JsonProperty("value")>]
        Value         : double 
    }
