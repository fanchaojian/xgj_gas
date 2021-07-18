<template>
	<div v-loading="dataLoading" >
		<svg :style="{width: SvgSize, height: SvgSize, fontSize: FontSize+'px', backgroundColor: 'white'}" @click="click($event)">
			<circle v-for="mr in Marks" :cx="c" :cy="c" :r="mr" fill="transparent" :stroke="color" :stroke-width="LineW" />
			<line v-for="ma in TimeMarks" :x1="c" :y1="c" :x2="c+Math.sin(ma)*r" :y2="c-Math.cos(ma)*r" :fill="color" :stroke="color" :stroke-width="LineW" />
			<text v-for="(mr, index) in Marks" :x="c+FontSize*.12232" :y="c-mr+FontSize/3" :fill="color">{{MarkTexts[index]}}</text>
			<text v-for="(ma, index) in TimeMarks" :x="c+Math.sin(ma)*TimeTextR-FontSize*0.6" :y="c-Math.cos(ma)*TimeTextR+FontSize/3" :fill="color">{{timeMarkText(ma, index)}}</text>

			<circle v-for="p in chartData" :cx="p.x" :cy="p.y" :r="LineW" :fill="LineColor" :stroke="LineColor" :stroke-width="LineW/3" />
			<line v-for="(p, pi) in chartData" v-if="pi>0" :x1="p.x" :y1="p.y" :x2="chartData[pi-1].x" :y2="chartData[pi-1].y" :stroke="LineColor" :stroke-width="LineW/3" />
			<circle v-if="p===show" v-for="p in chartData" :cx="p.x" :cy="p.y" :fill="selectColor" :r="pointR" />
			<text v-if="show" :y="25" :x="kuan/16" :fill="color">{{"时间:"+show.time2+"选中值:"+show.value}}</text>
			
		</svg>

	</div> 
</template>

<script>
	import { ChartDataProcessor } from '@/ChartDataProcessor.js';
	let processor = new ChartDataProcessor();

	let Pi2 = Math.PI * 2,
		selectColor = "red",
		color = 'black', //2pai
		SvgSize = 340, //画布整体尺寸
		FontSize = 16, //字体大小
		LineW = 1, //线条粗细
		LineColor = "#3366cc",
		MarksCount = 5, //垂直刻度个数
		TimeMarkCount = 24, //时间刻度个数
		Factor = 10, //曲线平滑度，越大越平滑
		daysCount = 1; //默认天数，实际天数从数据计算

	function initData() {
		return {
			kuan: document.documentElement.clientWidth,
			chartData: [],
			LineColor,
			color,
			selectColor,
			SvgSize,
			MarksCount,
			Factor,
			LineW,
			FontSize,
			TimeMarkCount0: TimeMarkCount,
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
			TimeMarkTexts: [],
			MarkLines: [],
			show: null,
			//============================fanchaojian 2020-5-20 modify
			//绘制图表必要选项
			sn:"",
			startTime: new Date().DateToString(),
			endTime: new Date().AddDays(+1).DateToString(),
			dataMax: 0,
			dataMin: 0,
			current: 0, //当前值
			maxV: "",
			minV: 0,
			fixedTime:true ,
			d:[] ,
			dataLoading:true
		};
	}

	export default {
		name: 'ClockChart',
		data() {
			return initData();
		},
		computed: {
			c() { //画布中心
				return this.SvgSize / 2;
			},
			SvgMargin() { //画布与外圈的间距
				return this.FontSize * 4;
			},
			r() { //外圈半径
				return this.c - this.SvgMargin;
			},
			TimeTextR() { //时间刻度半径
				return this.r + this.FontSize;
			},
			pointR() { //选中显示点的半径
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
			//从vuex中获取关键信息并获取数据
			getChartData(){
				var _this = this ; 
				_this.$request({
					url:"/xgjSquareFigure.gatherdata.do",
					params:{
						gatherSn:_this.sn,
						beginTime:_this.startTime,
						endTime:_this.endTime
					},
					method:"get",
				},res => {
					console.log(res) ; 
					_this.dataMax = 0;
					_this.dataMin = 0;
					_this.current = 0;
					if (res.data.msgs.length == 0) {
						_this.d = [];
						_this.maxV = res.data.pressurelimit;
					} else {
						_this.d = res.data.msgs;
						//						this.minV=res.data.pressureMin;
						_this.maxV = res.data.pressurelimit;
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

					_this.$emit("setPreApex",_this.dataMax,_this.dataMin) ; 
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
					type: 'clock'
				}) ; 
			},
			timeMarkText(ma, index) {
				let per = this.timeMarkCountPerDay;
				return(per < 1 || index % per === 0) ? (index / per + 1) + "天" : ((index % per) * (24 / per))
			},
			click(ev) {
				processor.click({
					mx: ev.offsetX,
					my: ev.offsetY,
					vm: this
				})
			}
		},
	}
</script>

<style scoped>

</style>