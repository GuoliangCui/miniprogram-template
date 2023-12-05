// pages/components/slideedit/index.ts
Component({
  options: {
    multipleSlots: true
  },
  lifetimes: {
    attached: function () {
      // this.getSlideWidth()
    },
    ready() {
      this.getSlideWidth()
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: Number,
      value: 0
    },
    optionWidth: {
      type: Number,
      value: 100
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: 500,
    moveStartX: 0,
    moveX: 0,
    ratio: getApp().globalData.ratio
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getSlideWidth() {
      let that = this
      let query = wx.createSelectorQuery().in(this)
      query.select("#slide-con").boundingClientRect().exec((rect: any) => {
        const slideWidth: number = rect[0]?.width;
        that.setData({
          width: slideWidth * that.data.ratio
        })
      })
    },
    onTouchStart(e: any) {
      this.data.moveStartX = e.changedTouches[0].pageX
    },
    onToucheEnd(e: any) {
      const moveEndX = e.changedTouches[0].pageX
      const diff = this.data.moveStartX - moveEndX
      if (diff >= 30) {
        this.setData({ moveX: -(this.data.optionWidth / this.data.ratio) })
      }
      else if (diff < -30) {
        this.setData({ moveX: 0 })
      } else {
        this.setData({ moveX: this.data.moveX })
      }
    },
    back() {
      this.setData({ moveX: 0 })
    }
  }
})
