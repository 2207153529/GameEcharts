$.ajax({
  url: 'http://127.0.0.1:8000/game_num/',
  type: 'GET',
  dataType: 'json',
  success: function (datas) {
    dataAxis = datas.gameName;
    data = datas.gameCount;
    var Mychart6 = echarts.init(document.querySelectorAll('.min-box')[1]);
// prettier-ignore
let yMax = 50000;
let dataShadow = [];
for (let i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}
option = {
  tooltip: {
    show: true
  },
  xAxis: {
    data: dataAxis,
    axisLabel: {
      interval: 0,
      fontSize: 10,
      color: '#fff',
      rotate: 60
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  grid:{
    top: "10%",
    bottom: "25%",
    left: '15%'
  },
  dataZoom: [
    {
      type: 'inside'
    }
  ],
  series: [
    {
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2378f7' },
            { offset: 0.7, color: '#2378f7' },
            { offset: 1, color: '#83bff6' }
          ])
        }
      },
      data: data
    }
  ]
};
// Enable data zoom when user click bar.
const zoomSize = 6;
Mychart6.on('click', function (params) {
  console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
  Mychart6.dispatchAction({
    type: 'dataZoom',
    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
    endValue:
      dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
  });
});
Mychart6.setOption(option);
window.addEventListener('resize', function() {
    Mychart6.resize();
});
  }

})

