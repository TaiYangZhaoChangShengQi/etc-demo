import {reactive} from "vue";

export  const store = reactive({
    data: [
        {
            label: '区域01 ',
            num:'1',
            GPS:'22.674574, 113.993353',
            info:'',
            children: [{
                label: '站点 1-1',
                num:'1',
                SiteNum:'1-1',
                region: '上海市普陀区金沙江路 1516 弄',
                info:'',
                children: [{
                    label: '设备 1-1-1'
                }]
            },{
                label: '站点 1-2',
                num:'1',
                SiteNum:'1-2',
                region: '上海市普陀区金沙江路 1516 弄',
                info:'',
                children: [{
                    label: '设备 1-1-1'
                }]
            }]
        },  {
            label: '区域02 ',
            num:'2',
            GPS:'22.674574, 113.993353',
            info:'',
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
            num:'3',
            GPS:'22.674574, 113.993353',
            info:'',
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
    search:'',
    addSite(num,item){ //index1 区域 传num，
        let num1 = Number(num)
        this.data[num1-1].children.push(item)
    },
})