$.ajax({
    url: 'http://127.0.0.1:8000/game_fenlei/',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log("请求成功");
        console.log(data);
        getname = data.togglename;
        getvalue = data.count;
        var Mychart1 = echarts.init(document.querySelector('.big-box>.min-box'));
        var data = [];
        for (var i = 0; i < getname.length; i++) {
            data.push({
                name: getname[i],
                value: getvalue[i]
            })
        }
var colorList = ['#503EFF', '#3E82FF', '#8BF39A', '#00FCFD'];
var rich = {
    name: {
        color: "#FFF",
        fontSize: 14,
        padding: [10, 10, 0, 10],
        fontWeight: '400',
        align: 'auto',
    },
    // value: {
    //     show: false,
    //     color: "#FFF",
    //     fontSize: 15,
    //     padding: [10, 20, 0, 20],
    //     fontWeight: '500',
    //     align: 'right'
    // },
    percent: {
        color: "#FFF",
        align: 'right',
        fontSize: 10,
        fontWeight: '500',
        //padding: [0, 5]
    },
    hr: {
        width: '100%',
        height: 0,
    },
    cir: {
        fontSize: 26,
        padding: [0, 10]
    }
}
//职称结构图表

option = {
    backgroundColor: '#0A1934',
    tooltip: {
        trigger: 'axis',
    },
    series: [{
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return params.name + '：' + params.value + '个<br>占比：' + params.percent.toFixed(2) + '%'
            }
        },
        itemStyle: {
            normal: {
                borderColor: '#0A1934',
                borderWidth: 5,
                color: function(params) {
                    return colorList[params.dataIndex]
                }
            }
        },
        type: 'pie',
        radius: ['30%', '50%'],
        center: ["50%", "60%"],
        label: {
            normal: {
                show: false,
                position: 'inner',
                formatter: params => {
                    return (
                        '{percent|' + params.percent.toFixed(0) + '%}'
                    );
                },
                rich: rich,
            }
        },
        data: data
    }, {
        itemStyle: {
            normal: {
                borderColor: '#0A1934',
                borderWidth: 5,
                color: function(params) {
                    return colorList[params.dataIndex]
                }
            }
        },
        type: 'pie',
        silent: true, //取消高亮
        radius: ['30%', '50%'],
        center: ["50%", "60%"],
        labelLine: {
            normal: {
                length: 30,
                length2: 0,
                lineStyle: {
                    color: 'transparent'
                }
            }
        },
        label: {
            normal: {

                formatter: params => {
                    return '{name|' + params.name + '}{value|' + '}\n{hr|————————}';
                },
                rich: rich,
                padding: [-20, 25, 0, 25]
            }
        },
        data: data,
        z: -1
    }, {
        itemStyle: {
            normal: {
                borderColor: '#0A1934',
                borderWidth: 5,
                color: function(params) {
                    return colorList[params.dataIndex]
                }
            }
        },
        type: 'pie',
        silent: false, //取消高亮
        radius: ['30%', '50%'],
        center: ["50%", "60%"],
        labelLine: {
            normal: {
                length: 30,
                length2: 0,
                lineStyle: {
                    color: 'transparent'
                }
            }
        },
        label: {
            normal: {
                formatter: params => {
                    return '\n{cir|●}\n';
                },
                rich: rich,
            }
        },
        data: data,
        z: -1
    }]
};
Mychart1.setOption(option);
window.addEventListener("resize", function() {
    Mychart1.resize();
});
    }
})





