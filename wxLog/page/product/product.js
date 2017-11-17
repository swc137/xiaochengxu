var api = require('../../util/api.js')
var array = require('../../util/array.js')
// product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    pickerId:[''],
    categoryArr: ['全部'],
    imgUrl: api.imgUrl,
    pagesize:10,
    page:1,
    noData:'hidden',
    productList:''
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
    //加载分类
    api.getCategory({
      success: (res) => {
        var arr = res.data.data;

        var categoryArr = that.data.categoryArr;
        var pickerId = that.data.pickerId;

        var names = array.getValuesByArray(arr, 'name');
        var ids = array.getValuesByArray(arr, 'id');
        for (var i = 0; i < names.length; i++) {
          categoryArr.push(names[i]);
        }
        for (var i = 0; i < ids.length; i++) {
          pickerId.push(ids[i]);
        }
        that.setData({
          categoryArr: categoryArr,
          pickerId: pickerId
        })
      }
    });
    var pagesize = that.data.pagesize;
    var page = that.data.page;
    //加载产品列表(分页)
    api.getProductList({
      success: (res) => {
        var arr = res.data.data;
        that.setData({
          productList: arr
        })
      }
    }, pagesize, page,'');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this
    that.setData({
      page: 1,
      noData:'hidden',
      index:0,
      pickerId: [''],
      categoryArr: ['全部']
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
    var index = that.data.index;
    that.setData({
      page: page
    });
    //加载产品列表(分页)
    api.getProductList({
      success: (res) => {
        var arr = res.data.data;
        var productList = that.data.productList;
        for(var i = 0;i<arr.length;i++){
          productList.push(arr[i]);
        }
        that.setData({
          productList: productList
        })
      }
    }, pagesize, page, that.data.pickerId[index]);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 选择分类
  bindPickerChange:function(e){
    var that = this;
    that.setData({
      index: e.detail.value
    })
    var index = that.data.index;
    var pagesize = that.data.pagesize;
    //加载产品列表(分页)
    api.getProductList({
      success: (res) => {
        var arr = res.data.data;
        console.log(res);
        if(arr.length == 0){
          that.setData({
            noData:'show'
          })
        }else{
          that.setData({
            noData: 'hidden'
          })
        }
        that.setData({
          productList: arr,
          page: 1
        })
      }
    }, pagesize, 1, that.data.pickerId[index]);

  },
  navigate:function(e){
    var id = e.currentTarget.dataset.val;
    wx.navigateTo({
      url: '../detail/detail?product_id=' + id
    })
  }
})