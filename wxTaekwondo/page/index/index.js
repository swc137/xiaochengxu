var api = require("../../util/api.js")
var array = require("../../util/array.js")
// index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],//轮播图图片列表
    imgUrl: api.imgUrl,//图片地址
    storeInfo:[],//商家信息
    news:[],//热门资讯
    products:[],//推荐课程
    keyword:'',//搜索文本
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
    //首页轮播图
    api.getBanner({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          imgUrls: array.getBannerByArray(arr, 'image')
        })
      }
    });
    //推荐商家
    api.getStore({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          storeInfo: arr
        })
      }
    });
    //热门资讯
    api.getNews({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          news: arr
        })
      }
    });
    //推荐课程
    api.getProduct({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          products:arr
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
  toVIP: function (e) {
    wx.switchTab({
      url: '../person/person'
    })
  },
  //跳转课程详情
  toDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },
  //同步输入
  bindKeyInput:function(e){
    var that = this;
    var keyword = e.detail.value;
    that.setData({
      keyword: keyword
    });
  },
  //去搜索
  toSearch:function(e){
    var that = this;
    wx.navigateTo({
      url: '../search/search?keyword='+that.data.keyword
    })
  },
  //商家详情
  storeDetail:function(e){
    var storeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shopDetail/shopDetail?storeId='+storeId
    })
  },
  //资讯详情
  newsDetail: function (e){
    var newsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../newsDetail/newsDetail?newsId=' + newsId
    })
  }
})