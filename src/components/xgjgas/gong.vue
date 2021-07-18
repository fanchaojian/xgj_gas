<template>
   <div class="gong">
      <mt-swipe :show-indicators="false" :auto="1200">
         <mt-swipe-item v-if="value.undervoltage!=0">
            <div class="his_con actives">欠压</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.overprescut!=0">
            <div class="his_con actives">超压</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.poweralarm!=0">
            <div class="his_con actives">电源</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.temperature!=0">
            <div class="his_con actives">温度</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.flow!=0">
            <div class="his_con actives">流量</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.hightemperature!=0">
            <div class="his_con actives">高温</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.lowtemperature!=0">
            <div class="his_con actives">低温</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.valveportout!=0">
            <div class="his_con actives">阀口</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.outalarm!=0">
            <div class="his_con actives">泄漏</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.enginealarm!=0">
            <div class="his_con actives">机械</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.earthquakealarm!=0">
            <div class="his_con actives">地震</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.cluthalarm!=0">
            <div class="his_con actives">离合</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.sersoralarm!=0">
            <div class="his_con actives">传感器</div>
         </mt-swipe-item>
         <mt-swipe-item v-if="value.internetalarm!=0">
            <div class="his_con actives">网络</div>
         </mt-swipe-item>
      </mt-swipe>
   </div>
</template>
<script>
export default {
   name: "gong",
   props: ["value"]
};
</script>
<style scoped>
.gong {
   width: 100%;
   height: 100%;
}
.gong .actives {
   background: #cd0404;
   color: white;
   border-radius: 5px;
   line-height: 2rem;
   text-align: center;
}
</style>

