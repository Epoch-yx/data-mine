<template>
  <div>
    <h1 class="button-container">{{ msg }}</h1>
    <p /><h1 class="button-container2"><button type="button" class="custom-button" @click="show()">
      <span class="button-text">载入数据</span></button></h1>
    <h1><div id="show" style="width: 600px;height:400px;" /></h1>
    </p>
    <p /><p>input 支持度：</p>
    <h1><input v-model="support" placeholder="0.4"></h1>
    <p>input 置信度：</p>
    <h1><input v-model="confidence" placeholder="0.4"></h1>
    <h1 class="button-container2"><button type="button" class="custom-button" @click="result()">
      <span class="button-text">分析数据</span></button></h1>
    <h1><div id="result" style="width: 1000px;height:600px;" /></h1>
    </p>
  </div>

</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  name: 'Apriori',
  data() {
    return {
      aa: 'hello',
      support: 0.4,
      confidence: 0.4,
      resources: '',
      days: [],
      hours: [],
      dataHot: [],
      msg: '欢迎来到关联规则算法分析！'
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    show() {
      var chartDom = document.getElementById('show')
      var myChart = echarts.init(chartDom)
      // myChart.setOption({
      var option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
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
      }
      myChart.setOption(option)
    },
    getMessage() {
    //   const url = 'http://127.0.0.1:5000/heatmap'
    //   axios.get(url).then((res) => {
    //     this.resources = res.data
    //     this.hours = this.resources.hours
    //     this.days = this.resources.days
      // this.dataHot = this.resources.dataHot.map(function(item)
    //     {
    //       return [item[1], item[0], item[2] || '-']
    //     })
    //   })
    //     .catch((error) => {
    //       console.error(error)
    //     })
      const hours = [
        '12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'
      ]
      // prettier-ignore
      const days = [
        'Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'
      ]
      // prettier-ignore
      const data = [[0, 0, 5], [0, 1, 1], [0, 2, 3], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
        .map(function(item) {
          return [item[1], item[0], item[2] || '-']
        })
      this.resources = data
      this.hours = hours
      this.days = days
    },
    result() {
      var chartDom = document.getElementById('result')
      var myChart = echarts.init(chartDom)
      console.log(this.days)
      //   console.log(this.dataHot)
      var option = {
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: this.hours,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: this.days,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        },
        series: [{
          name: 'Punch Card',
          type: 'heatmap',
          data: this.resources,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }

      myChart.setOption(option)
    }

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
