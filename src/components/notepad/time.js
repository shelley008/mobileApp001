
//时间转换
DealDateForWeek(value, flag) {
  var index = new Date(value.substr(0, 4) + '/' + value.substr(4, 2) + '/' + value.substr(6, 2)).getDay();
  if (flag) {
    var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    return weekArray[index];
  } else {
    var weekArray = new Array("(日)", "(一)", "(二)", "(三)", "(四)", "(五)", "(六)");
    return weekArray[index];
  };
};

//时间类别ID
DateTimeByType(DatetimeVal) {
  switch (DatetimeVal) {
    case '今日':
      return 1;
    case '昨日':
      return 1;
    case '本周':
      return 2;
    case '上周':
      return 2;
    case '本月':
      return 3;
    case '上月':
      return 3;
    case '本季':
      return 4;
    case '上季':
      return 4;
    case '本年':
      return 5;
    case '去年':
      return 5;
    default:
      return 1;
  };
}


//获取本周为今年第几周
getWeekNum(now) {
  var totalDays = 0;
  let days = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //判断是否为闰年，针对2月的天数进行计算
  if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
    days[1] = 29
  } else {
    days[1] = 28
  }
  if (now.getMonth() == 0) {
    totalDays = totalDays + now.getDate();
  } else {
    var curMonth = now.getMonth();
    for (var count = 1; count <= curMonth; count++) {
      totalDays = totalDays + days[count - 1];
    }
    totalDays = totalDays + now.getDate();
  }
  //得到第几周
  var week = Math.round(totalDays / 7);
  return week;
}
//格式化时间
formatDate(date){
  if(date < 10){
    date = "0" + date;
  }
  return date;
}

//获取时间数据,TimeData为一个数组，比如TimeData =["今日","昨日","本周","上周","本月","上月","本季","上季","本年","上年"];
getTimeData(TimeData,yesterdayFlag){
  var CalID;
  var CalName;
  var CalPeriod;
  var CalValue;
  var DateStart;
  var DateEnd;
  let timeDataList =[];

  var date = new Date;
  var year = date.getFullYear();
  var month = this.formatDate(date.getMonth() + 1);
  var day = this.formatDate(date.getDate());

  var lastmonth = this.formatDate(date.getMonth());
  //今天
  var today = year.toString() + month.toString() + day.toString();

  //获取上个月最后一天
  var myDate = new Date(year, lastmonth, 0);
  var lastDay = myDate.getDate();
  //获取季度
  var currQuarter = Math.floor((month % 3 == 0 ? (month/3) : (month/3 + 1) ));
  var curSeason = currQuarter;

  //上半年
  let curMonthDay = month + day;
  let aHalfYear;
  let bHalfYear;
  let beginTime;
  let endTime;
  let downBeginTime;
  let downEndTime;

  let seasonBegin;
  let seasonEnd;
  let preSeasonBegin;
  let preSeasonEnd;

  if(curMonthDay <= '0630'){
    aHalfYear = year + "0101" + "-" + year + curMonthDay;
    beginTime = year + "0101";
    endTime = year+curMonthDay;
  }else if( curMonthDay <='1231'){
    aHalfYear = year + "0101" + "-" + year + '0630';
    beginTime = year + "0101";
    endTime = year+"0630";
  }
  //下半年
  if( curMonthDay <= '1231' && curMonthDay >= '0701' ){
    bHalfYear = year + "0701" + "-" + year + curMonthDay
    downBeginTime = year + "0701";
    downEndTime = year+curMonthDay;
  }

  //本季,上季的开始时间-结束时间，上季：截止日要多算一天
  if(curSeason == 1){
    seasonBegin = year+"0101";
    seasonEnd = Number(today);
    preSeasonBegin = (year-1)+ "1001";
    preSeasonEnd = year+ "0101";
  }else if(curSeason == 2){
    seasonBegin = year+"0401";
    seasonEnd = Number(today);
    preSeasonBegin = year+ "0101";
    preSeasonEnd = year+ "0401";
  }else if(curSeason == 3){
    seasonBegin = year+"0701";
    seasonEnd = Number(today);
    preSeasonBegin = year+ "0401";
    preSeasonEnd = year+ "0701";
  }else if(curSeason == 4){
    seasonBegin = year+"1001";
    seasonEnd = Number(today);
    preSeasonBegin = year+ "0701";
    preSeasonEnd = year+ "1001";
  };

  //获取昨天
  var yesterday_milliseconds = date.getTime()-1000*60*60*24;
  var yesterday = new Date();
  yesterday.setTime(yesterday_milliseconds);
  var strMonth = this.formatDate(yesterday.getMonth()+1);
  var strDay = this.formatDate(yesterday.getDate());
  let todayFlag:boolean;

  //截止日到昨天
  if(yesterdayFlag == 1){
    today = yesterday.getFullYear() + strMonth + strDay;
  }else{
    today = year.toString() + month.toString() + day.toString();
  }

  //获取本周开始时间
  var nowDayOfWeek = date.getDay(); //今天本周的第几天
  var weekStartDate = new Date(year, month, day - nowDayOfWeek + 1);
  var weekStartday = weekStartDate.getFullYear().toString() + this.formatDate(weekStartDate.getMonth()).toString() + this.formatDate(weekStartDate.getDate()).toString();
  //获取上周开始与结束时间
  var strWeekStartDate = new Date(year, month, day - nowDayOfWeek - 6);
  var strWeekStartday = strWeekStartDate.getFullYear().toString() + this.formatDate(strWeekStartDate.getMonth()).toString() + this.formatDate(strWeekStartDate.getDate()).toString();
  var strWeekEndDate = new Date(year, month, day - nowDayOfWeek);
  var strWeekEndDay = strWeekEndDate.getFullYear().toString() + this.formatDate(strWeekEndDate.getMonth()).toString() + this.formatDate(strWeekEndDate.getDate()).toString();
  //获取本周为今年第几周
  var currentWeek = this.getWeekNum(date);
  //获取上周为今年第几周
  var strDate = new Date( year-1 , 11, 31);
  var strWeek = currentWeek;
  strWeek = (strWeek = 0 ? this.getWeekNum(strDate): strWeek-1);

  for (var i = 0; i < TimeData.length; i++) {
    switch (TimeData[i]) {
      case "今日":
        CalID = 1;
        CalName = TimeData[i];
        CalValue = today;
        CalPeriod = today;
        DateStart = today;
        DateEnd = today;
        break;
      case "昨日":
        CalID = 1;
        CalName = TimeData[i];
        CalValue = yesterday.getFullYear() + strMonth + strDay;
        CalPeriod = yesterday.getFullYear() + strMonth + strDay;
        DateStart = yesterday.getFullYear() + strMonth + Number(strDay)-1;
        DateEnd = yesterday.getFullYear() + strMonth + strDay;
        break;
      case "本周":
        CalID = 2;
        CalName = TimeData[i];
        CalValue = year.toString() + currentWeek.toString();
        CalPeriod = weekStartday + " - " + today;
        DateStart = weekStartday;
        DateEnd = Number(today);
        break;
      case "上周":
        CalID = 2;
        CalName = TimeData[i];
        CalValue = year.toString() + strWeek.toString();
        CalPeriod = strWeekStartday + " - " + strWeekEndDay;
        DateStart = strWeekStartday;
        DateEnd = strWeekEndDay;
        break;
      case "本月":
        CalID = 3;
        CalName = TimeData[i];
        CalValue = year.toString() + month.toString();
        CalPeriod = year + month + "01 - " + today;
        DateStart = year + month + "01";
        DateEnd = Number(today);
        break;
      case "上月":
        CalID = 3;
        CalName = TimeData[i];
        CalValue = year.toString() + lastmonth.toString();
        CalPeriod = year + lastmonth + "01 - " + year + lastmonth + lastDay;
        DateStart = year + lastmonth + "01";
        DateEnd = year + month + "01";
        break;
      case "本季":
        CalID = 4;
        CalName = TimeData[i];
        CalValue = year + "0" + currQuarter;
        CalPeriod = "第" + currQuarter + "季度";
        DateStart = seasonBegin;
        DateEnd = seasonEnd;
        break;
      case "上季":
        CalID = 4;
        CalName = TimeData[i];
        CalValue = ((currQuarter==1)?(year-1):(year)) + "0" + ((currQuarter==1)?(4):(currQuarter-1));
        CalPeriod = "第" + ((currQuarter==1)?(4):(currQuarter-1)) + "季度";
        DateStart = preSeasonBegin;
        DateEnd = preSeasonEnd;
        break;
      case "本年":
        CalID = 5;
        CalName = TimeData[i];
        CalValue = year;
        CalPeriod = year + "0101 - " + today;
        DateStart = year + "0101";
        DateEnd =  Number(today);
        break;
      case "上年":
        CalID = 5;
        CalName = TimeData[i];
        CalValue = year-1;
        CalPeriod = (year-1) + "0101 - " + (year-1) + "1231";
        DateStart = (year-1) + "0101";
        DateEnd = year + "0101";
        break;
      case "上半年":
        CalID = 6;
        CalName = TimeData[i];
        CalValue = aHalfYear;
        CalPeriod = aHalfYear;
        DateStart = beginTime;
        DateEnd = endTime;
        break;
      case "下半年":
        CalID = 6;
        CalName = TimeData[i];
        CalValue = bHalfYear;
        CalPeriod = bHalfYear;
        DateStart = downBeginTime;
        DateEnd = downEndTime;
        break;
    }

    timeDataList.push({"CalID":CalID,"CalName":CalName,"CalValue":CalValue,"CalPeriod":CalPeriod,"DateStart":DateStart,"DateEnd":DateEnd});
  };
  // console.log(timeDataList);
  return timeDataList;
}




//时长
export function formatDurationFn(ms){
  if(!ms) return
  var hours = parseInt(ms / (1000 * 60 * 60));
  var minutes = Math.ceil(parseInt(ms % (1000 * 60 * 60)) / (1000 * 60));
  hours = hours == 0 ? '' : `${hours} ${window.vue.$t('common.hours')}`
  minutes = minutes == 0 ? '' : `${minutes} ${window.vue.$t('common.minutes')}`
  return hours + minutes
}

/*
* @method 时长格式化
* @param: {字符串} [ms] 毫秒数 (eg. 36000)
* @return {字符串} 时间字符串 (eg. 01:00)
*/
export function formatDuration2Num(ms){
  if(!ms) return
  var hours = parseInt(ms / (1000 * 60 * 60));
  var minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
  if(hours < 10){
    hours = "0" + hours
  }
  if(minutes < 10){
    minutes = "0" + minutes
  }
  return hours + ':' + minutes
}
