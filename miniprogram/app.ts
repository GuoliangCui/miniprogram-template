import { UserInfo } from "./service/types/userTypes";


// app.ts
App<IAppOption>({
  globalData: {
    ratio:1,
    user:{} as UserInfo
  },
  onLaunch() {
    // wx.$globalData=123;
    // this.globalData.user.
    let screenWidth = wx.getSystemInfoSync().screenWidth
    //用整个屏幕的px单位 除以 750
    this.globalData.ratio=750 / screenWidth
    // 展示本地存储能力
    console.log( this.globalData.ratio,' this.globalData.ratio');
    

    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

   
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})