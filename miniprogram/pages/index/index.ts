// index.ts

import { userService } from "../../service/userService";

// 获取应用实例
Page({
  data: {
    type: 'datetime',
    years: new Array<string>(),
    months: new Array<string>(),
    days: new Array<string>(),
    hours: new Array<string>(),
    minutes: new Array<string>(),
    dateValue: new Array<number>(),
    popShow: false,
    motto: 'Hello World',
    selectValue: [],
    moveList: [
      { id: 1, name: "里卡" },
      { id: 2, name: "里卡" },
      { id: 3, name: "里卡" },
      { id: 4, name: "里卡" },
      { id: 5, name: "里卡" },
      { id: 6, name: "里卡" },
      { id: 7, name: "里卡" }]
  },
  onBtnTap1() {
    this.selectComponent("#popUp1").show()
  },
  onBtnTap2() {
    this.selectComponent("#popUp2").show()
  },
  async onLoad() {
    // debugger
    // const result=await userService.GetUserInfo({name:'123'})
    
    this.initData();
    wx.request({
      url: "http://www.baidu.com",
      method: "GET",
      data: { id: 1, name: 2 },
      success: (res) => {
        console.log(res, 'res');

      }
    })
  },
  onPickerChange(e: any) {
    const value = e.detail.value;
    if (['datetime', 'date'].includes(this.data.type)) {
      if (value[0] != this.data.dateValue[0] && value[1] == 1) {
        //闰年更新2月的天数
        const year = parseInt(this.data.years[value[0]]);
        const dt = new Date(year, 2, 0);
        const monthDays = dt.getDate();
        let days: Array<string> = []
        for (let i = 1; i <= monthDays; i++) {
          days.push(`${i}日`)
        }
        this.setData({
          days
        })
      }
    }
    // const result = this.getValue(value, this.data.type)
  },
  getValue(value: number[], type: string): string {
    const year = this.data.years[value[0]]
    const month = this.data.months[value[1]]
    const date = this.data.days[value[2]]
    let hour = this.data.hours[value[3]]
    let minute = this.data.minutes[value[4]]
    if (type == 'date') {
      return `${year}-${month}-${date}`
    }
    if (type == 'datetime') {
      return `${year}-${month}-${date} ${hour}:${minute}`
    }
    if (type == 'time') {
      hour = this.data.hours[value[0]]
      minute = this.data.minutes[value[1]]
      return `${hour}:${minute}`
    }
    return '';
  },
  initData() {
    let dtNow = new Date();
    const nowYear = dtNow.getFullYear()
    const nowMonth = dtNow.getMonth();
    const monthDays = new Date(nowYear, nowMonth + 1, 0).getDate();
    const nowDate = dtNow.getDate()
    const nowHour = dtNow.getHours()
    const nowMin = dtNow.getMinutes()
    let years: string[] = [];
    let months: string[] = [];
    let days: string[] = [];
    let hours: string[] = [];
    let minutes: string[] = [];
    for (let i = 0; i < 500; i++) {
      const base = i + 1
      years.push(`${1900 + base}年`)
      if (base <= 12) {
        months.push(`${base}月`)
      }
      if (base < monthDays) {
        days.push(`${base}日`)
      }
      if (i < 24) {
        hours.push(`${i}时`)
      }
      if (base <= 60) {
        minutes.push(`${base}分`)
      }
    }
    this.setData({
      years,
      months,
      days,
      hours,
      minutes
    })
    const yearIndex = years.map(item => parseInt(item)).indexOf(nowYear);
    const dateIndex = days.map(item => parseInt(item)).indexOf(nowDate);
    const hourIndex = hours.map(item => parseInt(item)).indexOf(nowHour);
    const minIndex = minutes.map(item => parseInt(item)).indexOf(nowMin);
    let dateValue: number[] = []
    if (this.data.type == 'date') {
      dateValue = [yearIndex, nowMonth, dateIndex];
    }
    if (this.data.type == 'datetime') {
      dateValue = [yearIndex, nowMonth, dateIndex, hourIndex, minIndex];
    }
    if (this.data.type == 'time') {
      dateValue = [hourIndex, minIndex];
    }
    this.setData({
      dateValue: dateValue
    })
  }
})
