var api = require("../../util/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    imgUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'data',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
      }
    })
    //首页图
    api.get_banner({
      success: (res) => {
        if (res.data.code == '10001') {
          that.setData({
            imgUrl: api.hostAddress + res.data.data.image
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //签到
  getPhoneNumber: function (e) {
    var that = this;
    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;
    wx.getStorage({
      key: 'data',
      success: function (res) {
        that.setData({
          user_id: res.data
        })
        //签到
        api.get_sign({
          method: 'POST',
          data: { user_id: that.data.user_id, encryptedData: encryptedData, iv: iv },
          success: (res) => {
            //console.log(res)
            if (res.data.code == '1001') {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../companyInfo/companyInfo',
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../companyInfo/companyInfo',
                    })
                  }
                }
              })
            }

          }
        });



      }
    })
   
  },
})