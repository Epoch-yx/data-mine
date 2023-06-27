<template>
  <div>
    <p /><h1 class="button-container2"><button type="button" class="custom-button" @click="show()">
      <span class="button-text">载入数据</span></button></h1>
    <h1><div id="show" style="width: 600px;height:400px;" /></h1>
    </p>
    <p /><form>
      <label>input K =</label>
      <input
        id="new-todo"
        v-model="k"
        placeholder="3"
      >
      <h1 class="button-container2"><button type="button" class="custom-button" @click="clustering()">
        <span class="button-text">聚类分析</span></button></h1>
    </form>
    <h1><div id="result" style="width: 1000px;height:600px;" /></h1>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'
import ecStat from 'echarts-stat'
export default {
  name: 'Apriori',
  data() {
    return {
      aa: 'hello',
      k: 3,
      resources: '',
      days: [],
      hours: [],
      dataHot: []
    }
  },
  created() {
  },
  methods: {
    show() {
      // var myChart = this.$echarts.init(document.getElementById('show'))
      var chartDom = document.getElementById('show')
      var myChart = echarts.init(chartDom, null, {
        renderer: 'svg'
      })
      var option
      myChart.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie', // 设置图表类型为饼图
            radius: '55%', // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [ // 数据数组，name 为数据项名称，value 为数据项值
              { value: 235, name: '视频广告' },
              { value: 274, name: '联盟广告' },
              { value: 310, name: '邮件营销' },
              { value: 335, name: '直接访问' },
              { value: 400, name: '搜索引擎' }
            ]
          }
        ]
      })
    },
    clustering() {
      var chartDom = document.getElementById('result')
      var myChart = echarts.init(chartDom, null, {
      // renderer: 'svg'
      })
      // var myChart = this.$echarts.init(document.getElementById('result'))
      var option
      var data = [
        [3.275154, 2.957587],
        [-3.344465, 2.603513],
        [0.355083, -3.376585],
        [1.852435, 3.547351],
        [-2.078973, 2.552013],
        [-0.993756, -0.884433],
        [2.682252, 4.007573],
        [-3.087776, 2.878713],
        [-1.565978, -1.256985],
        [2.441611, 0.444826],
        [-0.659487, 3.111284],
        [-0.459601, -2.618005],
        [2.17768, 2.387793],
        [-2.920969, 2.917485],
        [-0.028814, -4.168078],
        [3.625746, 2.119041],
        [-3.912363, 1.325108],
        [-0.551694, -2.814223],
        [2.855808, 3.483301],
        [-3.594448, 2.856651],
        [0.421993, -2.372646],
        [1.650821, 3.407572],
        [-2.082902, 3.384412],
        [-0.718809, -2.492514],
        [4.513623, 3.841029],
        [-4.822011, 4.607049],
        [-0.656297, -1.449872],
        [1.919901, 4.439368],
        [-3.287749, 3.918836],
        [-1.576936, -2.977622],
        [3.598143, 1.97597],
        [-3.977329, 4.900932],
        [-1.79108, -2.184517],
        [3.914654, 3.559303],
        [-1.910108, 4.166946],
        [-1.226597, -3.317889],
        [1.148946, 3.345138],
        [-2.113864, 3.548172],
        [0.845762, -3.589788],
        [2.629062, 3.535831],
        [-1.640717, 2.990517],
        [-1.881012, -2.485405],
        [4.606999, 3.510312],
        [-4.366462, 4.023316],
        [0.765015, -3.00127],
        [3.121904, 2.173988],
        [-4.025139, 4.65231],
        [-0.559558, -3.840539],
        [4.376754, 4.863579],
        [-1.874308, 4.032237],
        [-0.089337, -3.026809],
        [3.997787, 2.518662],
        [-3.082978, 2.884822],
        [0.845235, -3.454465],
        [1.327224, 3.358778],
        [-2.889949, 3.596178],
        [-0.966018, -2.839827],
        [2.960769, 3.079555],
        [-3.275518, 1.577068],
        [0.639276, -3.41284]
      ]

      var clusterNumber = 5
      // See https://github.com/ecomfe/echarts-stat
      var step = ecStat.clustering.hierarchicalKMeans(data, clusterNumber, true)
      var result

      option = {
        timeline: {
          top: 'center',
          right: 35,
          height: 300,
          width: 10,
          inverse: true,
          playInterval: 2500,
          symbol: 'none',
          orient: 'vertical',
          axisType: 'category',
          autoPlay: true,
          label: {
            normal: {
              show: false
            }
          },
          data: []
        },
        baseOption: {
          title: {
            text: 'Process of Clustering',
            subtext: 'By ecStat.hierarchicalKMeans',
            sublink: 'https://github.com/ecomfe/echarts-stat',
            left: 'center'
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            type: 'scatter'
          }]
        },
        options: []
      }

      for (var i = 0; !(result = step.next()).isEnd; i++) {
        option.options.push(getOption(result, clusterNumber))
        option.timeline.data.push(i + '')
      }

      function getOption(result, k) {
        var clusterAssment = result.clusterAssment
        var centroids = result.centroids
        var ptsInCluster = result.pointsInCluster
        var color = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
        var series = []
        for (i = 0; i < k; i++) {
          series.push({
            name: 'scatter' + i,
            type: 'scatter',
            animation: false,
            data: ptsInCluster[i],
            markPoint: {
              symbolSize: 29,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true,
                  position: 'top',
                  formatter: function(params) {
                    return Math.round(params.data.coord[0] * 100) / 100 + '  ' +
                                      Math.round(params.data.coord[1] * 100) / 100 + ' '
                  },
                  textStyle: {
                    color: '#000'
                  }
                }
              },
              itemStyle: {
                normal: {
                  opacity: 0.7
                }
              },
              data: [{
                coord: centroids[i]
              }]
            }
          })
        }

        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          series: series,
          color: color
        }
      }
      myChart.setOption(option)
    }
    // getMessage() {
    //   const url = 'http://127.0.0.1:5000/heatmap'
    //   axios.get(url).then((res) => {
    //     this.resources = res.data
    //     this.hours = this.resources.hours
    //     this.days = this.resources.days
    //     this.dataHot = this.resources.dataHot.map(function(item) {
    //       return [item[1], item[0], item[2] || '-']
    //     })
    //   })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // }
  }
}

</script>

<style lang="scss">
.button-container {
 text-align: center; // 将按钮的文本内容居中对齐
}
.button-container2 {
 text-align: left; // 将按钮的文本内容居中对齐
 margin:1%;
 overflow: auto;
}
.custom-button {
 width: 300px; // 设置按钮的宽度
 height: 40px; // 设置按钮的高度
 background-color: #33cc99; // 设置背景颜色
 color: #fff; // 设置文本颜色
 text-align: center; // 将按钮的文本内容居中对齐
 padding: 5px 20px; // 设置内边距
 border: none; // 移除边框
 border-radius: 1px; // 设置圆角
 cursor: pointer; // 设置鼠标样式为指针
 transition: background-color 0.3s ease; // 添加过渡效果
 display: inline-block; // 将按钮设置为行内块元素
 margin: 0 auto; // 将按钮水平居中
&:hover {
background-color: #2980b9; // 鼠标悬停时的背景颜色
 }
}
.button-text {
text-align: center; // 水平居中
line-height: 30px; // 设置行高为按钮的高度，这里假设按钮高度为 40 像素
font-size: 16px; // 设置字体大小为 16 像素
/* 其他样式属性 */
}

</style>
