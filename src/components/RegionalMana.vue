<template>
    <div class="Rebody">
        <div class="Rebody-total">
            <div class="Rebody-item-l">
                <el-select v-model="value1" placeholder="请选择当前区域">
                    <el-option
                            v-for="item in store.data"
                            :key="item.num"
                            :label="item.label"
                            :value="item.num">
                    </el-option>
                </el-select>
            </div>
            <div class="Rebody-item">
                <el-button type="primary" @click="dialogAddRegVisible = true" :disabled="ss">添加区域</el-button>
            </div>
            <div class="Rebody-item">
                <el-button type="success" @click="clickRegManaList">列表视图</el-button>
            </div>
            <div class="Rebody-item">
                <el-button type="success" @click="clickMap"  >Map视图</el-button>
            </div>
            <div class="Rebody-item-R">当前页面：{{pageName}}</div>
        </div>
        <div class="routerStyle"><router-view ref="child"></router-view></div>
        <!--    添加区域对话框    -->
        <el-dialog title="添加区域信息" :visible.sync="dialogAddRegVisible">
            <el-form ref="form" :model="addRegForm" label-width="80px">
                <el-form-item label="区域编号">
                    <el-input v-model="addRegForm.num" ></el-input>
                </el-form-item>
                <el-form-item label="区域名称">
                    <el-input v-model="addRegForm.label"></el-input>
                </el-form-item>
                <el-form-item label="区域GPS">
                    <el-input v-model="addRegForm.GPS"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addRegForm.info"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addListReg()">保存</el-button>
                    <el-button @click="dialogAddRegVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import Map from "@/views/QuYu/Map";
    import {store} from "@/store/store";
    import RegManaList from "@/views/QuYu/RegManaList";

    //区域管理
    export default {
        name: "RegionalMana",
        components:{
            Map,
            RegManaList
        },
        data(){
            return {
                store,
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
                ss:true,
                pageName:'区域管理',
                addRegForm:{
                    label: '',
                    num:'',
                    GPS:'',
                    info:'',
                    children:[]
                },
                dialogAddRegVisible:false,
            }
        },
        methods:{
            clickMap(){
                this.$router.push('/RegMana/Map')
                this.ss = true
            },
            clickRegManaList(){
                this.$router.push('/RegMana/RegManaList')
                this.ss = false
            },
            //添加区域
            addListReg(){
                this.store.TrueAddReg(this.addRegForm)
                this.dialogAddRegVisible = false
                this.$refs.child.upRegData()
            }
            //动态控制添加按钮

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