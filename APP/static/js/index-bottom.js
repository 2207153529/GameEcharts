$.ajax({
    url: 'http://127.0.0.1:8000/web_info/',
    type: "GET",
    dataType: "json",
    success: function (data) {
        names = data.className;
        data1 = data.count;

        var Mychart7 = echarts.init(document.querySelectorAll('.min-box')[3]);
let color = ['#ff4343', '#f69846', '#deb924', '#45dbf7', '#f69846', '#44aff0', '#4777f5', '#5045f6', '#ad46f3', '#f845f1'];
let list = []
let total = 0
for (let i in data1) {
    total += data1[i]
}

let placeHolderStyle = {
    normal: {
        label: {
            show: false
        },
        labelLine: {
            show: false
        },
        color: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0
    }
};

var rich = {
    white: {
        align: 'center',
        padding: [3, 0]
    }
};

for (let i in data1) {
    list.push({
        value: data1[i],
        name: names[i],
        itemStyle: {
            normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i],
                color: color[i]
            }
        }
    }, {
        value: total / 30,
        name: '',
        itemStyle: placeHolderStyle
    })
}

let func = (params) => {
    let percent = ((params.value / total) * 100).toFixed(1)
    let name = params.name.replace(/\n/g, '')
    if (params.name !== '') {
        return name + '\n{white|' + percent + '%}'
    } else {
        return ''
    }
}



option = {
    tooltip: {
        show: false
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        data: names,
        icon: 'circle',
        right: '8%',
        top: '20%',
        itemWidth: 10,
        textStyle: {
            color: '#fff',
            fontSize: "100%",
        }
    },
    series: [{
            name: '',
            type: 'pie',
            clockWise: false,
            startAngle: '90',
            center: ['40%', '50%'],
            radius: ['50%', '51%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: func,
                        rich: rich
                    },
                }
            },
            data: list,
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
                return idx * 50;
            }
        },
        {
            name: '',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['49%', '49%'],
            itemStyle: {
                color: 'transparant'
            },
            startAngle: '90',
            data: [{
                value: total,
                name: '',
                label: {
                    normal: {
                        show: true,
                        // formatter: '{c|{c}} {b|条记录}',
                        rich: {
                            c: {
                                color: 'rgb(98,137,169)',
                                fontSize: 50,
                                fontWeight: 'bold',
                                lineHeight: 5
                            },
                            b: {
                                color: 'rgb(98,137,169)',
                                fontSize: 40,
                                lineHeight: 5
                            }
                        },
                        textStyle: {
                            fontSize: 28,
                            fontWeight: 'bold'
                        },
                        position: 'center'
                    }
                }
            }]
        }
    ]
};
Mychart7.setOption(option);
window.addEventListener('resize', function() {
    Mychart7.resize();
})
    }
})


