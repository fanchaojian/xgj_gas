// 1. 1999-12-23 19:00:00.123
// 2. 1999-12-23 19:00:00
// 3. 1999-12-23 19:00
// 4. 1999-12-23
// 5. offical datetime text format supported by Date.parse
Date.Parse = function (text) {
  if (!text) return ''; let r = new Date();

  let parts = text.trim().split(" "), p0 = parts[0], isdash = (p0.indexOf('-') > -1), DateParts, Year, Month, Day;

  if (isdash) {
    DateParts = parts[0].split("-");
    Year = parseInt(DateParts[0]); Month = parseInt(DateParts[1]); Day = parseInt(DateParts[2]);
    text = `${Month}/${Day}/${Year} ${parts[1]}`;
  }

  let milliseconds = Date.parse(text); if (!isNaN(milliseconds)) { r.setTime(milliseconds); return r; }

  if (!isdash) {
    DateParts = parts[0].split("/");
    Year = parseInt(DateParts[2]); Month = parseInt(DateParts[0]); Day = parseInt(DateParts[1]);
  }

  r = new Date(Year, Month - 1, Day, 0, 0, 0); r.Year = Year; r.Month = Month; r.Day = Day;
  if (parts.length > 1) {
    let TimeBigParts = parts[1].split("."), TimeParts = TimeBigParts[0].split(":");
    r.Hour = parseInt(TimeParts[0]); r.setHours(r.Hour);
    r.Minute = parseInt(TimeParts[1]); r.setMinutes(r.Minute);
    if (TimeParts.length > 2) { r.Second = parseInt(TimeParts[2]); } else r.Second = 0; r.setSeconds(r.Second);
    if (TimeBigParts.length > 1) r.MilliSecond = parseInt(TimeBigParts[1]); else r.MilliSecond = 0; r.setMilliseconds(r.MilliSecond);
  }
  return r;
};

Date.ParseGetTime = function (text) {
  let r = new Date(), milliseconds = parseFloat(text); r.setTime(milliseconds); return r;
}

// return 1999-12-28 10:09:00
Date.prototype.ToString = function () {
  return this.DateToString() + ' ' + this.TimeToString();
};
Date.prototype.DateToString = function () {
  return this.getFullYear() + "-" + (this.getMonth() + 1).fixedInt(2) + "-" + this.getDate().fixedInt(2);
};
Date.prototype.TimeToString = function (seconds) {
  var r = this.getHours().fixedInt(2) + ":" + this.getMinutes().fixedInt(2); if (seconds === -1) return r;
  r += (":" + this.getSeconds().fixedInt(2));
  if (seconds === 1) return r + "." + this.getMilliseconds().fixedInt(3); else return r;
};
Date.prototype.ToMonthDayString = function () {
  return (this.getMonth() + 1) + "/" + this.getDate();
};


Date.SecondsInDay = 24 * 60 * 60;
Date.SecondsInHour = 60 * 60;

Date.prototype.Today = function () {
  let r = this; return new Date(r.getFullYear(), r.getMonth(), r.getDate());
}

Date.prototype.Yestoday = function () {
  let r = this; return new Date(r.getFullYear(), r.getMonth(), r.getDate() - 1);
}


// return 1999.12.12_01.02.00
Date.prototype.ToFileName = function () {
  return this.getFullYear() + "." + (this.getMonth() + 1).fixedInt(2) + "." + this.getDate().fixedInt(2)
    + "_" + this.getHours().fixedInt(2) + "." + this.getMinutes().fixedInt(2)
    + "." + this.getSeconds().fixedInt(2); //+ "." + this.getMilliseconds().fixedInt(3);
};


//length={hour, min, sec}
Date.SubstractSeconds = function (length, seconds) {
  var r = length.hour * 60 * 60 + length.min * 60 + length.sec - seconds;
  length.sec = r % 60; r -= length.sec; r /= 60;
  length.min = r % 60; r -= length.min; r /= 60;
  length.hour = r;
};



Date.prototype.ParseSeconds = function (seconds) {
  this.TimeLengthInSeconds = parseInt(seconds.toString().split(".")[0]);

  this.TimeLengthHourPart = parseInt((this.TimeLengthInSeconds / 3600).toString().split(".")[0]);
  let remain = this.TimeLengthInSeconds % 3600;
  this.TimeLengthMinutePart = parseInt((remain / 60).toString().split(".")[0]);
  this.TimeLengthSecondPart = (remain % 60);
  if (this.TimeLengthHourPart < 10) this.TimeLengthHourPartText = "0" + this.TimeLengthHourPart.toString();
  else this.TimeLengthHourPartText = this.TimeLengthHourPart.toString();
  if (this.TimeLengthMinutePart < 10) this.TimeLengthMinutePartText = "0" + this.TimeLengthMinutePart.toString();
  else this.TimeLengthMinutePartText = this.TimeLengthMinutePart.toString();
  if (this.TimeLengthSecondPart < 10) this.TimeLengthSecondPartText = "0" + this.TimeLengthSecondPart.toString();
  else this.TimeLengthSecondPartText = this.TimeLengthSecondPart.toString();
  return this.TimeLengthHourPartText + ":" + this.TimeLengthMinutePartText + ":" + this.TimeLengthSecondPartText;
};
Date.prototype.ParseTime = function (TimeLabel) {
  TimeLabel = TimeLabel.toLowerCase();
  let parts = TimeLabel.split(":"), hour = parseInt(parts[0]), min = parts[1];
  if (min.indexOf("am") > -1) min = parseInt(min.split("am")[0]);
  if (min.indexOf("pm") > -1) { hour += 12; min = parseInt(min.split("pm")[0]); } else min = parseInt(min);
  let result = { Hour: hour, Minute: min, Value: hour * 60 + min }; return result;
};
Date.prototype.AddDays = function (DaysCount) {
  this.setDate(this.getDate() + DaysCount); return this;
};
Date.prototype.AddDays2 = function (DaysCount) {
  let r = new Date(); r.setTime(this.getTime()); r.setDate(r.getDate() + DaysCount); return r;
};

Date.prototype.ToStringZh = function () {
  return this.getFullYear() + "???" + this.MonthDayToString() + this.TimeToString();
};
Date.prototype.MonthDayToString = function () {
  return (this.getMonth() + 1) + "???" + this.getDate() + "???";
};
Date.prototype.DayTimeToString = function () {
  return this.getDate() + "???" + this.getHours() + ":" + (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
};
Date.prototype.DayTimeToString2 = function () {
  return this.getDate() + "???" + this.getHours() + "???";
};
Date.prototype.MonthToString = function () {
  return (this.getMonth() + 1) + "???";
};
Date.prototype.YearMonthToString = function () {
  return this.getFullYear() + "???" + (this.getMonth() + 1) + "???";
};

Date.prototype.TimeLengthText = function (seconds) {
  seconds = parseInt(seconds);
  let sec = seconds % 60, min = (seconds - sec) / 60 % 60, hour = (seconds - sec - min * 60) / 3600 % 24;
  let day = (seconds - sec - min * 60 - hour * 3600) / 3600 / 24;
  var r = sec + "???";
  if (min > 0) r = min + "???" + r;
  if (hour > 0) r = hour + "??????" + r;
  if (day > 0) r = day + "???" + r;
  return r;
};
Date.prototype.TimeLengthText2 = function (seconds) {
  seconds = parseInt(seconds);
  let s = seconds % 60, m = (seconds - s) / 60 % 60, h = (seconds - s - m * 60) / 3600 % 24;
  let d = (seconds - s - m * 60 - h * 3600) / 3600 / 24;
  let r = '';
  if (seconds > 3 * 24 * 60 * 60) r = d + "???";
  else if (seconds > 10 * 60 * 60) { if (h > 0) r = h + "??????"; if (d > 0) r = d + "???" + r; }
  else if (seconds > 600) { if (m > 0) r = m + "???"; if (h > 0) r = h + "??????" + r; }
  else { if (s > 0) r = s + "???"; if (m > 0) r = m + "???" + r; }
  return r;
};
Date.prototype.NowDiff = function () {
  let secs = this.NowDiffSeconds(), pre = '?????????'; if (secs < 0) { pre = '??????'; secs = -secs; }
  return pre + this.TimeLengthText2(secs);
};
Date.prototype.NowDiffMonths = function () {
  let now = new Date();
  return now.getMonth() - this.getMonth() + (now.getFullYear() - this.getFullYear()) * 12;
};
Date.prototype.NowDiffDays = function () {
  return parseInt(this.NowDiffHours() / 24);
};
Date.prototype.NowDiffHours = function () {
  return parseInt(this.NowDiffMins() / 60);
};
Date.prototype.NowDiffMins = function () {
  return parseInt(this.NowDiffSeconds() / 60);
};
Date.prototype.NowDiffSeconds = function () {
  let now = new Date().getTime(), d = this.getTime(); return parseInt((now - d) / 1000.0);
};

Date.ProcessHourInput = function (Input) {
  let value = Input.val(); if (value == '') return 0; value = parseInt(value);
  if (isNaN(value) || value < 0) value = 0; else if (value >= 24) value = 23;
  Input.val(value.toString()); return value;
};
Date.ProcessMinuteOrSecondInput = function (Input) {
  let value = Input.val(); if (value == '') return 0; value = parseInt(value);
  if (isNaN(value) || value < 0) value = 0; else if (value >= 60) value = value % 60;
  Input.val(value.toString()); return value;
};
Date.DisplayTime = function (HourInput, MinuteInput) {
  let h = HourInput.val(); if (h == '') h = '0';
  let m = MinuteInput.val(); if (m.length == 0) m = '00'; else if (m.length == 1) m = '0' + m;
  return h + ":" + m;
};
Date.ProcessLastTime = function (HoursInput, MinutesInput) {
  let h = HoursInput.val(), isHEmpty = false; if (h != '') {
    h = parseInt(h); if (isNaN(h) || h < 0) h = 0;
  }
  else { h = 0; isHEmpty = true; }
  let m = MinutesInput.val(), isMEmpty = false; if (m != '') {
    m = parseInt(m); if (isNaN(m)) m = 0;
    else if (m < 0) { if (h > 0) { h--; m = -m; m = m % 60; m = 60 - m; } else { m = -m; } }
    else if (m >= 60) { h += parseInt(m / 60); m = m % 60; isHEmpty = false; }
  }
  else { m = 0; isMEmpty = true; }
  if (!isHEmpty) HoursInput.val(h.toString());
  if (!isMEmpty) MinutesInput.val(m.toString());
  return { Hours: h, Minutes: m };
};

