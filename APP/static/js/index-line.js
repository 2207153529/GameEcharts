$.ajax({
    url: 'http://127.0.0.1:8000/zb_line/',
    type: "GET",
    dataType: "json",
    success: function (data) {
        xData = data.zbName;
        adata = data.audience_count;
        gdata = data.gift_person_count;
var Mychart4 = echarts.init(document.querySelectorAll(".min-box")[2]);
option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            textStyle: {
                color: "#fff"
            }

        },
    },
    grid: {
        borderWidth: 0,
        top: '20%',
        bottom: "20%",
        textStyle: {
            color: "#fff"
        }
    },
    legend: {
        x: '40%',
        top: '8%',
        textStyle: {
            color: '#90979c',
        },
        data: ['活跃观众人数', '赠送礼物人数']
    },


    calculable: true,
    xAxis: [{
        type: "category",
        axisLine: {
            lineStyle: {
                color: "rgba(204,187,225,0.5)",
            }
        },
        axisLabel: {
            interval:10,
            rotate: 40
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        data: xData,
    }],

    yAxis: [{
        type: "value",
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: "rgba(204,187,225,0.5)",
            }
        },

    }],
    dataZoom: [{
        show: true,
        height: 15,
        xAxisIndex: [0],
        bottom: '6%',

        "start": 10,
        "end": 80,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
            color: "#5B3AAE",
        },
        textStyle:{
            color:"rgba(204,187,225,0.5)",
        },
        fillerColor:"rgba(67,55,160,0.4)",
        borderColor: "rgba(204,187,225,0.5)",

    }, {
        type: "inside",
        show: true,
        height: 15,
        start: 1,
        end: 35
    }],
    series: [{
        name: "活跃观众人数",
        type: "line",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#6f7de3",
        },
        markPoint: {
            label: {
                normal: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            data: [{
                type: 'max',
                name: '最大值',

            }, {
                type: 'min',
                name: '最小值'
            }]
        },
        data: adata,
    }, {
        name: "赠送礼物人数",
        type: "line",
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
            color: "#c257F6",
        },
        markPoint: {
            label: {
                normal: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            data: [{
                type: 'max',
                name: '最大值',

            }, {
                type: 'min',
                name: '最小值'
            }]
        },
        data: gdata
    }, ]
}
Mychart4.setOption(option);
window.addEventListener("resize", function() {
    Mychart4.resize();
});
    }
})
