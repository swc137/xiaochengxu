var api = require("../../util/api.js")
var array = require("../../util/array.js")
// index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    productList:[],
    imgUrl: api.imgUrl,
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:1000,
    accessoryImg: []
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
    //产品列表
    api.getProductList({
      success:(res)=>{
        var arr = res.data.data;
        that.setData({
          productList: arr
        })
      }
    },10,1,'');

    //新闻资讯
    api.getNews({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          news: arr
        })
      }
    }, 1);
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
  //产品详情
  navigate:function(e){
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../detail/detail?product_id='+id
    })
  },
  //导航详情跳转
  getInfo:function(e){
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../nav/nav?name='+name+'&id=' + id
    })
  },
  //
  toProduct:function(){
    wx.switchTab({
      url: '../product/product',
    })
  },
  //跳转新闻详情
  newsDetail: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../news_detail/news_detail?news_id=' + id
    })
  },
  toIndex:function(e){
    wx.switchTab({
      url: '../index/index',
    })
  },
  toMall:function(e){
    wx.switchTab({
      url: '../product/product',
    })
  },
  toNews: function (e) {
    wx.navigateTo({
      url: '../news/news',
    })
  },
})