<template>
    <div class="RegManaList">
        <div class="lsitButton-1">

        </div>
        <div class="lsit-lsit">
            <el-table
                    :data="store.data"
                    max-height="600"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="num"
                        label="编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="label"
                        label="名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="GPS"
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
    import  {store} from "@/store/store";

    export default {
        name: "RegManaList",
        data(){
            return{
                store
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