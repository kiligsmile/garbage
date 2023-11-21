let db = wx.cloud.database()
let app = getApp()
Page({
  data: {
    isLogin: app.globalData.isLogin,
    // isLogin: false,
    userIndex: -1,
    userInfo: {},
    list: [ {
      src: "/static/image/cylj.png",
      type: "cylj"
    }, {
      src: "/static/image/glj.png",
      type: "glj"
    }, {
      src: "/static/image/khsw.png",
      type: "khsw"
    }, {
      src: "/static/image/qtlj.png",
      type: "qtlj"
    }, {
      src: "/static/image/yflj.png",
      type: "yflj"
    }, {
      src: "/static/image/yhlj.png",
      type: "yhlj"
    }],
    topNavStyle: {
      style: ''
    }
  },
  onLoad(options) {
    if (app.globalData.isLogin) {
      this.setData({
        isLogin: true
      })
      this.setData({
        userInfo: app.globalData.userInfo,
      })
      // this.getRanking()
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
    let shareOption = wx.getLaunchOptionsSync()
    if (shareOption.scene === 1001 || shareOption.scene === 1007) {
      let {
        OPENID
      } = options
      this.loadShareOther(OPENID)
    }
    this.setData({
      isLogin: app.globalData.isLogin
    })
  },
  loadShareOther(OPENID) {
    wx.cloud.callFunction({
      name: "db",
      data: {
        $url: "shareOther",
        otherOPENID: OPENID
      }
    }).then(res => {
      let result = res.result
      if (result.code) {}
    })
  },
  onPageScroll(e) {
    let pageScrollTop = Math.floor(e.scrollTop);
    let r = pageScrollTop / 100;
    this.setData({
      topNavStyle: {
        style: `background-color: rgba(66, 185, 131,${r>=1?1:r});`
      }
    })
  },
  cardClick(e) {
    let type = e.detail.type
    wx.navigateTo({
      url: `/pages/detail/detail?type=${type}`
    })
  }
})

