import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {  
        profile:{},  //用于存储登录用户的简档信息
        equInfo:{},   //用于存储当前查看的设备的一些基础信息，如 sn,equId,equType
        pollingData:{},  //巡检详情数据
        repairData:{},    //维修任务详情数据
        ventilationData:{}, //通气任务详情数据
        dispatchBillData:{}, //送货任务详情数据
    },
    //同计算属性一样
    Getters:{
    },
    //提供修改store值的地方
    mutations: {  
        setBaseInfo(state,pro_obj){
            state.profile = pro_obj 
        },
        setEquInfo(state,equ_obj){
            state.equInfo = equ_obj
        },
        setPollingDetails(state,polling){
            state.pollingData = polling
        },
        setRepairDetails(state,repair){
            state.repairData = repair
        },
        setVentilationDetails(state,ventilation){
            state.ventilationData = ventilation
        },
        setDispatchBillDetails(state,dispatchBill){
            state.dispatchBillData = dispatchBill
        }
    },
    Action:{ 
    },
    Module:{  
    }
})

export default store ; 