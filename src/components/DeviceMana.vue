<template>
    <div class="DevBody">
        <div class="Dev-1">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="Dev-2">
            <div class="Dev-2-1">
                <div class="Dev-2-1-1"><el-button type="primary"  @click="dialogFormVisible = true">添加设备</el-button></div>
                <div class="Dev-2-1-2">当前：{{PageName}}</div>
            </div>
            <div class="Dev-2-2">
                <el-table
                        :data="tableData.filter(data => !search || data.DeviceName.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="编号"
                            prop="num">
                    </el-table-column>
                    <el-table-column
                            label="设备名称"
                            prop="DeviceName">
                    </el-table-column>
                    <el-table-column
                            label="所属站点"
                            prop="SiteName">
                    </el-table-column>
                    <el-table-column
                            label="IP地址"
                            prop="IP">
                    </el-table-column>
                    <el-table-column
                            label="MAC地址"
                            prop="MAC">
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
                                    placeholder="输入设备名称搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                    size="small"
                                    type="warning"
                                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button
                                    size="small"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>


            <el-dialog title="添加设备" :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="设备名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="绑定站点">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备MAC">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="设备编号">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "DeviceMana",
        data(){
            return{
                dialogFormVisible:false,
                tableData: [{
                    num: '1-01',
                    DeviceName: '设备01',
                    SiteName:'站点01',
                    IP:'192.168.2.1',
                    MAC:'00-01-6C-06-A6-29',
                    info:''
                }, {
                    num: '1-02',
                    DeviceName: '设备02',
                    SiteName:'站点01',
                    IP:'192.168.2.1',
                    MAC:'00-01-6C-06-A6-29',
                    info:''
                }, {
                    num: '1-02',
                    DeviceName: '设备02',
                    SiteName:'站点01',
                    IP:'192.168.2.1',
                    MAC:'00-01-6C-06-A6-29',
                    info:''
                }, {
                    num: '1-02',
                    DeviceName: '设备02',
                    SiteName:'站点01',
                    IP:'192.168.2.1',
                    MAC:'00-01-6C-06-A6-29',
                    info:''
                }],
                data: [
                    {
                        label: '区域01 ',
                        num:'1',
                        GPS:'',
                        children: [{
                            label: '站点 1-1',
                            SiteNum:'1-1',
                            region: '上海市普陀区金沙江路 1516 弄',
                            info:'',
                            children: [{
                                label: '设备 1-1-1'
                            }]
                        },{
                            label: '站点 1-2',
                            SiteNum:'1-2',
                            region: '上海市普陀区金沙江路 1516 弄',
                            info:'',
                            children: [{
                                label: '设备 1-1-1'
                            }]
                        }]
                    },  {
                        label: '区域02 ',
                        num:'1',
                        GPS:'',
                        children: [{
                            label: '站点 2-1',
                            SiteNum:'2-1',
                            region: '上海市普陀区金沙江路 1516 弄',
                            info:'',
                            children: [{
                                label: '设备 1-1-1'
                            }]
                        }]
                    }, {
                        label: '区域03 ',
                        num:'1',
                        GPS:'',
                        children: [{
                            label: '站点 3-1',
                            SiteNum:'3-1',
                            region: '上海市普陀区金沙江路 1516 弄',
                            info:'',
                            children: [{
                                label: '设备 1-1-1'
                            }]
                        }]
                    }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                PageName: '设备管理',
                search:'',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        }
    }
</script>

<style scoped>
.DevBody{
    display: flex;
    width: 100%;
}
    .Dev-1{
        margin-top: 50px;
        margin-right: 15px;
        width: 190px;
        height: 650px;
        box-shadow: 0 12px 24px 5px rgba(0,0,0, .16);
    }
    .Dev-2 {
        width: 90%;
    }
    .Dev-2-1 {
        display: flex;
        margin-bottom: 10px;
        justify-content: space-between;
        width: 100%;
    }
    .Dev-2-1-2 {
        height: 40px;
        line-height: 40px;
    }
    .Dev-2-2 {
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