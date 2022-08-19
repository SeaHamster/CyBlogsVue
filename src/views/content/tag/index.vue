<template>
  <div class="app-container">
    <el-button
      class="filter-item"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-edit"
      @click="handleCreate"
    >添加</el-button>
    <br />
    <br />
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.tagId }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="名称" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.name" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >cancel</el-button>
          </template>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" min-width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最后修改时间" min-width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >Ok</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >修改</el-button>
          <el-button size="small" type="danger" @click="deleted(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  addTag,
  updateTag,
  deleteTagById,
  fetchTagList
} from "@/api/content/tag";
export default {
  name: "TagTable",
  data() {
    return {
      list: null,
      listLoading: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const items = await fetchTagList();
      this.list = items.map(v => {
        this.$set(v, "edit", false); // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.name; //  will be used when user click the cancel botton
        return v;
      });
      this.listLoading = false;
    },
    handleCreate() {
      this.list.push({ tagId: null, name: "", edit: true });
    },
    /** *
     * 删除数据
     */
    deleted(row) {
      const tagId = row.tagId;
      this.$confirm('是否确认删除用户编号为"' + tagId + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return deleteTagById(tagId);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(function() {});
    },
    cancelEdit(row) {
      row.name = row.originalTitle;
      row.edit = false;
      this.$message({
        message: "修改已取消",
        type: "warning"
      });
    },
    /** *
     * 添加修改数据
     */
    confirmEdit(row) {
      if (row.tagId && row.name) {
        updateTag(row.tagId, row.name).then(response => {
          row.edit = false;
          row.originalTitle = row.name;
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.getList();
        });
      } else if (row.name) {
        addTag(row.name).then(response => {
          row.edit = false;
          row.originalTitle = row.name;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getList();
        });
      }
    }
  }
};
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
