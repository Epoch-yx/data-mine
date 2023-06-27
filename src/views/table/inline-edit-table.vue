<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%; height: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row[0] }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Sepal.Length">
        <template slot-scope="{row}">
          <span>{{ row[1] }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Sepal.Width">
        <template slot-scope="{row}">
          <span>{{ row[2] }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="Petal.Length">
        <template slot-scope="{row}">
          <span>{{ row[3] }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="Petal.Width">
        <template slot-scope="{row}">
          <span>{{ row[4] }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Species" width="180">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            <span>{{ row[5] }}</span>
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList } from '@/api/article'
// import { fetchList } from '@/api/myapi'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'InlineEditTable',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      // total: 0,
      table_data: null,
      table_page: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const data = await fetchList(this.listQuery)
      console.log(data.data)
      const items = data.data.df
      console.log(items.df)

      const tempList = items.map(v => {
        this.$set(v, 'edit', false)
        return v
      })

      this.total = data.data.total // 更新总记录数

      this.list = tempList // 一次性获取所有数据

      const startIndex = (this.listQuery.page - 1) * this.listQuery.limit
      const endIndex = startIndex + this.listQuery.limit
      this.list = this.list.slice(startIndex, endIndex) // 根据当前页数和每页的限制，截取需要显示的数据范围

      this.listLoading = false
    },

    // 00000000000000000000000000000000000000000000000000000000000000000000000000
    // async getList() {
    //   this.listLoading = true
    //   const data = await fetchList(this.listQuery)
    //   console.log(data.data);
    //   const items = data.data.df
    //   console.log(items.df);

    //   const tempList = items.map(v => {
    //     this.$set(v, 'edit', false)
    //     return v
    //   })

    //   this.total = data.data.total // 更新总记录数

    //   const startIndex = (this.listQuery.page - 1) * this.listQuery.limit
    //   const endIndex = startIndex + this.listQuery.limit
    //   this.list = tempList.slice(startIndex, endIndex)

    //   this.listLoading = false
    // },
    // 00000000000000000000000000000000000000000000000000000000000000000000000000
    // async getList() {
    //   this.listLoading = true
    //   const data = await fetchList(this.listQuery)
    //   console.log(data.data);
    //   const items = data.data.df
    //   console.log(items.df);

    //   const tempList = items.map(v => {
    //     this.$set(v, 'edit', false)
    //     return v
    //   })

    //   this.total = data.data.total // 更新总记录数
    //   this.list = tempList.slice((this.listQuery.page - 1) * this.listQuery.limit, this.listQuery.page * this.listQuery.limit)
    //   this.listLoading = false
    // },
    // 00000000000000000000000000000000000000000000000000000000000000000000000000
    // async getList() {
    //   this.listLoading = true
    //   const data = await fetchList(this.listQuery)
    //   console.log(data.data);
    //   const items = data.data.df
    //   console.log(items.df);
    //   this.list = items.slice((this.listQuery.page - 1) * this.listQuery.limit, this.listQuery.page * this.listQuery.limit);
    //   this.list = items.map(v => {
    //     this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
    //     console.log(v)

    //     //v.originalTitle = v.title //  will be used when user click the cancel botton
    //     return v
    //   })
    //   this.total = data.data.total// 更新总记录数
    //   this.listLoading = false
    // },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
