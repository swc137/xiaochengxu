var dateUtil = require("../../utils/util.js")
var arrayUtil = require("../../utils/array.js")
var valid = require("../../utils/valid.js")
var api = require("../../utils/api.js")
var bubb = require("../../components/bubblePop.js")                                                   
var sendCode = require("../../utils/sendByCode.js")
var app = getApp()
var certType = [{key:'0',value:'身份证'},{key:'1',value:'护照'},{key:'2',value:'港澳居民来往内地通行证'},{key:'3',value:'台湾同胞来往内地通行证(台胞证)'},{key:'4',value:'军官证'},{key:'5',value:'士兵证'},{key:'6',value:'警官证'},{key:'8',value:'其他'}]
var countrys = []
Page({
  data:{
     mainCardCertBeginDate:'',
     mainCardCertEndDate:'',
     bStartDate:'',
     bEndDate:'',
     eStartDate:'',
     eEndDate:'',
     certEnternal:true,
     mainCardName:'',
     mainCardNo:'',
     mainCardCertType:'',
     certTypeList:'',
     certTypeindex:0,
     mainCardCertNo:'',
     verifyCode:'',
     errorMsg:true,
     promptText:'',
     countryList:'',
     countrysindex:0,
     certTypeIsPSPT:false,
     certBirthDay:'',
     bubIsHide:true,
     dycodeInfo:'发送',
     globals:[],
     coundown:60,
     sendCodeState:false,
     isShowCertDate:false,
     submitdisabled:false,
     dyFun:13,
     applyUuid:'',
     attachUuid:'66bd7808-f62c-40ee-a021-6641943470a6'
  },
  onLoad:function(options){
    //   this.setData({
    //     attachUuid:options.uuid
    //  });
   
  },
  onReady:function(){
    // 页面渲染完成
     this.animation = wx.createAnimation({
      timingFunction: 'linear'
    })
  },
  onShow:function(){
      var that = this;
      var currentDate = new Date();
      that.loadCountrys();
      that.setData({
        certTypeList:arrayUtil.getValuesByArray(certType,'value'),
        countryList:arrayUtil.getCountrysByArray(countrys),
        bStartDate:dateUtil.formatTime(dateUtil.dateCalc("y",-20,currentDate)),
        bEndDate:dateUtil.formatTime(currentDate),
        mainCardCertBeginDate:dateUtil.formatTime(currentDate),
        eStartDate:dateUtil.formatTime(dateUtil.dateCalc("d",1,dateUtil.dateCalc("m",1,currentDate))),
        mainCardCertEndDate:dateUtil.formatTime(dateUtil.dateCalc("d",1,dateUtil.dateCalc("m",1,currentDate))),
        eEndDate:dateUtil.formatTime(dateUtil.dateCalc("y",20,currentDate)),
      })
      app.getUserInfo(function(userInfo){});
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  toNoMainCard:function(){
      var that = this;
      wx.navigateTo({
      url: '../newcard/newcard?uuid='+that.data.attachUuid
    })
  },
   //主卡人姓名
  mainCardNameInput:function(e){
    var that = this
    that.setData({
      mainCardName:e.detail.value
    }) 
  },
  //主卡人卡号
  mainCardNoInput:function(e){
    var that = this
    that.setData({
      mainCardNo:e.detail.value
    }) 
  },
  //证件号
  mainCardCertNoInput:function(e){
    var that = this;
    that.setData({
      mainCardCertNo:e.detail.value
    })
  },
  //证件类型下拉列表
  bindCertType:function(e){
   console.info(e.detail.value)
    var that = this
    var index = e.detail.value
    if(index !='null'){
    that.setData({
      certTypeindex:e.detail.value
    })
    that.setData({
       certTypeIsPSPT:index == 1?true:false,
       countryList:arrayUtil.getCountrysByArray(countrys)
    })
    }
    console.info(that.data.certTypeindex);
  },
  //国籍下拉列表事件处理
  bindCountrySelect:function(e){
    var that = this
    var index = e.detail.value
    if(index !='null'&& index != ''){
      that.setData({
        countrysindex:index
      })
    }
  },
 //证件开始时间事件处理
    datePickerBeginChange:function(e){
    var that = this
    console.info(e.detail.value)
    that.setData({
      mainCardCertBeginDate:e.detail.value
    })
  },
  //证件截止时间事件处理
  datePickerEndChange:function(e){
    var that = this
    console.info(e.detail.value)
    that.setData({
      mainCardCertEndDate:e.detail.value
    })
  },
   isEnternalSwitch:function(e){
    console.info(e.detail.value)
    var that = this
    that.setData({
      certEnternal:!e.detail.value
    })
  },
  //获取短信验证码事件处理
  getVerifyCode: function(){
    var that = this;
    that.setData({
       promptText:this.mainCardDataValid()
      })
     if(that.data.promptText !=''){ 
       that.setData({
         errorMsg:false
       })
       bubb.popBubble(that);
   }
     if(that.data.promptText ==''){  
       let params = {
         attachUuid:this.data.attachUuid,
         applyName:this.data.mainCardName,
         holderCreditNo:this.data.mainCardNo,
         certType:this.data.certTypeindex,
         certNo:this.data.mainCardCertNo,
         dyFun:this.data.dyFun,
         holderCountyCode:that.data.certTypeIsPSPT?arrayUtil.getCountrysCodeByIndex(countrys,that.data.countrysindex):'',
         holderArea:that.data.certTypeIsPSPT?3:'',
         loginCode:app.globalData.loginCode,
         sessionId:wx.getStorageSync('thirdSession')	 
       };

      sendCode.sendByCode(that);
      api.getVerifyCode({
          data:params,
          method:'POST',
          success:(res) =>{
            if(res.data.status =="true"){
               //证件号不在有效期内，显示证件开始结束日期
               if(res.data.mainIdIsPass=="1"){
                   that.setData({
                     isShowCertDate:true,
                     certBirthDay:res.data.birthDate
                   }) 
               }
               wx.setStorageSync('thirdSession', res.data.thirdSession);
               console.info("动码发送成功")
               that.setData({
                 applyUuid:res.data.applyUuid
               })
            }else if(res.data.isRedirect =="true"){
                sendCode.cleanDyInfo(that);
              	wx.redirectTo({
                        url: '../resultFail/resultFail?desc='+res.data.message
                })
            }else{
                  sendCode.cleanDyInfo(that);
                  that.showTips(res.data.message,that);
            }
          },
        });
     }
  },
  mainCardDataValid:function(){
    var promptText = "";
    var that = this;
    //主卡人姓名校验
    if(valid.required(this.data.mainCardName)){
      promptText="请输入主卡人姓名";
      return promptText;
    }
    if(valid.wordByteLen(this.data.mainCardName,30)){
      promptText="输入的名字长度过长"
      return promptText;
    }
    if(!valid.ChineseAbcDotSpace(this.data.mainCardName,'0')){
       promptText="您输入的姓名含空格或符号。若姓名中含有点，请输入英文半角“.”"
       return promptText;
    }
    //主卡卡号校验
    if(valid.required(this.data.mainCardNo)){
      promptText="请输入主卡卡号";
      return promptText; 
    }
    if(valid.carddigitNumber(this.data.mainCardNo)){
      promptText="输入的卡号位数有误";
      return promptText; 
    }
    if(!valid.cardAbcDotSpace(this.data.mainCardNo)){
      promptText="输入的卡号有含有符号或空格，请以英文半角模式的数字输入";
      return promptText; 
    }
    if(!valid.cardNoValid(this.data.mainCardNo)){
      promptText="您输入的卡号不存在，请重新填写";
      return promptText; 
    }
    //主卡more卡校验
    if(valid.isMoreCard(this.data.mainCardNo)){
      promptText="您输入的卡号为More卡，不能申请附属卡";
      return promptText; 
    }
    //主卡人证件号码校验
    if(valid.required(this.data.mainCardCertNo)){
       promptText="请输入您的证件号码"
       return promptText; 
    }
    if(valid.OEOFVerifyLength(this.data.mainCardCertNo,20)){
        promptText="您输入的证件号码位数有误"
       return promptText; 
    }
    if(that.data.certTypeindex ==0 &&!valid.valCertId(this.data.mainCardCertNo)){
        promptText="请输入正确的二代身份证证件号码"
        return promptText; 
    }
    if(that.data.certTypeindex !=0 &&!valid.isOtherTypeAttach(this.data.mainCardCertNo)){
        promptText="您的证件号码中含有符号或空格，请重新填写！若证件中含有括号，请使用英文半角的“()”输入"
        return promptText; 
    }
    return promptText;

  },
   //表单提交
  bindMainCardFormSubmit:function(e){
    var that = this
     that.setData({
       errorMsg:true,
       submitdisabled:true
     })
    var mainCardName = null;
    if(e.detail.value !=null){
     that.setData({
       promptText:that.validForm(e.detail.value,that)
      })
    }
   if(that.data.promptText !=''){
     that.setData({
       errorMsg:false
     })
    bubb.popBubble(that);
   }
  if(that.data.errorMsg){
      that.formInit(that,e.detail.value)
  }
  
   },
  loadCountrys:function(that){
        var cacheCountry = wx.getStorageSync('countrys');
      if(cacheCountry){
        countrys = cacheCountry
      } else {
      api.getBaseCountry({
        success:(res) =>{
          countrys=res.data.countrys;
          wx.setStorage({
            key: 'countrys',
            data: countrys
          })

        }
      });
     }
  },
  validForm:function(formvalue,that){
    var promptText = "";
     //主卡姓名校验
    var mainCardName = formvalue.mainCardName;
    if(valid.required(mainCardName)){
      promptText="请输入主卡人姓名";
      return promptText; 
    }
    if(valid.wordByteLen(mainCardName,30)){
      promptText="输入的名字长度过长"
      return promptText; 
    }
    if(!valid.ChineseAbcDotSpace(mainCardName,'0')){
       promptText="您输入的姓名含空格或符号。若姓名中含有点，请输入英文半角“.”"
       return promptText; 
    }
    //主卡卡号校验
    var mainCardNo = formvalue.mainCardNo;
    if(valid.required(mainCardNo)){
      promptText="请输入主卡卡号";
      return promptText; 
    }
    if(valid.carddigitNumber(mainCardNo)){
      promptText="输入的卡号位数有误";
      return promptText; 
    }
    if(!valid.cardAbcDotSpace(mainCardNo)){
      promptText="输入的卡号有含有符号或空格，请以英文半角模式的数字输入";
      return promptText; 
    }
    if(!valid.cardNoValid(mainCardNo)){
      promptText="您输入的卡号不存在，请重新填写";
      return promptText; 
    }
    //主卡more卡校验
    if(valid.isMoreCard(this.data.mainCardNo)){
      promptText="您输入的卡号为More卡，不能申请附属卡";
      return promptText; 
    }
   //主卡人证件号码校验
    var mainCardCertNo = formvalue.mainCardCertNo;
    if(valid.required(mainCardCertNo)){
       promptText="请输入您的证件号码"
       return promptText; 
    }
    if(valid.OEOFVerifyLength(mainCardCertNo,20)){
        promptText="您输入的证件号码位数有误"
       return promptText; 
    }
    if(that.data.certTypeindex ==0 &&!valid.valCertId(mainCardCertNo)){
        promptText="请输入正确的二代身份证证件号码"
        return promptText; 
    }
    if(that.data.certTypeindex !=0 &&!valid.isOtherTypeAttach(mainCardCertNo)){
        promptText="您的证件号码中含有符号或空格，请重新填写！若证件中含有括号，请使用英文半角的“()”输入"
        return promptText; 
    }
   //短信验证码校验
    var verifyCode = formvalue.verifyCode;
    if(valid.required(verifyCode)){
       promptText="请输入6位数字验证码"
       return promptText; 
    }
    if(!valid.dyCode(verifyCode)){
       promptText="请输入6位数字验证码"
       return promptText; 
    }
    //证件开始结束时间校验
    if(that.data.isShowCertDate){
      if(valid.required(this.data.mainCardCertBeginDate)){
        promptText="请输入您的证件开始时间"
        return promptText; 
      }
      var startDate = dateUtil.formatDateToYYYYmmdd(this.data.mainCardCertBeginDate);
      var endDate = that.data.certEnternal?dateUtil.formatDateToYYYYmmdd(this.data.mainCardCertEndDate):'25001231';
      var birthDay = that.data.certBirthDay;
      if(birthDay==''){
          birthDay= valid.countBirth(this.data.mainCardCertNo);
      }
      if(!valid.creditIdValSupp(startDate,endDate,birthDay)){
         promptText="请选择正确的证件有效期"
         return promptText; 
      }
    }
    
    return promptText;
  },
  errormsgconfirm:function(){
    var that = this
    that.setData({
      errorMsg:true,
      submitdisabled:false
    })
   },
   formInit:function(that,formvalue){
    var formData = {
      dyCode:formvalue.verifyCode,
      attachUuid:that.data.attachUuid,
      applyUuid:that.data.applyUuid,
      startDate:dateUtil.formatDateToYYYYmmdd(this.data.mainCardCertBeginDate),
      endDate:(that.data.certEnternal?dateUtil.formatDateToYYYYmmdd(this.data.mainCardCertEndDate):'25001231'),
      iv:app.globalData.iv,
      encryptedData:app.globalData.encryptedData,
      thirdSession:wx.getStorageSync('thirdSession')
    }
       api.validVerifyCode({
       data:formData,
       method:'POST',
       success:(res) =>{
         let result = res.data.status;
         let canApplyAttach = res.data.canApplyAttach;
         let isRedirect = res.data.isRedirect;
         if(result =="true"){
             let name = res.data.name;
              let mobile=res.data.mobile;
              let certNo=res.data.certNo;
              let applyUuid=res.data.applyUuid;
              let attachUuid=res.data.attachUuid;
              wx.redirectTo({
                  url: '../cardholder_confirm/cardholder_confirm?name='+name+'&certNo='+certNo+'&mobile='+mobile+'&applyuuid='+applyUuid+'&attachUuid='+attachUuid,
                  success: function(res){
                      that.setData({
                    submitdisabled:false
                    })
                  },
                  fail: function() {
                    that.setData({
                        submitdisabled:false
                        })
                  },
                  complete: function() {
                  
                  }
              })
         } else if(isRedirect =="true" ){
                wx.redirectTo({
                  url: '../resultFail/resultFail?desc='+res.data.message,
                   success: function(res){
                      that.setData({
                         submitdisabled:false
                       })
                  },
                  fail: function() {
                      that.setData({
                         submitdisabled:false
                      })
                  },
                  complete: function() {
                  
                  }
              }) 
         }else{
            that.showTips(res.data.message,that);
         }
          
        
      }
    });
   },

   //设置错误信息
  showTips:function(msg,that){
    var tips = msg || '系统忙，请稍后重试！'
      wx.showModal({
                  title: '',
                  showCancel:false,
                  content: tips,
                  success: function(res) {
                  },
                  complete: function(res){
                     that.setData({
                        submitdisabled:false
                        })
                  }
    })
  }

})