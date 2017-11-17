// page/panicBuy/panicBuy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours:'00',
    minutes:'00',
    seconds:'00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    countdown(that);
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
function countdown(that) {
  var nowTime = Date.parse(new Date());
  var endTime = Date.parse(new Date('2017/10/24 18:04:00'));
  var longTime = (endTime - nowTime)/1000;
  var seconds = toStr(longTime % 60);
  var minutes = toStr(((longTime - seconds) / 60) % 60);
  var hours = toStr(parseInt(((longTime - seconds) / 60) / 60));
  var secondTime = that.data.secondTime;
  if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      return;
   }
   var time = setTimeout(function () {
      that.setData({
        seconds: seconds,
        minutes: minutes,
        hours: hours
      });
      countdown(that);
   }
  , 1000)
}
function toStr(str){
  if(str.toString().length ==1){
    return '0'+str;
  }else{
    return str;
  }
}