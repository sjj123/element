<template>
    <div class="box">
        <el-form :inline="true" class="demo-form-inline">
            <el-row type="flex" class="wan-title-box" justify="space-between">
                <el-col :span="6">
                    <span class="wan-listTitle">角色管理</span>
                </el-col>
                <el-col :span="6" align="right">
                    <el-form-item>
                        <el-button
                            size="small"
                            icon="el-icon-plus"
                            type="primary"
                            @click="handleEdit('')"
                        >添加角色</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="group_name" label="角色名称" width="180" align="center"></el-table-column>
            <el-table-column prop="created_at" align="center" label="创建时间"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row.group_id)">编辑</el-button>
                    <el-button
                        size="small"
                        v-if="scope.row.status == 1"
                        type="danger"
                        @click="handleDisable(scope.row.group_id,'0')"
                    >禁用</el-button>
                    <el-button
                        size="small"
                        v-if="scope.row.status == 0"
                        type="primary"
                        @click="handleDisable(scope.row.group_id,'1')"
                    >启用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pageBox">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="per_num"
                layout="total, prev, pager, next"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import { API_Role_getRoleList, API_Role_Disable } from "@/fetch/fetchApi";
export default {
    data() {
        return {
            tableData: [],
            loading: false,
            title: "",
            page: 1,
            total: 0,
            per_num: 10
        };
    },
    mounted() {
        this.onSubmit();
    },
    methods: {
        //列表查询
        //列表查询
        onSubmit() {
            this.loading = true;
            API_Role_getRoleList({
                page: this.page,
                per_num: this.per_num
            })
                .then(response => {
                    this.loading = false;
                    this.tableData = response.data.data;
                    this.total = response.data.total;
                })
                .catch(response => {
                    this.loading = false;
                });
        },
        handleCurrentChange(val) {
            console.log(val);
            this.formInline.page = val;
            this.onSubmit();
        },
        //角色禁用
        handleDisable(id, type) {
            var title = "";
            type == "0"
                ? (title = "确定要禁用此角色吗?")
                : (title = "确定要启用此角色吗?");
            this.$confirm(title, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    API_Role_Disable({
                        roleid: id,
                        status: type
                    })
                        .then(response => {
                            this.onSubmit();
                            console.log(response);
                            this.$message({
                                type: "success",
                                message: "操作成功!"
                            });
                        })
                        .catch(response => {});
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消"
                    });
                });
        },
        //角色跳转
        handleEdit(id) {
            this.$router.push({
                //核心语句
                path: "/addRole", //跳转的路径
                query: {
                    id: id
                }
            });
        }
    }
};
</script>
<style>
.box {
    padding: 20px;
}
</style>

