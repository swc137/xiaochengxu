var api = require("../../util/api.js")
// index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: api.imgUrl,
    user_id:'',
    company_name:'',
    company_address:'',
    zip_code:'',
    invoice_type: ['增值税专用发票','增值税普通发票'],
    typeIndex:'',
    invoice_title:'',
    invoice_taxpayer_number:'',
    invoice_company_address:'',
    invoice_company_phone:'',
    invoice_bank:'',
    invoice_card_number:'',
    modify:'',
    information_id:''
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var modify = options.modify;
    that.setData({
      modify: modify
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
    var modify = that.data.modify;
    wx.getStorage({
      key: 'data',
      success: function(res) {
        that.setData({
          user_id: res.data
        })
        api.check_baoming({
          method: 'post',
          data: { user_id: res.data },
          success: (res) => {
            if (res.data.code == '1001') {
              var info = res.data.data;
              that.setData({
                information_id: info.id,
                company_name: info.company_name,
                company_address: info.company_address == null ? '无' : info.company_address,
                zip_code: info.zip_code == null ? '无' : info.zip_code,
                typeIndex: info.invoice_type - 1,
                invoice_title: info.invoice_title == null ? '无' : info.invoice_title,
                invoice_bank: info.invoice_bank == null ? '无' : info.invoice_bank,
                invoice_card_number: info.invoice_card_number == null ? '无' : info.invoice_card_number,
                invoice_company_address: info.invoice_company_address == null ? '无' : info.invoice_company_address,
                invoice_company_phone: info.invoice_company_phone == null ? '无' : info.invoice_company_phone,
                invoice_remark: info.invoice_remark == null ? '无' : info.invoice_remark,
                invoice_taxpayer_number: info.invoice_taxpayer_number == null ? '无' : info.invoice_taxpayer_number,
                status: info.status
              })
              if (modify == '') {
                wx.showModal({
                  title: '提示',
                  content: '您已经填写过报名信息,点击查看',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '../companyInfo/companyInfo',
                      })
                    }
                  }
                })
              }
            }
          }
        })
      },
    })
    
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
  //输入保存
  inInput: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    that.setData({
      [id]:e.detail.value
    })
  },
  //选择发票类型
  bindInvoice:function(e){
    var that = this;
    that.setData({
      typeIndex: e.detail.value
    })
  },
  //提交表单
  formSubmit: function (e) {
    var that = this;
    var company_name = that.data.company_name;
    var typeIndex = that.data.typeIndex/1 + 1;
    var invoice_title = that.data.invoice_title;
    var information_id = that.data.information_id;
    var modify = that.data.modify;
    if (company_name == "" || typeIndex === "" || invoice_title == ""){
      wx.showModal({
        title: '提示',
        content: '请完善报名信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
    } else{
      api.save_company_info({
        method: 'post',
        data: e.detail.value,
        success: (res) => {
          if (res.data.code == '1001') {
            wx.setStorage({
              key: 'meeting_id',
              data: res.data.data
            })
            if (modify == '') {
              wx.navigateTo({
                url: '../personList/personList',
              })
            }else{
              wx.showModal({
                title: '提示',
                content: '修改成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../companyInfo/companyInfo',
                    })
                  }
                }
              })
            }
           
          }
        }
      });
    }
  }
})