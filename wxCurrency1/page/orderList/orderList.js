// page/orderList/orderList.js
const api = require('../../util/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:api.imgUrl,
    user_id:'',
    orderList:''
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
        var info = { 'user_id': that.data.user_id };
        api.orderList({
          method: 'POST',
          data: info,
          success: (res) => {
            var arr = res.data.data;
            //console.log(arr.list)
            that.setData({
              orderList:arr.list
            })
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
  //订单详情
  toOrderDetail:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?id='+id,
    })
  },
  //取消订单
  cancelOrder:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var info = {'user_id': that.data.user_id, 'order_no':id,'status':2}
    api.cancelOrder({
      method: 'POST',
      data: info,
      success: (res) => {
        var arr = res.data.data;
        console.log(res)
      }
    })
  }
})