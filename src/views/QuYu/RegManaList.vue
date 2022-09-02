<template>
    <div class="RegManaList">
        <div class="lsitButton-1">

        </div>
        <div class="lsit-lsit">
            <el-table
                    :data="tableData"
                    max-height="600"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="num"
                        label="编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="GPSaddress"
                        label="GPS">
                </el-table-column>
                <el-table-column
                        prop="info"
                        label="备注">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <el-button type="warning">修改区域</el-button>
                    <el-button type="danger">删除区域</el-button>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    export default {
        name: "RegManaList",
        data(){
            return{
                tableData:[
                    {
                        num:'01',
                        name:'区域01',
                        GPSaddress:'22.674574, 113.993353',
                        info:''
                    },
                    {
                        num:'02',
                        name:'区域02',
                        GPSaddress:'22.674544, 113.993362',
                        info:''
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .RegManaList {
        width: 100%;
        height: 660px;

    }
    .lsitButton-1 {
        padding-top: 10px;
        margin-left: 10px;
    }
</style>