import serviceHome from '@/views/ServicePlatform/home.vue' ; 
import polling from '@/views/ServicePlatform/polling.vue'
import pollingDetails from '@/views/ServicePlatform/pollingDetails.vue'
import repair from '@/views/ServicePlatform/repair.vue'
import repairDetails from '@/views/ServicePlatform/repairDetails.vue'
import ventilation from '@/views/ServicePlatform/ventilation.vue'
import ventilationDetails from '@/views/ServicePlatform/ventilationDetails.vue'
import dispatchBill from '@/views/ServicePlatform/dispatchBill.vue'
import dispatchBillDetails from '@/views/ServicePlatform/dispatchBillDetails.vue'
import signerEquipment from '@/views/ServicePlatform/signerEquipment.vue'
import pollingFinished from '@/views/ServicePlatform/pollingFinished.vue'
import repairFinished from '@/views/ServicePlatform/repairFinished.vue'
import ventilationFinished from '@/views/ServicePlatform/ventilationFinished.vue'
import scrambleTask from '@/views/ServicePlatform/scrambleTask.vue'
import punishMsg from '@/views/ServicePlatform/punishMsg.vue'
import noticeMsg from '@/views/ServicePlatform/noticeMsg.vue'
import taskValue from '@/views/ServicePlatform/taskValue.vue'

export let ServiceRoutes =  [
    {
        path:'/serviceHome',
        component:serviceHome
    },
    {
        path:'/polling',
        name:'polling',
        component:polling,
    },
    {
        path:'/pollingDetails',
        name:'pollingDetails',
        component:pollingDetails
    },
    {
        path:'/pollingFinished',
        name:'pollingFinished',
        component:pollingFinished
    },
    {
        path:'/repair',
        name:'repair',
        component:repair
    },
    {
        path:'/repairDetails',
        name:'repairDetails',
        component:repairDetails
    },
    {
        path:'/repairFinished',
        name:'repairFinished',
        component:repairFinished
    },
    {
        path:'/ventilation',
        name:'ventilation',
        component:ventilation
    },
    {
        path:'/ventilationDetails',
        name:'ventilationDetails',
        component:ventilationDetails
    },
    {
        path:'/ventilationFinished',
        name:'ventilationFinished',
        component:ventilationFinished
    },
    {
        path:'/dispatchBill',
        name:'dispatchBill',
        component:dispatchBill
    },
    {
        path:'/dispatchBillDetails',
        name:'dispatchBillDetails',
        component:dispatchBillDetails
    },
    {
        path:'/signerEquipment',
        component:signerEquipment
    },
    {
        path:'/scrambleTask',
        name:'scrambleTask',
        component:scrambleTask
    },
    {
        path:'/punishMsg',
        name:'punishMsg',
        component:punishMsg
    },
    {
        path:'/noticeMsg',
        name:'noticeMsg',
        component:noticeMsg
    },
    {
        path:'/taskValue',
        name:'taskValue',
        component:taskValue
    }

  ]
  