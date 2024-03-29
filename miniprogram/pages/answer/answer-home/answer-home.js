let app = getApp()
Page({
  data: {
    isLogin: false,
    userIndex: -1,
    userInfo: {}
  },
  onShow() {
    if (app.globalData.isLogin) {
      this.setData({
        isLogin: true
      })
      this.setData({
        userInfo: app.globalData.userInfo,
      })
      this.getRanking()
    } else {
      wx.showModal({
        title: '提示',
        content: '还未登录，请先登录！',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            // app.$util.switchTabTo("/pages/user/user")
            wx.navigateTo({
              url: '/pages/user/user'
            })
          }
        }
      })
      this.setData({
        isLogin: false
      })
    }
  },
  //获取排名
  getRanking() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: 'getUseRanking'
      }
    }).then(res => {
      let result = res.result
      if (result.code) {
        let {
          userIndex
        } = result.data
        this.setData({
          userIndex
        })
        wx.hideLoading()
      }
    })

  },

  toAnswer(e) {
    let {
      page
    } = e.currentTarget.dataset
    app.$util.navigateTo(`/pages/answer/${page}/${page}`)
  },
  goWrongList() {
    wx.navigateTo({
      url: '/pages/wrongList/wrongList',
    })
  }
})