var api = require('../../util/api.js')
// sales.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // items:[],
    // checked:'',
    cartInfo:[],
    imgUrl: api.imgUrl,
    total:0
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
            cartInfo:value.info
          })
        }
        var total = 0;
        var cartInfo = that.data.cartInfo;
        for (var i = 0; i < cartInfo.length; i++) {
            total = total + cartInfo[i].num * cartInfo[i].price; 
        }
        that.setData({
          total:total
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
  // /**
  //  * 勾选课程
  //  */
  // checkChange: function (e) {
  //   var that = this;
  //   var items = this.data.items;
  //   var values = e.detail.value;

  //   var total = 0;
  //   var cartInfo = that.data.cartInfo;
  //   for (var i = 0; i < cartInfo.length; i++) {
  //     for(var j = 0;j<values.length;j++){
  //       if (values[j] == cartInfo[i].id) {
  //         total = total + cartInfo[i].num * cartInfo[i].price;
  //       }
  //     }
  //   }
  //   that.setData({
  //     total:total
  //   })
  // },
  /**
   * 减
   */
  minus:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var cartInfo = that.data.cartInfo;
    if (cartInfo.length != 0){
      for (var i = 0; i < cartInfo.length;i++){
        if(id == cartInfo[i].id){
          if (cartInfo[i].num > 1){
            cartInfo[i].num = cartInfo[i].num - 1;
          }
        }
      }
      that.setData({
        cartInfo: cartInfo
      })
      var detail = {'info': that.data.cartInfo};
      try {
        wx.setStorageSync('curriculum', detail)
      } catch (e) {
      }
    }

    var total = 0;
    var cartInfo = that.data.cartInfo;
    for (var i = 0; i < cartInfo.length; i++) {
      total = total + cartInfo[i].num * cartInfo[i].price;
    }
    that.setData({
      total: total
    })


  },
  /**
   * 加
   */
  add:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var cartInfo = that.data.cartInfo;
    if (cartInfo.length != 0) {
      for (var i = 0; i < cartInfo.length; i++) {
        if (id == cartInfo[i].id) {
          cartInfo[i].num = cartInfo[i].num + 1;
        }
      }
      that.setData({
        cartInfo: cartInfo
      })
      var detail = {'info': that.data.cartInfo};
      try {
        wx.setStorageSync('curriculum', detail)
      } catch (e) {
      }
    }

    var total = 0;
    var cartInfo = that.data.cartInfo;
    for (var i = 0; i < cartInfo.length; i++) {
        total = total + cartInfo[i].num * cartInfo[i].price;
    }
    that.setData({
      total: total
    })


  },
  /**
   * 删除
   */
  detele:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var cartInfo = that.data.cartInfo;
    if (cartInfo.length != 0) {
      for (var i = 0; i < cartInfo.length; i++) {
        if (id == cartInfo[i].id) {
          cartInfo.splice(i,1);
        }
      }
      that.setData({
        cartInfo: cartInfo
      })
      var detail = { 'info': that.data.cartInfo };
      try {
        wx.setStorageSync('curriculum', detail)
      } catch (e) {
      }
    }

    var total = 0;
    var cartInfo = that.data.cartInfo;
    for (var i = 0; i < cartInfo.length; i++) {
      total = total + cartInfo[i].num * cartInfo[i].price;
    }
    that.setData({
      total: total
    })

  },
  /**
   * 去结算
   */
  toBuy:function(){
    var that = this;
    var cartInfo = that.data.cartInfo;
    if(cartInfo.length > 0){
      wx.navigateTo({
        url: '../buy/buy',
      })
    }
  }
})