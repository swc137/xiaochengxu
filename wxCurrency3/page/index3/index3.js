var api = require("../../util/api.js")
var array = require("../../util/array.js")
// index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    imgUrl: api.imgUrl,
    interval:3000,
    duration:1000,
    contentList:''
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
    //轮播图
    api.getBanner({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          imgUrls: array.getBannerByArray(arr, 'image')
        })
      }
    });

    //分类列表
    api.home({
      success: (res) => {
        var arr = res.data.data;
        //console.log(arr)
        that.setData({
          contentList:arr
        })

  
      }
    });

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 切换菜单列表
   */
  changeMenu:function(e){
    var that = this;
    var menuActive = that.data.menuActive;
    var index = e.currentTarget.dataset.index;
    if(index == 0){
      menuActive = [true, false];
    }else{
      menuActive = [false, true];
    }
    that.setData({
      menuActive: menuActive
    });
  },
  /**
   * 跳转到产品列表
   */
  toProductList:function(){
    wx.navigateTo({
      url: '../product/product',
    })
  },
  //跳转到对应的分类
  toCateGory:function (e) {
    var cateId = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../product/product?cateId=' + cateId + '&name=' + name,
    })
  }
})