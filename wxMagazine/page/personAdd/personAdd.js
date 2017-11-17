// page/personList/personlist.js
var api = require("../../util/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meeting_id:'',
    username:'',
    sex:['男','女'],
    sexIndex:'',
    job:'',
    phone:'',
    mobile:'',
    wx_number:'',
    zhusu:['单住','合住','不住'],
    zhusuIndex:'',
    select:'',
    meet_theme:'',
    member_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var member_id = options.member_id == undefined ? '' : options.member_id;
    that.setData({
      member_id: member_id
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
    var member_id = that.data.member_id;
    api.get_huiyi_theme({
      success: (res) => {
        if (res.data.code == '1001') {
          that.setData({
            meet_theme: res.data.data
          })

        }
      }
    })
    wx.getStorage({
      key: 'meeting_id',
      success: function (res) {
        that.setData({
          meeting_id: res.data
        })
      },
    })
    if (member_id != ''){
      api.get_memberinfo({
        success:(res)=>{
          //console.log(res)
          if(res.data.code == '1001'){
            var info = res.data.data;
            that.setData({
              select:info.conference_theme_id,
              username: info.username,
              sexIndex: info.sex/1 - 1,
              job: info.job,
              phone: info.phone,
              mobile: info.mobile,
              wx_number: info.wx_number,
              zhusuIndex: info.zhusu/1 - 1
            })
          }
        }
      }, member_id)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this;
    that.setData({
      member_id: ''
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //输入保存
  inInput: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    that.setData({
      [id]: e.detail.value
    })
  },
  //选择性别
  bindSex:function(e){
    var that = this;
    that.setData({
      sexIndex: e.detail.value
    })
  },
  //选择住宿
  bindZhusu: function (e) {
    var that = this;
    that.setData({
      zhusuIndex: e.detail.value
    })
  },
  //选择会议
  changeMeet: function (e) {
    var that = this;
    var select = e.currentTarget.dataset.val;
    that.setData({
      select: select
    })
  },
  //提交表单
  formSubmit: function (e) {
    var that = this;
    var username = that.data.username;
    var sexIndex = that.data.sexIndex;
    var mobile = that.data.mobile;
    var zhusuIndex = that.data.zhusuIndex;
    var select = that.data.select;
    var member_id = that.data.member_id;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (username == "" || sexIndex === "" || mobile == "" || zhusuIndex === ""){
      wx.showModal({
        title: '提示',
        content: '请完善您的信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
    } else if (select == ""){
      wx.showModal({
        title: '提示',
        content: '请选择会议主题',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    }else{
      if (!myreg.test(mobile)) {
        wx.showModal({
          title: '提示',
          content: '手机号格式有误',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            }
          }
        })
        return false;
      }else{
        api.save_person_info({
          method: 'post',
          data: e.detail.value,
          success: (res) => {
            if (res.data.code == '1001') {
              if (member_id == ''){
                wx.showModal({
                  title: '提示',
                  content: username + '报名成功',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack({

                      });
                    }
                  }
                })
              }else{
                wx.showModal({
                  title: '提示',
                  content: '修改成功',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack({

                      });
                    }
                  }
                })
              }
            }else{
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                  }
                }
              })
            }
          }
        });
      }
    }
  
  }
})