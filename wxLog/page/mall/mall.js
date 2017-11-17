var api = require('../../util/api.js')
var array = require('../../util/array.js')
// product.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.imgUrl,
    categoryList:[],
    productList:[],
    firstId:'',
    actList:[],//存放左侧菜单的点击状态
    active:'',
    pagesize:10,
    page:1
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
    //分类列表
    api.getCategory({
      success: (res) => {
        console.log(res)
        var arr = res.data.data;
        var actList = arr.map(function(item,i){
          if(0 == i){
            item = true
          }else{
            item = false;
          }
          return item;
        })
        that.setData({
          categoryList: arr,
          firstId: arr[0].id,
          actList: actList
        })

        var id = that.data.firstId;
        var pagesize = that.data.pagesize;
        var page = that.data.page;
        //产品列表
        api.getProductList({
          success: (res) => {
            var arr = res.data.data;
            that.setData({
              productList: arr
            })
          }
        }, pagesize, page, id);

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
  /**
   * 产品列表 
   */
  getCateList:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var actList = that.data.actList;
    var pagesize = that.data.pagesize;
    var page = that.data.page;
    
    for (var i = 0; i < actList.length; i++){
      if(index == i){
        actList[i] = true;
      }else{
        actList[i] = false;
      }
    }
    that.setData({
      actList: actList
    });
    //产品列表
    api.getProductList({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          productList: arr
          
        })
      }
    }, pagesize, page,id);
  },
  //跳转产品详情
  toDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?product_id=' + id
    })
  }
})