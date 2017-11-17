var api = require('../../util/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartInfo: [],
    imgUrl: api.imgUrl,
    total: 0,
    name:'',
    mobile:''
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
    try {
      var value = wx.getStorageSync('curriculum');
      if (value == '') {

      } else {
        if (value) {
          that.setData({
            cartInfo: value.info
          })
        }
        var total = 0;
        var cartInfo = that.data.cartInfo;
        for (var i = 0; i < cartInfo.length; i++) {
          total = total + cartInfo[i].num * cartInfo[i].price;
        }
        that.setData({
          total: total
        })
      }

    } catch (e) {
    }
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
  inName:function(e){
    var that = this;
    that.setData({
      name: e.detail.value
    })
  },
  inMobile: function (e) {
    var that = this
    that.setData({
      mobile: e.detail.value
    })
  },
  /**
   * 去支付
   */
  toPay:function(){
    var that = this;
    var name = that.data.name;
    var mobile = that.data.mobile;
    if(name.trim() == '' || mobile.trim() == ''){
      wx.showModal({
        title: '提示',
        content: '请完善您的信息!',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {

          } else if (res.cancel) {
            
          }
        }
      })
    }
  }
})