var api = require("../../util/api.js")
var array = require("../../util/array.js")
// product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagesize: 8,
    page: 1,
    imgUrl: api.imgUrl,
    projectList:[]
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
    //项目列表
    api.projectList({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          projectList: arr
        })
      }
    }, 4, 1);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this;
    that.setData({
      page:1,
      noData: 'hidden'
    })
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
    var that = this;
    var pagesize = that.data.pagesize;
    var page = that.data.page + 1;
    that.setData({
      page: page
    });
    //加载产品列表(分页)
    api.projectList({
      success: (res) => {
        var arr = res.data.data;
        var projectList = that.data.projectList;
        for (var i = 0; i < arr.length; i++) {
          projectList.push(arr[i]);
        }
        that.setData({
          projectList: projectList
        })
      }
    }, pagesize, page);
  },
  //产品详情
  navigate: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../projectDetail/projectDetail?product_id=' + id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})