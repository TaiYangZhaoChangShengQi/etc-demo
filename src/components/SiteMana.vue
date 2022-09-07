<template>
    <div class="SiteBody">
        <div class="site-item-1" >
            <el-tree :data="store.data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="site-item-2">
            <div class="site-item-2-1">
                <div class="site-item-2-1-1">
                    <el-button type="primary" @click="dialogFormVisible = true">添加站点</el-button>
                </div>
                <div class="site-item-2-1-2">当前：{{PageName}}
                </div>
            </div>
            <div class="site-item-2-2">
                <el-table
                        :data="SiteData.filter(data => !search || data.label.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="站点编号"
                            prop="SiteNum">
                    </el-table-column>
                    <el-table-column
                            label="站点名称">
                        <template slot-scope="scope">
                            <div>{{scope.row.label}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="所属区域">
                        <template slot-scope="scope">
                            <div>{{scope.row.region}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="备注"
                            prop="info">
                    </el-table-column>

                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入站点名字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                    type="warning"
                                    @click="editData(scope.row.label,scope.row.num)">修改</el-button>&nbsp;&nbsp;&nbsp;
                            <el-button

                                    type="danger"
                                    @click="">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>

        <!-- 添加站点对话框       -->
        <el-dialog title="添加站点" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="绑定区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="区域01" @click="form.num=1"></el-option>
                        <el-option label="区域二" value="区域02" @click="form.num=2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="站点名称">
                    <el-input v-model="form.label"></el-input>
                </el-form-item>

                <el-form-item label="设备编号">
                    <el-input v-model="form.SiteNum"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.info"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(form.num,)">立即创建</el-button>
                    <el-button >取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 修改站点信息对话框       -->
        <el-dialog title="修改站点信息" :visible.sync="dialogChangeVisible">
            <el-form ref="form" :model="SiteForm" label-width="80px">
                <el-form-item label="站点编号">
                    <el-input v-model="SiteForm.SiteNum" disabled></el-input>
                </el-form-item>
                <el-form-item label="站点名称">
                    <el-input v-model="SiteForm.label"></el-input>
                </el-form-item>

                <el-form-item label="所属区域">
                    <el-input v-model="SiteForm.region" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="SiteForm.info"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="BaoCun(SiteForm.num,SiteForm.SiteNum)">保存</el-button>
                    <el-button @click="dialogChangeVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>

</template>

<script>
    import {store} from "@/store/store";

    export default {
        name: "SiteMana",
        data(){
            return {
                store,
                PageName:'站点管理',
                dialogFormVisible:false,    //控制添加站点弹窗
                dialogChangeVisible:false, //控制修改按钮弹窗
                SiteForm:{},//存放修改弹窗表单的数据
                SiteData:[], //存放获取的站点数据，渲染到列表
                search: '',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                form: {
                    label: '',
                    num:'',
                    SiteNum: '',
                    region: '',
                    info: '',
                    children: [],

                }

            }

            },




        methods: {

            //获取store里的数据，存放到组件数据里
            UpData(){
                const data_1 = this.store.data
                let k = 0

                 for (let i = 0;i<data_1.length;i++) {
                     for (let j = 0;j<data_1[i].children.length;j++){
                         this.SiteData[k] = data_1[i].children[j]
                         k++
                     }

                 }


            },
            //添加站点
            onSubmit(num){

                this.store.addSite(num,this.form)
                this.UpData()
            },
            //修改行数据
            editData(label,num){
                console.log(num)
                let num1 = Number(num)
                this.dialogChangeVisible = true
                //跟store里的匹配
                for (let i = 0;i<this.store.data[num1-1].children.length;i++) {
                    if (label == this.store.data[num1-1].children[i].label){
                        let c = JSON.parse(JSON.stringify(this.store.data[num1-1].children[i])) //解决浅拷贝
                        this.SiteForm = c
                    }
                }

            },
            //保存修改
            BaoCun(num,siteNum){
                let num1 = Number(num)
                for (let i = 0;i<this.store.data[num1-1].children.length;i++) {
                    if (siteNum == this.store.data[num1-1].children[i].SiteNum){
                        this.store.data[num1-1].children[i] = this.SiteForm
                    }

                }
                this.UpData() //重新渲染列表
                this.dialogChangeVisible = false
            }

        },
        created() {
            this.UpData()
        },


    }
</script>

<style scoped>
    .SiteBody {
        display: flex;
        width: 100%;
    }
    .site-item-1 {
        margin-top: 50px;
        margin-right: 15px;
        width: 190px;
        height: 650px;
        box-shadow: 0 12px 24px 5px rgba(0,0,0, .16);
    }
    .site-item-2 {
        width: 80%;

    }
    .site-item-2-1{
        display: flex;
        margin-bottom: 10px;
        justify-content: space-between;
        width: 100%;
    }
    .site-item-2-1-2 {
        height: 40px;
        line-height: 40px;
    }
    .site-item-2-2 {
        box-shadow: 0 12px 24px 5px rgba(0,0,0, .16);
    }

    .el-dialog {
        left: 700px;
        top: 200px;
        padding: 5px 50px;
        width: 400px;
        position: absolute;
        background-color: white;
        box-shadow: 0 2px 20px 1px rgb(128,128,128);
        z-index: 20;

    }
    .form .title {
        text-align: center;
    }
</style>