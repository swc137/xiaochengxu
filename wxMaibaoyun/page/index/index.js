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
    act_title:'',
    imgUrl:'../../image/index/code.png'
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
  //跳转新闻详情
  newsDetail: function (e) {
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../news_detail/news_detail?news_id=' + id
    })
  },
  //跳转到新闻资讯
  toNews: function (e) {
    wx.switchTab({
      url: '../news/news'
    })
  },
  bigImg: function (e) {
    var that = this;
    var imgUrl = that.data.imgUrl;
    var index = e.target.dataset.val;
    wx.previewImage({
      current: imgUrl , // 当前显示图片的http链接
      urls: [imgUrl] // 需要预览的图片http链接列表
    })
  }
})