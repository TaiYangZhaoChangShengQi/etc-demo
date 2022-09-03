<template>
    <div class="SiteBody">
        <div class="site-item-1" >
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="site-item-2">
            <div class="site-item-2-1">
                <div class="site-item-2-1-1">
                    <el-button type="primary">添加区域</el-button>
                </div>
                <div class="site-item-2-1-2">当前：{{PageName}}</div>
            </div>
            <div class="site-item-2-2">
                <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="编号"
                            prop="num">
                    </el-table-column>
                    <el-table-column
                            label="名称"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            label="所属区域"
                            prop="region">
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
                                    @click="handleEdit(scope.$index, scope.row)">修改</el-button>&nbsp;&nbsp;&nbsp;
                            <el-button

                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "SiteMana",
        data(){
            return {
                PageName:'站点管理',
                tableData: [{
                    num: '1-01',
                    name: '站点01',
                    region: '上海市普陀区金沙江路 1518 弄',
                    info:''
                }, {
                    num: '1-02',
                    name: '站点02',
                    region: '上海市普陀区金沙江路 1517 弄',
                    info:''
                }, {
                    num: '1-03',
                    name: '站点03',
                    region: '上海市普陀区金沙江路 1519 弄',
                    info:''
                }, {
                    num: '2-01',
                    name: '站点04',
                    region: '上海市普陀区金沙江路 1516 弄',
                    info:''
                }],
                search: '',
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
                }
            };


            },




        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            }
        }

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
</style>