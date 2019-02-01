<template>
    <div class="box">
        <div class="block">
            <el-form :inline="true" class="demo-form-inline">
                <el-row type="flex" class="wan-title-box" justify="space-between">
                    <el-col :span="6">
                        <span class="wan-listTitle">权限管理</span>
                    </el-col>
                    <el-col :span="6" align="right">
                        <el-form-item>
                            <el-button
                                size="small"
                                icon="el-icon-plus"
                                type="primary"
                               @click='() => append({id:0})'
                            >添加权限</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-tree
                :data="data5"
                show-checkbox
                node-key="id"
                :expand-on-click-node="false"
            >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button
                            size="mini"
                            icon="el-icon-plus"
                            circle
                            @click="() => append(data)"
                        ></el-button>
                        <el-button
                            icon="el-icon-delete"
                            circle
                            size="mini"
                            @click="() => remove(node, data)"
                        ></el-button>
                        <el-button
                            icon="el-icon-edit"
                            circle
                            size="mini"
                            @click="() => editor(node,data)"
                        ></el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <el-dialog title="添加/编辑菜单" width="420px" :visible.sync="dialogFormVisible"  @close="handleCancle">
            <el-form :model="form" :label-position="labelPosition" ref='editform' :rules='rules'>
                <!--后端页面路由-->
                <el-form-item label="权限名称" :label-width="formLabelWidth" prop='title'>
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="模块" :label-width="formLabelWidth" prop='controller'>
                    <el-input v-model="form.controller" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限值" :label-width="formLabelWidth" prop='action'>
                    <el-input v-model="form.action" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限描述" :label-width="formLabelWidth" prop='des'>
                     <el-input type="textarea" v-model="form.des" autocomplete="off"></el-input>
                </el-form-item>
                <!--前端-->
                <el-form-item label="路由" :label-width="formLabelWidth" prop='path'>
                    <el-input v-model="form.path" autocomplete="off"></el-input>
                </el-form-item>   
                <el-form-item label="路由名称" :label-width="formLabelWidth" prop='name'>
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>  
                <el-form-item label="路由组件" :label-width="formLabelWidth" prop='component'>
                    <el-input v-model="form.component" autocomplete="off"></el-input>
                </el-form-item>                         
                <el-form-item  label="操作列表" :label-width="formLabelWidth">
                    <!--
                    <el-checkbox-group v-model="checkedgroup">
                        <el-checkbox v-for='(item, index) in dynamicTags' :label='item.name' :key='item.name' @change="handleCheckedCitiesChange"></el-checkbox>
                    </el-checkbox-group>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                    >
                    </el-input>
                    -->
                    <template class="buttonBox">
                        <el-input ref='saveTagInput' size="small" style="width:80px" v-model='buttonName' placeholder="name"></el-input> : <el-input size="small" style="width:80px" v-model='buttonLabel' placeholder="label"></el-input>
                    </template>
                    <el-button class="button-new-tag" size="small" @click='addButton'>+ 添加</el-button>
                    <template v-for='(item,index) in dynamicTags'>
                        <el-tag size="medium" closable @close='handleClose(index)'>{{item.name}}:{{item.label}}</el-tag>
                    </template>
                </el-form-item>

                <el-form-item label="icon名称" :label-width="formLabelWidth" prop='icon'>
                    <el-input v-model="form.icon" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click='handleCancle'>取 消</el-button>
                <el-button size="small" type="primary" @click="handleSavepermission">确 定</el-button>
            </div>
        </el-dialog>
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
/* .el-button{
    background: #f8f8f8;
} */
</style>
<script>
let id = 1000;
import {API_GetPermissionList,API_Permission_Savepermission,API_Permission_Detail} from '@/fetch/fetchApi.js'
export default {
    data() {
        const data = [
            {
                id: 1,

                
                label: "一级 1",
                children: [
                    {
                        id: 4,
                        label: "二级 1-1",
                        children: [
                            {
                                id: 9,
                                label: "三级 1-1-1"
                            },
                            {
                                id: 10,
                                label: "三级 1-1-2"
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                label: "一级 2",
                children: [
                    {
                        id: 5,
                        label: "二级 2-1"
                    },
                    {
                        id: 6,
                        label: "二级 2-2"
                    }
                ]
            },
            {
                id: 3,
                label: "一级 3",
                children: [
                    {
                        id: 7,
                        label: "二级 3-1"
                    },
                    {
                        id: 8,
                        label: "二级 3-2"
                    }
                ]
            }
        ];
        return {
            dialogFormVisible: false,
            form: {
                // title: "电视管理",
                // path:'/test',
                // components: 'test',
                // action: 1,
                // des: "电视端管理",
                // icon: "电视icon"
            },
            formLabelWidth: "80px",
            labelPosition: "right",
            data5:[] ,/**权限列表 */
            /**操作列表 */
            dynamicTags: [],
            buttonName: '',
            buttonLabel:'',
            /**dialog*/
            rules:{
                title: [
                    { required: true, message: '请输入权限名称', trigger: 'blur' },
                    
                ],
                path: [
                    { required: true, message: '请输入路径', trigger: 'blur'}
                ],
                action: [
                    { required: true, message: '请输入权限值', trigger: 'blur'}
                ],
                des: [
                    { required: true, message: '请输入权限描述', trigger: 'blur'}
                ]

            }

        };
    },
    mounted(){
      API_GetPermissionList({

      }).then( success =>  {
        console.log(success)
        this.data5 = JSON.parse(JSON.stringify(success.data.list));
      }).catch(err =>{
        console.log(err)
      })
    },
    methods: {
        /**tree*/
        append(data) {
            this.dialogFormVisible = true;
            // 父节点id
            let pid = data.id;
            this.form.pid = pid;
            /*
            const newChild = { id: id++, label: "testtest", children: [] };
            if (!data.children) {
                this.$set(data, "children", []);
            }
            data.children.push(newChild);
            */
        },
        remove(node, data) {
            this.$confirm("确定删除该节点吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "取消"
                });
            });
        },
        editor(node,data) {
            this.dialogFormVisible = true;
            let id = data.id;
            API_Permission_Detail({
                id:id
            }).then(( success ) => {
                console.log(success);
                this.form = success.data.info;
                this.dynamicTags = success.data.info.meta.buttonlist
            }).catch(( error) => {

            })

        },
        /**tag*/
        handleClose(index) {
            this.dynamicTags.splice(index, 1);
        },
        addButton() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
            if(this.buttonLabel && this.buttonLabel){
                    this.dynamicTags.push({
                    name: this.buttonName,
                    label: this.buttonLabel
                })
            }
            else{
                this.$message({
                    message: '按钮名称不能为空',
                    type:'error'
                })
            }
            this.buttonName = '';
            this.buttonLabel = '';
        },
        /** 
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.dynamicTags.push({name:inputValue,status:1});
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        */
        /**
        handleCheckedCitiesChange(){
            console.log(this.dynamicTags)
            console.log(this.checkedgroup)
            var that = this;
            this.dynamicTags.forEach(function(value, index){
                var indexValue = value;
                var name = indexValue.name;
                if( that.checkedgroup.indexOf(name) > -1){
                    indexValue.status = 1;
                }
                else{
                    indexValue.status = 0;
                }
            })
            console.log(this.dynamicTags)
            
        },
        */
        /**取消*/
        handleCancle() {
            this.dialogFormVisible = false;
            this.form = {};
            this.$refs['editform'].resetFields();
        },
        /**提交*/
        handleSavepermission(){
            this.$refs['editform'].validate( (valid) => {
                if( valid ){
                    console.log( '验证通过');
                    this.form.meta = { 
                        title: this.form.title,
                        redirect:'' ,
                        icon: this.form.icon,
                        buttonlist: this.dynamicTags
                    }
                    if(this.form.pid === 0) {
                        this.form.meta.redirect = 'noredirect'
                    }
                    console.log( '提交信息为');
                    console.log(this.form);
                    API_Permission_Savepermission(
                        this.form
                    ).then( ( success ) =>{
                        console.log(success);
                        /**拉取列表*/
                        API_GetPermissionList({
                        }).then( success =>  {
                            console.log(success)
                            this.data5 = JSON.parse(JSON.stringify(success.data.list));
                        }).catch(err =>{
                            console.log(err)
                        })
                        this.form = {};
                        this.dynamicTags = [];
                        this.dialogFormVisible = false;
                        this.$refs['editform'].resetFields();
                    }).catch( (error) => {
                        console.log(error);
                    })
                }
            })
        }
    }
};
</script>

<style scoped>
    .el-tag{
        margin-right: 5px;
    }
</style>


