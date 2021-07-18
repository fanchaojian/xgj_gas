<template>
  <div v-loading="dataLoading">

   <svg :style="{width: SvgWidth, height: SvgHeight, backgroundColor: 'white',  fontSize: FontSize+'px'}" @click="click($event)">
      <line :x1="c.x" :y1="c.y"  :x2="c.x" :y2="SvgMargin.y" :stroke="color" :stroke-width="LineW"/>
      <line :x1="c.x" :y1="c.y"  :x2="c.x+r.x" :y2="c.y" :stroke="color" :stroke-width="LineW"/>

      <text v-if="TimeMode==='m/d'" v-for="(ma, index) in TimeMarks" :x="c.x+ma-FontSize*1" :y="c.y+FontSize"  :fill="color">{{ TimeMarkTexts[index]}}</text>        
      <text v-if="TimeMode==='d/h'" v-for="(ma, index) in TimeMarks" :x="c.x+ma-FontSize*1" :y="c.y+FontSize"  :fill="color">{{ daysTexts[Math.floor(index/timeMarkCountPerDay)]}}/{{((index%timeMarkCountPerDay)*(24/timeMarkCountPerDay))}}</text>  
      <text :x="c.x+r.x-FontSize" :y="c.y+2.3*FontSize" :fill="color">({{TimeMode}})</text>   
      <line v-for="mr in TimeMarks" :x1="c.x+mr" :y1="c.y"  :x2="c.x+mr" :y2="c.y-MarkLineLength" :stroke="color" :stroke-width="LineW"/>

      

      <text v-for="(mr, index) in Marks" :x="c.x-MarkTextMax*FontSize*0.6+FontSize*0.3*MarkTextLeft[index]" :y="c.y-mr+FontSize/3" :fill="color">{{MarkTexts[index]}}</text>
      <line v-for="(mr, index) in Marks" :x1="c.x" :y1="c.y-mr"  :x2="c.x+r.x" :y2="c.y-mr"  :stroke="color" :stroke-width="LineW"></line>

       
      <circle v-for="p in chartData" :cx="p.x" :cy="p.y" :r="LineW"  :fill="LineColor" :stroke="LineColor" :stroke-width="LineW/3"/>
      <line v-for="(p, pi) in chartData" v-if="pi>0" :x1="p.x" :y1="p.y" :x2="chartData[pi-1].x" :y2="chartData[pi-1].y"  :stroke="LineColor" :stroke-width="LineW/3"/>
      <circle v-if="p===show" v-for="p in chartData" :cx="p.x" :cy="p.y" :fill="selectColor" :r="pointR"/>             
      <text v-if="show" :y="25" :x="kuan/16" :fill="color">{{"时间:"+show.time2+" 选中值:"+show.value}}</text>  
			
   </svg>
   
  </div>
</template>

<script>

let Pi2 = Math.PI * 2, selectColor = "red", color = 'black', //2pai
  SvgWidth = 350, SvgHeight = 350, //画布整体尺寸
  FontSize = 16, //字体大小
  LineW = 1, //线条粗细
  MarkLineLength = 5,
  LineColor="#3366cc",
  MarksCount = 5, //垂直刻度个数
  TimeMarkCount = 6, //时间刻度个数
  Factor = 6, //曲线平滑度，越大越平滑
  daysCount = 1;//默认天数，实际天数从数据计算

function initData() {
  return { 
    kuan: document.documentElement.clientWidth, 
    LineColor,
    chartData: [], 
    color, 
    selectColor, 
    SvgWidth, 
    SvgHeight, 
    MarksCount, 
    Factor, 
    LineW, 
    MarkLineLength, 
    FontSize, 
    TimeMarkCount0: 
    TimeMarkCount, 
    TimeMarkCount, 
    daysCount, 
    timeMarkCountPerDay: TimeMarkCount / daysCount, 
    min: 0, 
    max: 0, 
    sep: 1, 
    emp: 1, 
    Marks: [], 
    MarkTexts: [], 
    MarkTextMax: 3, 
    MarkTextLeft: [], 
    TimeMarks: [], 
    TimeMode: 'd/h', 
    TimeMarkTexts: [], 
    daysTexts: [], 
    MarkLines: [], 
    show: null ,
    //============================fanchaojian 2020-5-20 modify
    //绘制图表必要选项
    sn:"",
    startTime: new Date().DateToString(),
    endTime: new Date().AddDays(+1).DateToString(),
    dataMax: 0,
    dataMin: 0,
    current: 0, //当前值
    fixedTime:true ,
    d:[],
    dataLoading:false ,
  }
}


import { ChartDataProcessor } from '@/ChartDataProcessor.js'; let processor = new ChartDataProcessor();

export default {
  name: 'LineChart2',
  data() {
    return initData();
  },
  computed: {
    SvgMargin() { //画布与坐标的间距
      return { x: this.FontSize * 3, y: this.FontSize * 3 };
    },
    r() { //坐标尺寸
      return { x: this.SvgWidth - 2 * this.SvgMargin.x, y: this.SvgHeight - 2 * this.SvgMargin.y };
    },
    c() {//坐标原点
      return { x: this.SvgMargin.x, y: this.SvgHeight - this.SvgMargin.y };
    },
    TimeTextR() {//时间刻度y
      return this.c.y + this.FontSize;
    },
    pointR() {//选中显示点的半径
      return this.LineW * 4;
    },
  },
  created() {

  },
  mounted() {
    this.sn = this.$store.state.equInfo.sn ; 
    //获取数据（如果从父级属性中获取，无法保证父级数据更新后图表的内容，由于嵌套组件父组件和子组件生命周期的影响，无法在第一次就获取到数据并加载）
    this.getChartData() ; 

  },
  methods: {
    getChartData(){
      var _this = this ; 
      _this.$request({
        url:"/xgjSquareFigure.gatherdata.do",
        params:{
          gatherSn:_this.sn,
          beginTime:_this.startTime,
          endTime:_this.endTime,
          dataType:4,
        },
        method:"get",
      },res => {
        console.log(res) ; 
        _this.dataMax = 0;
        _this.dataMin = 0;
        _this.current = 0;
        if (res.data.msgs.length == 0) {
          _this.d = [];
        } else {
          _this.d = res.data.msgs;
          var dataArr = [];
          for (let i = 0; i < _this.d.length; i++) {
            dataArr.push(_this.d[i].pressure);
          }
          for (var i in dataArr) {
            _this.current = dataArr[dataArr.length - 1];
          }
          _this.dataMin = Math.min(...dataArr); //最小值
          _this.dataMax = Math.max(...dataArr); //最大值
        }

        _this.$emit("setTempApex",_this.dataMax,_this.dataMin) ; 
        //绘制图表
        _this.drowChart() ; 

        //停止加载动画
        _this.dataLoading = false ; 
      },err => {
        console.log("获取压力数据失败") ;
        console.log(err) ; 
      }) ; 
    },
    drowChart(){
      var _this = this ; 
      processor.setup({
        vm: _this,
        type: 'line'
      }) ; 
    },

    click(ev) { 
      processor.click({ mx: ev.offsetX, my: ev.offsetY, vm: this }) 
    }//点击显示标签
  }
}
</script>

<style scoped>
</style>
