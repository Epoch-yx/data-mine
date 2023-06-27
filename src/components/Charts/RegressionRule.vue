<template>
  <div class="hello">
    <h1 class="button-container">{{ msg }}</h1>
    <p>
      <label for="new-todo" class="label">输入样本拟合数量:</label>
      <input
        id="new-todo"
        v-model="n_samples"
        class="form-control"
        placeholder="100"
        prop="n_samples"
      >
      <label for="new-todo2" class="label">输入多项式拟合阶数：</label>
      <input
        id="new-todo2"
        v-model="degree"
        class="form-control"
        placeholder="2"
        prop="degree"
      >
    </p>
    <form>
      <div class="form-group">
        <h1 class="button-container2">
          <a-button class="custom-button" @click="load()">
            <span class="button-text">生成数据</span></a-button>
        </h1>
        <div id="recive2" style="width: 1200px; height: 600px;" />
        <h1 class="button-container2">
          <a-button class="custom-button" @click="recive()">
            <span class="button-text">回归分析</span></a-button></h1>
      </div>
    </form>
    <div id="recive" style="width: 1200px; height: 600px;" />
  </div>

</template>
<style lang="scss">
.button-container {
  text-align: center; // 将按钮的文本内容居中对齐
}
.button-container2 {
  text-align: left; // 将按钮的文本内容居中对齐
  margin:1%
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
.scroll-container {
  height: 400px;
  overflow: auto;
}
.label {
  text-align: center;
}
</style>
<script>
import axios from 'axios'
import * as echarts from 'echarts5'
import ecStat from 'echarts-stat'
import table from '@/views/table/complex-table.vue'
// import ecStat from 'echarts-stat';
export default {
  name: 'Fyy',
  components: {
    'mytable': table
  }, // 组件名称为fyy
  data() { // 定义数据,dataT 和 columns 是组件的数据属性，用于存储表格的数据和列定义
    return {
      dataT: '',
      columns: '',
      msg: '欢迎来到回归算法分析！',
      degree: null,
      n_samples: null,
      showTable: false,
      form: {
        degree: Number(this.degree),
        n_samples: Number(this.n_samples)
      },
      RegressionTable: [],
      dataXY: []
    }
  },
  // mounted() {
  //   this.initChart();
  // },

  methods: { // 该对象包含了组件的方法
    load() {
      const url = 'http://bore.pub:4090/regression'
      console.log(`${this.degree} ${this.n_samples}`)
      const dict = {
        'degree': Number(this.degree),
        'n_samples': Number(this.n_samples)
      }
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        data: dict
      }
      axios.post(url, null, config).then(res => {
        console.log(res.data)
        this.RegressionTable = res.data
      })
      var chartDom = document.getElementById('recive2')
      var myChart = echarts.init(chartDom)
      var option
      option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: this.RegressionTable.data,
            type: 'scatter'
          }
        ]
      }; myChart.setOption(option)
      // const url = 'http://bore.pub:4090/regression'
      // console.log(`${this.degree} ${this.n_samples}`)
      // const dict = {
      //   'degree': Number(this.degree),
      //   'n_samples': Number(this.n_samples)
      // }
      // const config = {
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // data: dict
      // }
      // axios.post(url, null, config).then(res => {
      //   console.log(res.data)
      //   this.RegressionTable = res.data
      // })
    },
    recive() {
      const url = 'http://bore.pub:4090/regression'
      console.log(`${this.degree} ${this.n_samples}`)
      const dict = {
        'degree': Number(this.degree),
        'n_samples': Number(this.n_samples)
      }
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        data: dict
      }
      axios.post(url, null, config).then(res => {
        console.log(res.data)
        this.RegressionTable = res.data
      })
      var chartDom = document.getElementById('recive')
      var myChart = echarts.init(chartDom)
      var option
      echarts.registerTransform(ecStat.transform.regression)
      const data = this.RegressionTable.data
      const w = this.RegressionTable.w
      console.log(w)
      option = {
        dataset: [
          {
            source: data
          },
          {
            transform: {
              type: 'ecStat:regression',
              config: { method: 'polynomial', order: w.length }
            }
          }
        ],
        title: {
          text: '拟合回归曲线',
          // subtext: 'By ecStat.regression',
          sublink: 'https://github.com/ecomfe/echarts-stat',
          left: 'center',
          top: 16
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          splitNumber: 20
        },
        yAxis: {
          min: -40,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: 'scatter',
            type: 'scatter'
          },
          {
            name: 'line',
            type: 'line',
            smooth: true,
            datasetIndex: 1,
            symbolSize: 0.1,
            symbol: 'circle',
            label: { show: true, fontSize: 16 },
            labelLayout: { dx: -20 },
            encode: { label: 2, tooltip: 1 }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
