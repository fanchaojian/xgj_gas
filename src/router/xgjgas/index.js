//主页
import gasHome from '@/views/xgjgas/home.vue'
//报警信息
import warning from '@/views/xgjgas/Warning.vue'
//报警信息2
import warningHistory from '@/views/xgjgas/WarningHistory.vue'
//调压箱列表
import equipment from '@/views/xgjgas/Equipment.vue'
//调压箱各指标历史
import equipmentDetails from '@/views/xgjgas/EquipmentDetails.vue'
//反馈信息
import feedback from '@/views/xgjgas/Feedback.vue'
//反馈信息结果
import feedbackResult from '@/views/xgjgas/FeedbackResult.vue'
//历史数据
import historyInfo from '@/views/xgjgas/HistoryInfo.vue'
//历史数据详情历史
import historyInfoDetails from '@/views/xgjgas/HistoryInfoDetails.vue'
//简档
import profile from '@/views/xgjgas/Profile.vue'

export let xgjgasRoutes =  [
  {
      path:'/gasHome',
      component:gasHome
  },
  {
      path:'/warning',
      component:warning
  },{
      path:'/warningHistory',
      component:warningHistory
  },{
      path:'/equipment',
      component:equipment
  },{
      path:'/equipmentDetails',
      component:equipmentDetails
  },{
      path:'/feedback',
      component:feedback
  },{
      path:'/feedbackResult',
      component:feedbackResult
  },{
      path:'/historyInfo',
      component:historyInfo
  },{
      path:'/historyInfoDetails',
      component:historyInfoDetails
  },{
      path:'/profile',
      component:profile
  }
]


