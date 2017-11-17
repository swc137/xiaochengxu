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
    status:''
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
            //console.log(res);
            if (res.data.code == '1001') {
              var info = res.data.data;
              wx.setStorage({
                key: 'meeting_id',
                data: info.information_id
              })
              that.setData({
                company_name: info.company_name,
                company_address: info.company_address == null ? '无' : info.company_address,
                zip_code: info.zip_code == null ? '无' : info.zip_code,
                typeIndex: info.invoice_type,
                invoice_type: info.invoice_type == 1?'增值税专用发票':'增值税普通发票',
                invoice_title: info.invoice_title == null ? '无' : info.invoice_title,
                invoice_bank: info.invoice_bank == null ? '无' : info.invoice_bank,
                invoice_card_number: info.invoice_card_number == null ? '无' : info.invoice_card_number,
                invoice_company_address: info.invoice_company_address == null ? '无' : info.invoice_company_address,
                invoice_company_phone: info.invoice_company_phone == null ? '无' : info.invoice_company_phone,
                invoice_remark: info.invoice_remark == null ? '无' : info.invoice_remark,
                invoice_taxpayer_number: info.invoice_taxpayer_number == null ? '无' : info.invoice_taxpayer_number,
                status:info.status
              })
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
  toList:function(){
    wx.navigateTo({
      url: '../personList/personList',
    })
  },
  //修改信息
  modifyCompany:function(e){
    wx.navigateTo({
      url: '../company/company?modify=1',
    })
  }
})