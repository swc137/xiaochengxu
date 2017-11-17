// page/addressChange/addressChange.js
var api = require('../../util/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: '',
    user_id: ''
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
    var info = { 'user_id': '' };
    wx.getStorage({
      key: 'data',
      success: function (res) {
        info['user_id'] = res.data;
        that.setData({
          user_id: res.data
        })
        api.addressList({
          method: 'POST',
          data: info,
          success: (res) => {
            var arr = res.data.data;
            that.setData({
              addressList: arr
            });
          }
        });
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
  /*
   *选择地址
   */
  radioselect: function(e){
    var that = this;
    var address_id = e.detail.value;
    wx.redirectTo({
      url: '../order/order?address_id=' + address_id,
    })
  },
  /**
   * 新建收货地址
   */
  addAddress: function () {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  }
})