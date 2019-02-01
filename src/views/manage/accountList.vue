<template>
    <div class="box">
        <span>账号管理</span>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input size="small" v-model="formInline.realname" placeholder="输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select
                    size="small"
                    v-model="formInline.status"
                    :clearable="true"
                    placeholder="选择状态"
                >
                    <el-option label="启用" value="1">启用</el-option>
                    <el-option label="禁用" value="0">禁用</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择角色">
                <el-select
                    size="small"
                    v-model="formInline.role_id"
                    :clearable="true"
                    placeholder="选择角色"
                >
                    <el-option
                        :label="item.group_name"
                        v-for="(item,index) in aroleList"
                        :key="index"
                        :value="item.group_id"
                    >{{item.group_name}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择门店">
                <el-cascader
                    size="small"
                    @change="selectChange"
                    placeholder="选择门店"
                    :options="options"
                    filterable
                    :clearable="true"
                    change-on-select
                ></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="small" @click="isQuery">查看</el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                    size="small"
                    icon="el-icon-plus"
                    type="primary"
                    @click="handleEdit('','1')"
                >添加账号</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="loginname" label="账号" width="180" align="center"></el-table-column>
            <el-table-column prop="realname" label="姓名" width="180" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="role_name" align="center" label="角色"></el-table-column>
            <el-table-column prop="brand_name" align="center" label="品牌"></el-table-column>
            <el-table-column prop="Offlines_name" align="center" label="酒店名称"></el-table-column>
            <el-table-column prop="created_at" align="center" label="创建时间
            "></el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row.uid,'2')">编辑</el-button>
                    <el-button
                        size="small"
                        v-if="scope.row.status == 1"
                        type="danger"
                        @click="handleDisable(scope.row.uid,'0')"
                    >禁用</el-button>
                    <el-button
                        size="small"
                        v-if="scope.row.status == 0"
                        type="primary"
                        @click="handleDisable(scope.row.uid,'1')"
                    >启用</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :title="dialogTitle"
            width="420px"
            @close="beforeClose"
            :visible.sync="dialogFormVisible"
        >
            <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition">
                <el-form-item label="账户" prop="loginname" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.loginname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realname" :label-width="formLabelWidth">
                    <el-input size="small" v-model="form.realname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" prop="phone" label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item size="small" prop="password" label="密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择角色" prop="roleid" :label-width="formLabelWidth">
                    <el-select
                        size="small"
                        v-model="form.roleid"
                        :clearable="true"
                        placeholder="选择角色"
                    >
                        <el-option
                            :label="item.group_name"
                            v-for="(item,index) in aroleList"
                            :key="index"
                            :value="item.group_id"
                        >{{item.group_name}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="linkage" :label-width="formLabelWidth" label="选择地区门店">
                    <el-cascader
                        size="small"
                        v-model="linkage"
                        placeholder="选择门店"
                        :options="options"
                        filterable
                        :clearable="true"
                    ></el-cascader>
                </el-form-item>
                <!-- <el-form-item :label-width="formLabelWidth" label="账号禁用">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="addConfirm('form')">确 定</el-button>
            </div>
        </el-dialog>
        <div class="pageBox">
            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="formInline.per_num"
                layout="total, prev, pager, next"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import {
    API_Account_getAccountList,
    API_Account_Details,
    API_Role_getRoleList,
    API_Account_Editor,
    API_Account_Disable,
    API_GetStoresList
} from "@/fetch/fetchApi";
export default {
    data() {
        return {
            linkage: [],
            dialogTitle: "",
            form: {
                loginname: "",
                password: "",
                phone: "",
                realname: "",
                linkage: "",
                roleid: "",
                account_id: ""
            },
            dialogFormVisible: false,
            // form: {},
            aroleList: [],
            formLabelWidth: "100px",
            labelPosition: "right",
            formInline: {
                page: 1,
                per_num: 10,
                realname: "",
                role_id: "",
                linkage: [],
                status: ""
            },
            rules: {
                loginname: [
                    {
                        required: true,
                        message: "请输入登录账号",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "blur"
                    }
                ],
                realname: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 16,
                        message: "长度在 2 到 16 个字符",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        validator: function(rule, value, callback) {
                            if (
                                /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                                    value
                                ) == false
                            ) {
                                callback(new Error("请输入正确的手机号"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        validator: function(rule, value, callback) {
                            if (/^(\w){6,32}$/.test(value) == false) {
                                callback(
                                    new Error(
                                        "只能输入6-32个字母、数字、下划线"
                                    )
                                );
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur"
                    }
                ],
                roleid: [
                    {
                        required: true,
                        message: "请选择角色",
                        trigger: "change"
                    }
                ],
                linkage: [
                    // {
                    //     required: true,
                    //     message: "请选择门店",
                    //     trigger: "change"
                    // },
                    // {
                    //     validator: function(rule, value, callback) {
                    //         if (value.length < 1) {
                    //             callback(new Error("请选择酒店"));
                    //         } else {
                    //             callback();
                    //         }
                    //     },
                    //     trigger: "change"
                    // }
                ]
            },
            options: [],
            total: 0,
            tableData: [],
            loading: false,
            addadmin: {}
        };
    },
    mounted() {
        //列表查询
        this.onSubmit();

        //角色列表
        API_Role_getRoleList({})
            .then(response => {
                this.aroleList = response.data.data;
            })
            .catch(response => {});

        //门店信息
        API_GetStoresList({})
            .then(response => {
                console.log(response.data);
                this.options = response.data;
            })
            .catch(response => {});
    },
    methods: {
        //列表查询
        onSubmit() {
            this.loading = true;
            
            API_Account_getAccountList(this.formInline)
                .then(response => {
                    this.loading = false;
                    this.tableData = response.data.data;
                    this.total = response.data.total;
                })
                .catch(response => {
                    this.loading = false;
                });
        },
        //账号禁用
        handleDisable(id, type) {
            var title = "";
            type == "0"
                ? (title = "确定要禁用此账号吗?")
                : (title = "确定要启用此账号吗?");
            this.$confirm(title, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    API_Account_Disable({
                        account_id: id,
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
        handleCurrentChange(val) {
            console.log(val);
            this.formInline.page = val;
            this.onSubmit();
        },
        isQuery(){
            this.formInline.page = 1
            this.onSubmit();
        },

        //账号编辑
        handleEdit(id, title) {
            title == 1
                ? (this.dialogTitle = "添加管理员账号")
                : (this.dialogTitle = "账号编辑");
            this.form.account_id = id;
            API_Account_Details({
                account_id: id
            })
                .then(response => {
                    console.log(response);
                    // this.form = response.data[0];
                    this.form.loginname = response.data[0].loginname;
                    this.form.password = response.data[0].password;
                    this.form.phone = response.data[0].phone;
                    this.form.realname = response.data[0].realname;
                    this.form.roleid = response.data[0].roleid;
                    this.form.account_id = response.data[0].uid;
                    let linkage = [];
                    linkage.push(response.data[0].partnerid);
                    linkage.push(response.data[0].brandid);
                    linkage.push(response.data[0].offlineid);
                    this.linkage = linkage;
                })
                .catch(response => {
                    this.loading = false;
                });
            this.dialogFormVisible = true;
        },
        //监听弹出层关闭清空数据
        beforeClose() {
            this.form.loginname = "";
            this.form.password = "";
            this.form.phone = "";
            this.form.realname = "";
            this.form.roleid = "";
            this.form.account_id = "";
            this.form.linkage = [];
            this.linkage = [];
            this.dialogFormVisible = false;
            this.$refs['form'].resetFields();
        },

        //酒店选择
        selectChange(e) {
            this.formInline.linkage = e.join(",");
        },
        //酒店选择
        selectChange1(e) {
            this.form.linkage = e.join(",");
        },

        //账号新增修改
        addConfirm(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    let forms = this.form;
                    let linkage = this.linkage.join(",");
                    forms.linkage = linkage;
                    API_Account_Editor(forms)
                        .then(response => {
                            this.beforeClose();
                            this.onSubmit();
                            this.$message({
                                type: "success",
                                message: "操作成功!"
                            });
                        })
                        .catch(response => {
                            this.$message({
                                type: "error",
                                message: response.data.message
                            });
                        });
                } else {
                    return false;
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
.el-cascader--small {
    width: 100%;
}
.el-select {
    width: 100%;
}
</style>

