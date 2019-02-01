<template>
    <div class="box" style="width: 400px;
    padding: 20px;">
        <!-- <span>添加角色</span> -->
        <el-form :model="form" ref="form" :rules="rules" label-width="80px">
            <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="form.rolename"></el-input>
            </el-form-item>
            <div class="block">
                <el-tree
                    ref="tree"
                    :data="data5"
                    show-checkbox
                    node-key="value"
                    @check-change="changess"
                    default-expand-all
                    :default-checked-keys="keys"
                    :expand-on-click-node="false"
                >
                    <span class="custom-tree-node" slot-scope="{  node,data }">
                        <span>{{ data.label }}</span>
                        <span class="wan-tree-permissions" v-if="data.button">
                            <!-- <el-checkbox-group v-model="data.button_name"> -->
                                <el-checkbox
                                    v-for="(item,index) in data.button"
                                    :checked="item.logo == 1"
                                    @change="bchange(data,index)"
                                    :key="index"
                                >{{item.label}}</el-checkbox>
                            <!-- </el-checkbox-group> -->
                            <!-- <span>{{data.button[0].label}}</span> -->
                        </span>
                    </span>
                </el-tree>
            </div>
            <el-button
                type="primary"
                size="small"
                @click="subList('form')"
                style=" margin-top: 20px;"
            >保 存</el-button>
        </el-form>
    </div>
</template>
<style>
.el-button--mini.is-circle {
    padding: 2px;
    border-radius: 3px;
}
.el-button--mini.is-circle {
    margin-left: 1px;
}
.el-tree-node__content {
    height: 40px;
}
.wan-tree-permissions {
    display: inline-block;
}
.wan-tree-permissions .el-checkbox .el-checkbox,
.wan-tree-permissions .el-checkbox + .el-checkbox {
    margin-left: 8px;
}
.wan-tree-permissions .el-checkbox__label {
    padding-left: 5px;
}
/* .el-button{
    background: #f8f8f8;
} */
</style>
<script>
import { API_Role_Details, API_Role_Editor } from "@/fetch/fetchApi";
const cityOptions = ["编辑", "查看"];
export default {
    data() {
        const data = [];
        return {
            dialogFormVisible: false,
            form: {
                rolename: ""
            },
            roleid:'',
            keys:[],
            checkedCities1: ["编辑", "查看"],
            cities: cityOptions,
            data5: JSON.parse(JSON.stringify(data)),
            rules: {
                rolename: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur"
                    }
                ]
            },
        defaultProps: {
          children: 'children',
          label: 'label',
          value:'value'
        }
        };
    },
    mounted() {
        this.roleid = this.$route.query.id
        this.onSubmit();
    },
    methods: {
        //列表查询
        onSubmit() {
            var that = this
            this.loading = true;
            API_Role_Details({
                roleid: that.roleid
            })
                .then(response => {
                    this.loading = false;
                    this.form.rolename = response.data.role.group_name;
                    this.data5 = JSON.parse(
                        JSON.stringify(response.data.list.treelist)
                    );
                    let keysarr = response.data.list.page_name
                    this.keys = response.data.list.page_name
                    console.log(this.keys)
                    console.log(that.$refs.tree)
                    that.$refs.tree.setCheckedKeys(keysarr);//获取已经设置的资源后渲染
                })
                .catch(response => {
                    this.loading = false;
                });
        },
        editor(node, data) {
            this.dialogFormVisible = true;
            const newChild = { id: id++, label: "testtest", children: [] };
            if (!data.children) {
                this.$set(data, "children", []);
            }
            data.children.push(newChild);
        },
        //选择功能模块
        changess(data, checked) {
            console.log(data, checked);
            if (checked) {
                data.logo = 1;
                if (data.children) {
                    let newphone = data.children.map(logo => {
                        return (logo = 1);
                    });
                }
            } else {
                data.logo = 0;
                if (data.children) {
                    let newphone = data.children.map(logo => {
                        return (logo = 0);
                    });
                }
            }
        },
        subList(form) {
            console.log(this.data5);
            this.$refs[form].validate(valid => {
                if (valid) {
                    API_Role_Editor({
                        roleid: this.roleid,
                        role_name: this.form.rolename,
                        role_group: JSON.stringify(this.data5)
                    })
                        .then(response => {
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
        },

        bchange(data, index) {
            console.log(data,index);
            data.button[index].logo == 0
                ? (data.button[index].logo = 1)
                : (data.button[index].logo = 0);
                console.log(data.button[index].label)
        }
        
    }
};
</script>

