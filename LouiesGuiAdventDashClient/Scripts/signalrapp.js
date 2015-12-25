$(function () {

    $.connection.hub.url = "http://localhost:8085/signalr";
    var perfHub = $.connection.metricsHub;
    console.log("connection set!")

    //setup some charts
    var lineChartData = [
    ];

    var barChartData = [
    ];


    var lineChart = $('#lineChart').epoch({
        type: 'time.line',
        data: lineChartData,
        axes: ['left', 'bottom', 'right']
    });

    var barChart = $('#barChart').epoch({
        type: 'time.bar',
        data: barChartData,
        axes: ['left', 'bottom', 'right']
    });


    var charts = [
        $('#gaugeChart').epoch({ type: 'time.gauge', value: 0.5 }),
        $('#gaugeChart2').epoch({ type: 'time.gauge', value: 0.5 })
    ];


    perfHub.client.broadcastPerformance = function (data) {
        //console.log("broadcastPerformance Getting called every time - im so popular !")
        var timestamp = ((new Date()).getTime() / 1000) | 0;

        data.forEach(function (dataItem) {

            var entry = [];

            if(dataItem.categoryName == "Processor Information")
            {
                console.log(dataItem);
                //lineChart.push({ time: timestamp, y: (dataItem.value / 1000) });
                entry.push({ time: this.timestamp, y: (dataItem.value / 10000) });
                
            }
            else if (dataItem.categoryName == "Memory")
            {
                console.log(dataItem);
                charts[0].update((dataItem.value / 10000))

                entry.push({ time: this.timestamp, y: (dataItem.value / 10000) });

                //lineChartData.push({ time: timestamp, y: (dataItem.value / 100) });
            }
            else if(dataItem.categoryName == "Process")
            {
                if(dataItem.counterName == "% Processor Time")
                {

                }

                if(dataItem.counterName == "Working Set")
                {

                }
            }

            lineChartData.push(entry);
        })
    };




    $.connection.hub.start().done();
});