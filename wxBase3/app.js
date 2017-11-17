const openIdUrl = require('./config').openIdUrl
var api = require("util/api.js")
App({
  onLaunch: function () {
    //调用应用实例的方法获取全局数据  
    wx.getUserInfo({
      success: function (res) {
        try {
          wx.setStorageSync('userInfo', res.userInfo)
        } catch (e) {
        }
      }
    })
  },
  onShow: function () {
    //console.log('App Show')
  },
  onHide: function () {
    //console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null
  },
  // lazy loading openid
  getUserOpenId: function(callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function(data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function(err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})