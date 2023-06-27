<template>
  <div class="hello">
    <h1 class="button-container">{{ msg }}</h1>
    <p /><h1 class="button-container2">
      <a-button class="custom-button" @click="table2">
        <span class="button-text">显示数据</span>
      </a-button>
    </h1>
    <!-- <p1 v-if="showTable" style="width: 1000px;height:800px;"><mytable></mytable></p1> -->
    <h1><div v-if="showTable"><mytable /></div></h1>
    </p>
    <form>
      <div class="form-group">
        <label for="new-todo">输入 height</label>
        <input
          id="new-todo"
          v-model="height"
          class="form-control"
          placeholder="3"
          prop="height"
        >
        <label for="new-todo2">输入 leaf_samples</label>
        <input
          id="new-todo2"
          v-model="leaf_samples"
          class="form-control"
          placeholder="2"
          prop="leaf_samples"
        >
      </div>
      <h1 class="button-container2">
        <button class="custom-button" @click="recive()">
          <span class="button-text">载入数据</span>
        </button>
      </h1>
      <div>
        <div v-if="showImage" class="image-container">
          <img id="myImage" :src="CFC_text" alt="无法显示">

        </div>
      </div>
    </form>
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
.image-container img {
  width: 1000px; // 设置图片的宽度
  height: 800px; // 自动计算高度，保持图片比例
}
</style>
<script>
// import table from '@/components/table'
import axios from 'axios'
import table from '@/views/table/inline-edit-table'

export default {
  name: 'Dt',
  components: {
    'mytable': table
  },
  data() {
    return {
      msg: '欢迎来到分类分析！',
      showTable: false,
      showImage: false,
      height: null,
      leaf_samples: null,
      form: {
        height: Number(this.height),
        leaf_samples: Number(this.leaf_samples)
      },
      classificationTable: [],
      classificationTable2: [],
      CFC_text: null
    }
  },
  methods: {
    table2() {
      // 当按钮被点击时，将 showTable 设置为 true，显示表格
      this.showTable = true
    },
    // classification() {
    //   this.showImage = true;
    //   this.CFC_text="data:img/png;base64,"+this.classificationTable.decision_tree
    // },
    recive() {
      const url = 'http://bore.pub:4090/classify'
      console.log(`${this.height} ${this.leaf_samples}`)
      const dict = {
        'height': Number(this.height),
        'leaf_samples': Number(this.leaf_samples)
      }
      const config = {
        headers: { // 请求头
          'Content-Type': 'application/json' // 请求json
        },
        data: dict
      } // 构建http请求
      axios.post(url, null, config).then(res => {
        console.log(res.data)
        this.classificationTable = res.data
      })
      axios.get('http://bore.pub:4090/classify').then(res => {
        console.log(res.data)
        this.classificationTable2 = res.data
        console.log(this.classificationTable2)
      })
      this.showImage = true
      this.CFC_text = 'data:img/png;base64,' + this.classificationTable.decision_tree
    }
  }

}
</script>
