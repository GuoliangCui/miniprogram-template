/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    ratio:number,
    user:UserInfo
  },
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}