<template>
    <div class="CarBody">
        <div class="Car-1">

            <div class="Car-1-1">当前：{{PageName}}</div>
        </div>
        <div class="Car-2">
            <el-table
                    :data="store.VehicleData.filter(data => !search || data.LicensePlate.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        width="100"
                        prop="CarNum">
                </el-table-column>
                <el-table-column
                        sortable
                        label="车牌"
                        width="100"
                        prop="LicensePlate">
                </el-table-column>
                <el-table-column
                        sortable
                        label="OBU ID"
                        width="200"
                        prop="ObuID">
                </el-table-column>
                <el-table-column
                        label="开始时间"
                        width="170"
                        prop="startTime">
                </el-table-column>
                <el-table-column
                        label="结束时间"
                        width="170"
                        prop="endTime">
                </el-table-column>
                <el-table-column
                        label="识别次数"
                        width="100"
                        prop="discernTime">
                </el-table-column>
                <el-table-column
                        sortable
                        label="识别站点"
                        width="100"
                        prop="discernSite">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="160"
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                placeholder="输入车牌号搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="warning"
                                @click="editVehicleData(scope.row.LicensePlate)">修改</el-button>
                        <el-button
                                size="small"
                                type="danger"
                                @click="VehicleDelete(scope.row.LicensePlate)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

<!--    修改车辆信息对话框             -->
        <el-dialog
                title="提示"
                :visible.sync="dialogVehicleVisible"
                width="30%">
            <el-form ref="form" :model="VehicleForm" label-width="80px">
                <el-form-item label="车辆编号">
                    <el-input v-model="VehicleForm.CarNum" disabled></el-input>
                </el-form-item>

                <el-form-item label="车牌号">
                    <el-input v-model="VehicleForm.LicensePlate" disabled></el-input>
                </el-form-item>

                <el-form-item label="OBU ID">
                    <el-input v-model="VehicleForm.ObuID" ></el-input>
                </el-form-item>

                <el-form-item label="开始时间">
                    <el-input v-model="VehicleForm.startTime" ></el-input>
                </el-form-item>

                <el-form-item label="结束时间">
                    <el-input v-model="VehicleForm.endTime" ></el-input>
                </el-form-item>

                <el-form-item label="识别次数">
                    <el-input v-model="VehicleForm.discernTime" ></el-input>
                </el-form-item>

                <el-form-item label="识别站点">
                    <el-input v-model="VehicleForm.discernSite" ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="VehicleBaoCun(VehicleForm.LicensePlate,VehicleForm)">保存</el-button>
                    <el-button @click="dialogVehicleVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {store} from "@/store/store";

    export default {
        name: "CarInfoRecord",
        data(){
            return{
                PageName:'车辆信息记录',
                dialogVehicleVisible:false,
                store,
                VehicleForm:{},
                search: ''
            }
        },
        methods:{
            //打开修改
            editVehicleData(index1,index2){
                this.dialogVehicleVisible = true
                for ( let i of store.VehicleData) {
                    if (index1 == i.LicensePlate) {
                        let c = JSON.parse(JSON.stringify(i))
                        this.VehicleForm = c
                    }
                }
            },
            //保存修改
            VehicleBaoCun(index1,index2){ // 参数1为车牌号

                for (let i=0;i<this.store.VehicleData.length;i++) {

                    if (this.store.VehicleData[i].LicensePlate == index1) {
                        console.log(index1)
                        this.store.VehicleData[i] = index2
                        console.log(index2)
                    }
                }
                this.dialogVehicleVisible = false
            },
            //删除车辆信息
            VehicleDelete(index1){ //index1 车牌号
                for (let i=0;i<this.store.VehicleData.length;i++) {
                    if (this.store.VehicleData[i].LicensePlate == index1) {
                        this.store.deleteVehicle(i)
                    }
                }
            }
        },
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