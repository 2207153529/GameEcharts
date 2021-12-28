

var Mychart5 = echarts.init(document.querySelectorAll('.bar-box')[1]);
var colorList = ['rgba(211, 68, 53, 1)', 'rgba(228, 133, 48, 1)', 'rgba(231, 185, 44, 1)', 'rgba(23, 165, 213, 1)'];
var datas = []
for (i = 0; i < webname.length; i++) {
    datas.push({
        name: webname[i],
        value: usernum[i]
    })
}
let maxArr = new Array(datas.length).fill(100);
option = {
    // backgroundColor: 'rgb(20,28,52)',
    tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    legend: {
        show: false,

    },
    grid: {
        left: '-20%',
        bottom: 10,
        right: 30,
        containLabel: true,
    },
    xAxis: {
        nameTextStyle: {
                overflow: 'truncate',
                width: 10
        },
        show: false,
        type: 'value',
        axisLine: {
            show: true,
            lineStyle: {
                color: ['rgba(62, 113, 157, 0.5)']
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(62, 113, 157, 0.5)'
            }
        },
        axisLabel: {
            color: 'rgba(62, 113, 157, 1)'
        }
    },
    yAxis: [
        {

            // nameTextStyle: {
            //     overflow: 'truncate',
            //     width: 10
            // },
            type: 'category',
            inverse: true,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisPointer: {
                label: {
                    show: true,
                    margin: 30,
                },
            },
            data: datas.map((item) => item.name),
            axisLabel: {
                margin: 100,
                fontSize: 14,
                align: 'left',
                color: '#fff',
                rich: {
                    a1: {
                        color: '#fff',
                        backgroundColor: colorList[0],
                        width: 20,
                        height: 20,
                        align: 'center',
                        borderRadius: 10,
                    },
                    a2: {
                        color: '#fff',
                        backgroundColor: colorList[1],
                        width: 20,
                        height: 20,
                        align: 'center',
                        borderRadius: 10,
                    },
                    a3: {
                        color: '#fff',
                        backgroundColor: colorList[2],
                        width: 20,
                        height: 20,
                        align: 'center',
                        borderRadius: 10,
                    },
                    b: {
                        color: '#fff',
                        backgroundColor: colorList[3],
                        width: 20,
                        height: 20,
                        align: 'center',
                        borderRadius: 10,
                    },
                },
                formatter: function (params) {
                    var index = datas.map((item) => item.name).indexOf(params);
                    index = index + 1;
                    if (index - 1 < 3) {
                        return ['{a' + index + '|' + index + '}' + '  ' + params].join('\n');
                    } else {
                        return ['{b|' + index + '}' + '  ' + params].join('\n');
                    }
                },
            },
        }
    ],
    series: [
        {
            z: 2,
            name: '点击量',
            type: 'bar',
            barWidth: 8,
            zlevel: 1,
            data: datas.map((item, i) => {
                itemStyle = {}
                itemStyle.color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                        offset: 0,
                        color: 'rgba(24, 103, 222, 0.4)',
                    },
                    {
                        offset: 1,
                        color: i < 3 ? colorList[i] : colorList[3],
                    },
                ])
                return {
                    value: item.value,
                    itemStyle: itemStyle,
                };
            }),
            label: {
                show: true,
                position: 'right',
                color: '#fff',
                fontSize: 14,
            },
            itemStyle: {
                barBorderRadius: [0, 15, 15, 0],
            }
        },
        {
            name: '背景',
            type: 'bar',
            barWidth: 24,
            barGap: '-200%',
            itemStyle: {
                normal: {
                    color: 'rgba(0, 64, 128, 0.19)',
                },
            },
            data: maxArr,
        },
    ],
};
Mychart5.setOption(option);
window.addEventListener('resize', function(){
    Mychart5.resize();
})