// pages/components/popup/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '提示'
    },
    eventClose: {
      type: Boolean,
      value: false
    }
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
    onConfirmTap() {
      this.triggerEvent("confirm", {})
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
