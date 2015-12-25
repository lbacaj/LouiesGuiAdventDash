$(function () {

    $.connection.hub.url = "http://localhost:8085/signalr";
    var perfHub = $.connection.metricsHub;

    //setup some charts

    var lineChart = $('#lineChart').epoch({
        type: 'time.line',
        data: generateLineData(),
        axes: ['left', 'bottom', 'right']
    });

    var barChart = $('#barChart').epoch({
        type: 'time.bar',
        data: generateLineData(),
        axes: ['bottom', 'right']
    });

    var areaChart = $('#areaChart').epoch({
        type: 'time.area',
        data: generateLineData(),
        axes: ['left', 'bottom', 'right']
    });

    var charts = [
        $('#gaugeChart').epoch({ type: 'time.gauge', value: 0.5 }),
        $('#gaugeChart2').epoch({ type: 'time.gauge', value: 0.5 }),
        $('#gaugeChart3').epoch({ type: 'time.gauge', value: 0.5 })
    ];

    perfHub.client.broadcastPerformance = function (data) {
        var timestamp = ((new Date()).getTime() / 1000) | 0;

        var entry = [];

        data.forEach(function (dataItem) {

            if(dataItem.categoryName == "Processor Information")
            {
                console.log('processor: ');
                console.log(dataItem);
                entry.push({ time: timestamp, y: (dataItem.value / 1000000000000) });
                charts[2].update((dataItem.value / 10000000000000))
                
            }
            else if (dataItem.categoryName == "Memory")
            {
                console.log(dataItem);
                charts[0].update((dataItem.value / 10000))

                entry.push({ time: timestamp, y: (dataItem.value / 10000) });

            }
            else if(dataItem.categoryName == "Process")
            {
                
                if(dataItem.counterName == "% Processor Time")
                {
                    console.log(dataItem);
                }
                if(dataItem.counterName == "Working Set")
                {
                    console.log(dataItem);
                    charts[1].update((dataItem.value / 1000000000))
                    entry.push({ time: timestamp, y: (dataItem.value / 1000000000) });
                }
            }
        })
        lineChart.push(entry);
        barChart.push(entry);
        areaChart.push(entry);
    };

    $.connection.hub.start().done();

    //util function to generate some random data
    function generateLineData() {
        var data1 = [{ label: 'Layer 1', values: [] }];
        for (var i = 0; i <= 128; i++) {
            var x = 20 * (i / 128) - 10,
                y = Math.cos(x) * x;
            data1[0].values.push({ x: x, y: y });
        }
        var data2 = [
            { label: 'Layer 1', values: [] },
            { label: 'Layer 2', values: [] },
            { label: 'Layer 3', values: [] }
        ];
        for (var i = 0; i < 256; i++) {
            var x = 40 * (i / 256) - 20;
            data2[0].values.push({ x: x, y: Math.sin(x) * (x / 4) });
            data2[1].values.push({ x: x, y: Math.cos(x) * (x / Math.PI) });
            data2[2].values.push({ x: x, y: Math.sin(x) * (x / 2) });
        }
        return data2;
    }
});