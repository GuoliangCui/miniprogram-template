// pages/components/popcall/index.ts// 
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  observers: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    show: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancelTap() {
      this.close()
    },
  
    onCatchTap() { },
    show() {
      this.setData({
        show: true
      })
      this.triggerEvent("show")
    },
    close() {
      this.setData({
        show: false,
      })
      this.triggerEvent("close")
    }
  }
})
