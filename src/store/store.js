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
                    label: '设备 1-1-1',
                    SiteLabel:'站点 1-1',
                    DevNum:'1-1-1',
                    DevIP:'192.168.0.1',
                    MAC:'00-01-6C-06-A6-12',
                    DevType:'',
                    DevBeat:'',
                    info:'',
                }]
            },{
                label: '站点 1-2',
                num:'1',
                SiteNum:'1-2',
                region: '上海市普陀区金沙江路 1516 弄',
                info:'',
                children: [{
                    label: '设备 1-2-2',
                    SiteLabel:'站点 1-2',
                    DevNum:'1-2-2',
                    DevIP:'192.168.0.1',
                    MAC:'00-01-6C-06-A6-12',
                    DevType:'',
                    DevBeat:'',
                    info:'',
                }]
            }]
        },  {
            label: '区域02 ',
            num:'2',
            GPS:'22.674574, 113.993353',
            info:'',
            children: [{
                label: '站点 2-1',
                num:'2',
                SiteNum:'2-1',
                region: '上海市普陀区金沙江路 1516 弄',
                info:'',
                children: [{
                    label: '设备 2-1-1',
                    SiteLabel:'站点 2-1',
                    DevNum:'2-1-1',
                    DevIP:'192.168.0.1',
                    MAC:'00-01-6C-06-A6-12',
                    DevType:'',
                    DevBeat:'',
                    info:'',
                }]
            }]
        }, {
            label: '区域03 ',
            num:'3',
            GPS:'22.674574, 113.993353',
            info:'',
            children: [{
                label: '站点 3-1',
                num:'3',
                SiteNum:'3-1',
                region: '上海市普陀区金沙江路 1516 弄',
                info:'',
                children: [{
                    label: '设备 3-1-1',
                    SiteLabel:'站点 3-1',
                    DevNum:'3-1-1',
                    DevIP:'192.168.0.1',
                    MAC:'00-01-6C-06-A6-12',
                    DevType:'',
                    DevBeat:'',
                    info:'',
                }]
            }]
        }],
    defaultProps: {
        children: 'children',
        label: 'label'
    },
    search:'',
    //插入新站点
    addSite(num,item){ //num 区域编号 传num，
        let num1 = Number(num)
        this.data[num1-1].children.push(item)
    },
    //插入新设备
    addDev(SiteLabel,item){ // 参数1 站点名 ，参数2 保存全部设备信息的对象
        console.log(SiteLabel,item)
        for (let i = 0;i<this.data.length;i++) {
            for (let j = 0;j<this.data[i].children.length;j++) {
                if (this.data[i].children[j].label == SiteLabel){ //站点表的站点名是label，不是SiteLabel
                    this.data[i].children[j].children.push(item)
                }
            }
        }
    }
})