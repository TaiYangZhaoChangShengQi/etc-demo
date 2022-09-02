<template>
    <div class="Nav">
        <div class="nav-left"><router-link to="/RegMana">区域管理</router-link></div>
        <div class="nav-left"><router-link to="/SiteMana">站点管理</router-link></div>
        <div class="nav-left"><router-link to="/DeviceMana">设备管理</router-link></div>
        <div class="nav-left"><router-link to="/CarInfoRecord">车辆信息记录</router-link></div>
    </div>
</template>

<script>
    export default {
        name: "Navigation",
        methods:{

        }
    }
</script>

<style scoped>
    .Nav {

        height: 988px;
        width: 182px;
        background-color:#3A3838;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .Nav .nav-left {
        padding-top: 50px;
        text-align: center;
        font-size: 24px;
        color: white;

    }
    a {
        text-decoration: none;
        color: white;
    }

</style>