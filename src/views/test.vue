<template>
    <div>
        <!-- <account-list></account-list>
        <configuration-list></configuration-list> -->
        <add-role></add-role>
        <!-- <role-list></role-list> -->
        
        
    </div>
</template>
<script>
    //添加账号
    import accountList from "@/views/manage/accountList"; 

    //角色列表
    import roleList from "@/views/manage/roleList";

    //栏目配置
    import configurationList from "@/views/manage/configurationList";

    //栏目配置
    import addRole from "@/views/manage/addRole";

    export default{
        data(){
            return{

            }
        },
        components:{
            accountList,
            roleList,
            configurationList,
            addRole
        }
    }
</script>
<style>

</style>

