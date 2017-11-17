var api = require('../../util/api.js')
// detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    product_id: '',
    detailInfo: '',
    imgUrl: api.imgUrl,
    images: '',
    content: [],
    imagesW: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      product_id: options.product_id
    })
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
    var product_id = that.data.product_id;
    //加载产品详情
    api.projectDeatil({
      success: (res) => {
        var info = res.data.data;
        var content = info.description.replace(/<p>/g, '').split(/<\/p>/g);
        that.setData({
          detailInfo: info,
          images: info.images,
          content: content
        })
      }
    }, product_id);
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
  imgLoad: function (e) {
    var that = this;
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 695,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 695 / ratio;    //计算的高度值
    var image = this.data.imagesW;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    that.setData({
      imagesW: image
    })
  },
  bigImg: function (e) {
    var that = this;
    var imgUrl = that.data.imgUrl;
    var image = that.data.images;
    var index = e.target.dataset.val;
    wx.previewImage({
      current: imgUrl + image[index], // 当前显示图片的http链接
      urls: [imgUrl + image[index]] // 需要预览的图片http链接列表
    })
  }
})