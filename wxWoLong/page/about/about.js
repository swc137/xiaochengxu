var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var article = `<div class="content-text">
    卧龙菜馆，是一家以苏帮菜为主的餐厅。 餐厅环境很好，餐厅的门面制作的很有特色，以红色为底，白色的字体十分吸引人的眼球，走进餐厅大厅，你就会看见摆放整齐的桌椅，让人感觉十分舒适，地面干净整洁，没有一点垃圾，餐位之间的间距空的很大，让顾客有足够大的空间，餐厅里面还放了几盆盆栽，让顾客们坐在餐厅里面用餐，一点也不觉得单调。 像香脆鸭、茶香鸡、糖醋排骨是其餐厅的特色菜，吃起来十分美味，令人回味无穷。
  </div><div>特色服务：有停车位，提供在线菜单，有包厢。</div>`;
    WxParse.wxParse('article', 'html', article, that, 0);
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
  
  }
})