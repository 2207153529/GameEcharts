var webname = [];
var usernum = []
$.ajax({
    url: 'http://127.0.0.1:8000/bar_data/',
    async: false,
    type: "GET",
    dataType: "json",
    success: function (data) {
        webname = data.webname;
        usernum = data.usernum;
        var echartData = [{
    value: 0,
    name: '',
     itemStyle: {
                    normal: {//颜色渐变
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#e5445c'},
                                {offset: 1, color: 'transparent'}
                            ]
                        )
                    }
                }

}, {
    value: 0,
    name: '',
     itemStyle: {
                    normal: {//颜色渐变
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#D95CFF'},
                                {offset: 1, color: 'transparent'}
                            ]
                        )
                    }
                }

}, {
    value: 0,
    name: '',
     itemStyle: {
                    normal: {//颜色渐变
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#06A3F4'},
                                {offset: 1, color: 'transparent'}
                            ]
                        )
                    }
                }

}, {
    value: 0,
    name: '',
     itemStyle: {
                    normal: {//颜色渐变
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#29AF62'},
                                {offset: 1, color: 'transparent'}
                            ]
                        )
                    }
                }

} ]
        for (i = 0; i < data.classname.length; i++) {
            echartData[i].value = data.count[i];
            echartData[i].name = data.classname[i]
        }
        var Mychart3 = echarts.init(document.querySelectorAll('.bar-box')[0]);
var scale = 0.5;
var total_datas = 0;
for (var i = 0; i < echartData.length; i++) {
    total_datas += echartData[i].value
}

var rich = {
    yellow: {
        color: "#ffc72b",
        fontSize: "120%",
        padding: [5, 0],
        align: 'center'
    },
    total: {
        color: "#ffc72b",
        fontSize: 40 * scale,
        align: 'center',
    },

    blue: {
        color: '#49dff0',
        fontSize: "120%",
        align: 'center'
    },
    hr: {
        borderColor: '#0b5263',
        width: '100%',
        height: 0,
    }
},
option = {
    // backgroundColor: '#060d22',
   title: {
        text: '点击量总数',
        subtext: total_datas,
        textStyle: {
            color: '#f2f2f2',
            fontSize: "200%",
            align: 'center'
        },
        subtextStyle: {
            fontSize: "180%",
            color: ['#ff9d19']
        },
        x: 'center',
        y: '47%',
    },
      legend: {
            // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） | 'vertical'（垂直）
            orient: 'horizontal',
            // x 设置水平安放位置，默认全图居中，可选值：'center' | 'left' | 'right' | {number}（x坐标，单位px）
            x: 'center',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
            y: 30,
            itemWidth: 25,   // 设置图例图形的宽
            itemHeight: 20,  // 设置图例图形的高
            textStyle: {
              color: '#ffffff'  // 图例文字颜色
            },
            // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
            itemGap: 20,
            data: data.classname
          },
    tooltip: {
      show: true
    },
    series: [{
        name: '总点击数量',
        type: 'pie',
        itemStyle: {
        normal: {
          borderWidth: 1,
          borderColor: "#030d22"
        }
      },
    center: ['50%', '65%'],
        radius: ['38%', '50%'],
        hoverAnimation: false,
        color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
        label: {
            normal: {
                formatter: function(params, ticket, callback) {
                    var total = 0; //考生总数量
                    var percent = 0; //考生占比
                    echartData.forEach(function(value, index, array) {
                        total += value.value;
                    });
                    percent = ((params.value / total) * 100).toFixed(1);
                    return '{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                },
                rich: rich
            },
        },
        labelLine: {
            normal: {
                length: 55 * scale,
                length2: 20,
                lineStyle: {
                    color: '#0b5263'
                }
            }
        },
        data: echartData
    }]
};
Mychart3.setOption(option);
window.addEventListener('resize', function(){
    Mychart3.resize();
});

    }
})

