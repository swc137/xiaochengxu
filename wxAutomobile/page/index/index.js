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
    accessoryImg:[],
    news:[],
    act_title:''
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
    },51);
  
    //热门配件
    api.getLimit({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          accessoryImg: arr
        })
      }
    });
    //新闻资讯
    api.getNews({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          news:arr
        })
      }
    },1);
    //首页活动
    api.getNavDetail({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          act_title:arr.title
        })
      }
    },'sales')
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
  navigate: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../detail/detail?product_id=' + id
    })
  },
  //跳转新闻详情
  newsDetail: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../news_detail/news_detail?news_id=' + id
    })
  },
  //跳转到商城
  toMall:function(e){
    wx.switchTab({
      url: '../mall/mall'
    })
  },
  //跳转到新闻资讯
  toNews: function (e) {
    wx.navigateTo({
      url: '../news/news'
    })
  },
  //跳转到对应的产品列表
  toProduct: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../product/product?categroy_id=' + id
    })
  },
  //跳转到活动
  toAct:function(e){
    wx.navigateTo({
      url: '../nav/nav'
    })
  }, 
  toVIP: function (e) {
    wx.switchTab({
      url: '../person/person'
    })
  }
})