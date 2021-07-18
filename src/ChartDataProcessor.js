const Pi2 = Math.PI * 2; //2pai

export class ChartDataProcessor {
  constructor() { }

  setup({ vm, type }) {

    this.type = type;

    //-------------时间数据处理-----------------
    let vmd = vm.d; if (!vmd) vmd = []; vm.TimeMarkCount = vm.TimeMarkCount0;
    let points = [], hasData = (vmd.length > 0), StartTime, startTime, endTime;
    if (hasData) {
      vmd.map(p => { points.push(Object.assign({}, p)) });
      let first = points[0], last = points.last();// console.log('first point', first, 'last point', last)//第一个和最后一个
      StartTime = Date.Parse(first.time).Today(); //console.log('StartTime', StartTime)
      startTime = StartTime.getTime(); endTime = Date.Parse(last.time).Today().AddDays2(1).getTime(); //获取开始时间和结束时间
    }
    if (!hasData || vm.fixedTime) {
     // console.log('use fixed time')
      StartTime = Date.Parse(vm.startTime); //console.log('StartTime', StartTime)
      startTime = StartTime.getTime(); endTime = Date.Parse(vm.endTime).getTime();
    }

  //  console.log('starttime', startTime, 'endtime', endTime)
    vm.daysCount = (endTime - startTime) / (Date.SecondsInDay * 1000); //console.log('days count', vm.daysCount);//天数
    if (vm.daysCount > vm.TimeMarkCount) {
      vm.TimeMode = 'm/d';
      vm.daysCount = vm.daysCount - (vm.daysCount % vm.TimeMarkCount) + vm.TimeMarkCount;
      vm.daysPerMark = vm.daysCount / vm.TimeMarkCount;
      endTime = StartTime.AddDays2(vm.daysCount);
      vm.timeMarkCountPerDay = 1 / vm.daysPerMark;
    }//调整天数为刻度的整数倍
    else {
      vm.timeMarkCountPerDay = Math.floor(vm.TimeMarkCount / vm.daysCount);
      if (vm.timeMarkCountPerDay === 1) {
        vm.TimeMode = 'm/d'; vm.TimeMarkCount = vm.daysCount; vm.daysPerMark = 1;
      }
      else { vm.TimeMarkCount = vm.timeMarkCountPerDay * vm.daysCount; }
      vm.daysPerMark = 1 / vm.timeMarkCountPerDay;
    }
    let totalSecs = vm.daysCount * Date.SecondsInDay;//总秒数 
   // console.log('daysPerMark', vm.daysPerMark)
  //  console.log('vm.timeMarkCountPerDay', vm.timeMarkCountPerDay) //每天的时间刻度个数


    //-------------时间刻度计算--------------------
   // console.log('TimeMarkCount', vm.TimeMarkCount)
    if (vm.TimeMode === 'm/d') {
      for (let i = 0; i <= vm.TimeMarkCount; i++) {
        let day = StartTime.AddDays2(i * vm.daysPerMark); //console.log('day', day)
        vm.TimeMarkTexts[i] = (day.getMonth() + 1) + '/' + day.getDate();
      }
    }
    //console.log('TimeMarkTexts', vm.TimeMarkTexts)

    let timeMarkSep; if (type === 'line') timeMarkSep = vm.r.x / vm.TimeMarkCount; else timeMarkSep = Pi2 / vm.TimeMarkCount; //时间刻度间隔
    let TimeMarkCount2 = (type === 'line' ? vm.TimeMarkCount : vm.TimeMarkCount - 1)
    for (let i = 0; i <= TimeMarkCount2; i++) { vm.TimeMarks.push(timeMarkSep * i); }// console.log('TimeMarks', vm.TimeMarks)//时间刻度值
    if (type === 'line') { for (let di = 0; di < vm.daysCount; di++) { vm.daysTexts[di] = StartTime.AddDays2(di).getDate(); }  }//console.log('this.daysTexts', vm.daysTexts)


    //-------------值数据处理-----------------
    let chartData2 = points.map(d => { return { time: (Date.Parse(d.time).getTime() - startTime) / 1000, value: d.pressure, time2: d.time }; }) //将time设置成距离开始时间的秒数

    if (typeof vm.maxV === 'undefined') {
      let max = chartData2.max('value').value, min = chartData2.min('value').value //最大值和最小值
      let diff = max - min, sep = diff / vm.MarksCount, emp = 1; // 刻度间隔，放大倍数
      let sep2 = sep; if (sep2 === 0) sep2 = 5; if (sep2 < 5) {
        while (sep2 < 5) { emp *= 10; sep2 = sep * emp; } //获取三位精度的刻度间隔
        sep2 = Math.floor(sep2 / 10) + 1; emp /= 10; //获取两位精度的刻度间隔
        if (sep2 % 10 > 0) sep2 = sep2 - (sep2 % 10) + 10; // 刻度间隔取整
      }
      else {
        sep2 = Math.floor(sep2) + 1; sep2 -= (sep2 % 10); sep2 += 10;// 刻度间隔取整
      }
      let sepE = sep2, minE = Math.floor(min * emp), maxE = Math.floor(max * emp); //数据放大到整数
      minE -= (minE % sepE); //刻度最小值
      minE -= (sepE * vm.Factor); //进一步降低刻度最小值，将提升曲线的平滑度
      let minDiff = min * emp - minE;//刻度最小值和真实最小值的间距
      let maxE2 = minE + sepE * vm.MarksCount;//刻度最大值
      while (maxE2 < maxE + minDiff) { sepE += 10; maxE2 = minE + sepE * vm.MarksCount; }//通过增加刻度间距增加刻度最大值和真实最大值的间距，保证曲线位于画布中间
      maxE = maxE2;//确定刻度最大值
      vm.min = minE; vm.max = maxE; vm.sep = sepE; vm.emp = emp;//放大值
      let minr = minE / emp, maxr = maxE / emp, sepr = sepE / emp, diffr = maxr - minr;//真实值
      vm.minr = minr; vm.diffr = diffr;
    }
    else {
      let max = vm.maxV, min = vm.minV;
      let diff = max - min, sep = diff / vm.MarksCount, emp = 1;

      vm.min = min; vm.max = max; vm.sep = sep; vm.emp = emp;
      vm.minr = min; vm.diffr = diff;
        console.log('vm.min, vm.max', vm.min, vm.max,vm.minr,vm.diffr)
    }


    chartData2.map((p, index) => {
      if (type === 'clock') {

        //p.value = -9 //p.value = (index % 2 === 0 ? 295.9 : 295.8);
        let ang = Pi2 * p.time / totalSecs; p.ang = ang; //点的角度
        let vr = (p.value - vm.minr) * vm.r / vm.diffr; p.vr = vr;//点的半径
        let vrt = vr + vm.FontSize; p.vrt = vrt; //点标签的半径 
        p.x = vm.c + Math.sin(ang) * vr; p.y = vm.c - Math.cos(ang) * vr; //点的位置
        p.xt = vm.c + Math.sin(ang) * vrt; p.yt = vm.c - Math.cos(ang) * vrt; //点标签的位置

      } else if (type === 'line') {

        //p.value = -9 //p.value = (index % 2 === 0 ? 295.9 : 295.8);
        let x = vm.r.x * p.time / totalSecs; p.x = x + vm.c.x; //点x
        let y = (p.value - vm.minr) * vm.r.y / vm.diffr; p.y = vm.c.y - y;//点y
        p.yt = p.y + vm.FontSize; //点标签y

      }
    })


    //-------------值刻度计算--------------------
    let markSepPx; if (type === 'line') markSepPx = vm.r.y / vm.MarksCount; else markSepPx = vm.r / vm.MarksCount;//刻度间距像素值
    for (let i = 0; i < vm.MarksCount; i++) { vm.Marks.push(markSepPx * (i + 1)) }// console.log('Marks', vm.Marks) //刻度线
    vm.MarkTexts = vm.Marks.map((mc, index) => { return ((vm.min + vm.sep * (index + 1)) / vm.emp).FloatToString() });//刻度文字
   // console.log('vm.MarkTexts', vm.MarkTexts)
    vm.MarkTextMax = vm.MarkTexts.map(t => t.length).max().value;//刻度文字最大长度
    vm.MarkTextLeft = vm.MarkTexts.map(t => vm.MarkTextMax - t.length);//刻度文字左边距

    vm.chartData = chartData2;// console.log('chartData', vm.chartData)

  }

  click({ mx, my, vm }) {
    if (vm.d.length === 0) return;
    if (this.type === 'line') {
      let first = vm.chartData[0], last = vm.chartData.last();
      if (mx <= first.x) vm.show = first; else if (mx >= last.x) vm.show = last; else { let p = null; vm.chartData.map(p2 => { if (!p && p2.x >= mx) p = p2; }); console.log('show', p); vm.show = p; }//根据角度查找选中的点, 设置选中点

    } else {

      let y = mx - vm.c, x = my - vm.c, ang;//点击位置和角度
      if (x === 0) { ang = (y >= 0 ? 0 : -Pi2 / 2) } else ang = -Math.atan(y / x); if (x > 0) ang = ang + Pi2 / 2; else if (y < 0) ang += Pi2;//点击角度计算
      let p = null; vm.chartData.map(p2 => { if (!p && p2.ang >= ang) p = p2; }) //根据角度查找选中的点
      if (!p) p = vm.chartData.last();
      vm.show = p;//设置选中点

    }

  }
}