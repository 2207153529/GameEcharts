$.ajax({
    url: 'http://127.0.0.1:8000/zb_page',
    type: "GET",
    dataType: "json",
    success: function (datas) {
        console.log('请求成功');
        data = [];
        for (i = 0; i < datas.manName.length; i++) {
            data.push({
                name: datas.manName[i],
                value: datas.manMoney[i],
                sum: datas.sum
            });
        }
        console.log(data);
        var Mychart2 = echarts.init(document.querySelector('.double-box'));
getArrByKey = (data, k) => {
    let key = k || "value";
    let res = [];
    if (data) {
        data.forEach(function (t) {
            res.push(t[key]);
        });
    }
    return res;
};
opt = {
    index: 0
}
color = ['#FC619D', '#FF904D', '#48BFE3'];
data = data.sort((a,b) => {
    return b.value - a.value
});
option = {
    title: {
        text: '各主播收入排行',
        textStyle: {
            color: '#b2bce4',
            fontSize: 20
        },
        left: '33%',
        top:10
    },
    grid: {
        top: '8%',
        bottom: -15,
        right: "5%",
        left: "-35%",
        containLabel: true
    },
    xAxis: {
        show: false,
    },
    yAxis: [{
        triggerEvent: true,
        show: true,
        inverse: true,
        data: getArrByKey(data, 'name'),
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            interval: 0,
            color: '#666',
            align: 'left',
            margin: 150,
            fontSize: 13,
            formatter: function (value, index) {
                if (opt.index === 0 && index < 3) {
                    return '{idx' + index + '|' + (1 + index) + '} {title|' + value + '}'
                } else if (opt.index !== 0 && (index + opt.index) < 9) {
                    return '{idx|0' + (1 + index + opt.index) + '} {title|' + value + '}'
                } else {
                    return '{idx|' + (1 + index + opt.index) + '} {title|' + value + '}'
                }
            },
            rich: {
                idx0: {
                    color: '#FB375E',
                    backgroundColor: '#FFE8EC',
                    borderRadius: 100,
                    padding: [5, 8]
                },
                idx1: {
                    color: '#FF9023',
                    backgroundColor: '#FFEACF',
                    borderRadius: 100,
                    padding: [5, 8]
                },
                idx2: {
                    color: '#01B599',
                    backgroundColor: '#E1F7F3',
                    borderRadius: 100,
                    padding: [5, 8]
                },
                idx: {
                    color: '#333',
                    borderRadius: 100,
                    padding: [5, 8]
                },
                title: {
                    width: 165
                }
            }
        },
    }, {
        triggerEvent: true,
        show: true,
        inverse: true,
        data: getArrByKey(data, 'name'),
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            interval: 0,
            color: '#666',
            align: 'left',
            margin: 20,
            fontSize: 13,
            formatter: function (value, index) {
                return '收入：' + data[index].value + '元'
            },
        }
    }],
    series: [{
        name: '条',
        type: 'bar',
        yAxisIndex: 0,
        data: data,
        barWidth: 10,
        itemStyle: {
            color: (val) => {
                if (val.dataIndex < 3 && opt.index === 0) {
                    return color[val.dataIndex];
                } else {
                    return '#1990FF'
                }
            },
            barBorderRadius: 30,
        }
    }]
};
Mychart2.setOption(option);
window.addEventListener('resize', function(){
    Mychart2.resize();
});
    }
})




