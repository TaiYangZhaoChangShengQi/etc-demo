<template>
    <div class="Rebody">
        <div class="Rebody-total">
            <div class="Rebody-item-l">
                <el-select v-model="value1" placeholder="请选择当前区域">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="Rebody-item">
                <el-button type="primary">添加区域</el-button>
            </div>
            <div class="Rebody-item">
                <el-button type="success" @click="clickRegManaList">列表视图</el-button>
            </div>
            <div class="Rebody-item">
                <el-button type="success" @click="clickMap">Map视图</el-button>
            </div>
            <div class="Rebody-item-R">当前页面：{{pageName}}</div>
        </div>
        <div class="routerStyle"><router-view></router-view></div>

    </div>
</template>

<script>
    import Map from "@/views/QuYu/Map";

    //区域管理
    export default {
        name: "RegionalMana",
        components:{
            Map
        },
        data(){
            return {
                options:[
                    {
                        value: '选项1',
                        label: '区域01'
                    }, {
                        value: '选项2',
                        label: '区域02'
                    }
                ],
                value1:'',
                pageName:'区域管理'
            }
        },
        methods:{
            clickMap(){
                this.$router.push('/RegMana/Map')
            },
            clickRegManaList(){
                this.$router.push('/RegMana/RegManaList')
            }
        }


    }



</script>

<style scoped>
.Rebody-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
    .Rebody-item-l {
        width: 150px;

    }
    .Rebody-item {
        width: 100px;
    }

    .Rebody-item-R {
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }



</style>