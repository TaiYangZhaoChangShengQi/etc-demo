<template>
    <div class="CarBody">
        <div class="Car-1">

            <div class="Car-1-1">当前：{{PageName}}</div>
        </div>
        <div class="Car-2">
            <el-table
                    :data="tableData.filter(data => !search || data.LicensePlate.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        prop="CarNum">
                </el-table-column>
                <el-table-column
                        sortable
                        label="车牌"
                        prop="LicensePlate">
                </el-table-column>
                <el-table-column
                        sortable
                        label="OBU ID"
                        prop="ObuID">
                </el-table-column>
                <el-table-column
                        label="开始时间"
                        prop="startTime">
                </el-table-column>
                <el-table-column
                        label="结束时间"
                        prop="endTime">
                </el-table-column>
                <el-table-column
                        label="识别次数"
                        prop="discernTime">
                </el-table-column>
                <el-table-column
                        sortable
                        label="识别站点"
                        prop="discernSite">
                </el-table-column>
                <el-table-column
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="warning"
                                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button
                                size="small"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CarInfoRecord",
        data(){
            return{
                PageName:'车辆信息记录',
                tableData: [{
                    CarNum: '1-01-1-1',
                    LicensePlate: '粤A·68688',
                    ObuID: 'E51DD2B624748B00A6AA09FCBB93CCAFF2C07EF7',
                    startTime:'2022年9月1日18:30:54',
                    endTime:'2022年9月1日18:31:19',
                    discernTime:'90',
                    discernSite:'站点01'
                }, {
                    CarNum: '1-01-1-1',
                    LicensePlate: '粤B·68688',
                    ObuID: 'E51DD2B624748B00A6AA09FCBB93CCAFF2C07EF7',
                    startTime:'2022年9月1日18:30:54',
                    endTime:'2022年9月1日18:31:19',
                    discernTime:'90',
                    discernSite:'站点02'
                }, {
                    CarNum: '1-01-1-1',
                    LicensePlate: '浙A·68218',
                    ObuID: 'E51DD2B624748B00A6AA09FCBB93CCAFF2C07EF7',
                    startTime:'2022年9月1日18:30:54',
                    endTime:'2022年9月1日18:31:19',
                    discernTime:'90',
                    discernSite:'站点03'
                }, {
                    CarNum: '1-01-1-1',
                    LicensePlate: '鲁A·32688',
                    ObuID: 'E51DD2B624748B00A6AA09FCBB93CCAFF2C07EF7',
                    startTime:'2022年9月1日18:30:54',
                    endTime:'2022年9月1日18:31:19',
                    discernTime:'90',
                    discernSite:'站点04'
                }],
                search: ''
            }
        }
    }
</script>

<style scoped>
.CarBody {

    width: 100%;
    height: auto;

}
    .Car-1 {
        display: flex;
        flex-direction: row-reverse;
    }
    .Car-1-1 {

    }
    .Car-2 {
        margin-top: 30px;
        box-shadow:  0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
</style>