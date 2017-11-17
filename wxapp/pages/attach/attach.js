var dateUtil = require("../../utils/util.js")
var arrayUtil = require("../../utils/array.js")
var valid = require("../../utils/valid.js")
var api = require("../../utils/api.js")
var sendCode = require("../../utils/sendByCode.js")
var bubb = require("../../components/bubblePop.js")
var app = getApp()
var certType = [{key:'0',value:'身份证'},{key:'1',value:'护照'},{key:'2',value:'港澳居民来往内地通行证'},{key:'3',value:'台湾同胞来往内地通行证(台胞证)'},{key:'4',value:'军官证'},{key:'5',value:'士兵证'},{key:'6',value:'警官证'},{key:'8',value:'其他'}]
var attachRelation = [{key:'0',value:'配偶'},{key:'1',value:'父母'},{key:'2',value:'子女'},{key:'A',value:'其他直系亲属'}]
var attachSex = [{key:'0',value:'男'},{key:'1',value:'女'}]
var attachPosCheck = [{key:'0',value:'仅使用签名确认交易'},{key:'1',value:'使用密码确认交易'}]
var countrys = []

Page({
  data:{
     attachCertBeginDate:'',
     attachCertEndDate:'',
     bStartDate:'',
     bEndDate:'',
     eStartDate:'',
     eEndDate:'',
     certEnternal:true,
     attachName:'',
     attachChName:"",
     certTypeList:'',
     certTypeindex:0,
     attachCertNo:'',
     attachBirthDay:'',
     attachTel:'',
     attachSexList:'',
     attachSexindex:0,
     attachRelationList:'',
     attachRelationindex:0,
     attachPosCheckList:'',
     attachPosCheckindex:0,
     errorMsg:true,
     promptText:'',
     isNotSSNO:true,
     certBirthDay:'',
     certSex:'',
     countryList:'',
     countrysindex:0,
     certTypeIsPSPT:false,
     applyUuid:'',
     submitdisabled:false,
     bubIsHide:true,
     dycodeInfo:'发送',
     globals:[],
     coundown:60,
     sendCodeState:false,
     dyFun:11 //动码功能码
  },
  onLoad:function(options){
  },
  onReady:function(){
  //  console.info(this.data.applyUuid+'---------');
    // 页面渲染完成
    // 实例化一个动画
    this.animation = wx.createAnimation({
     timingFunction: 'linear'
    })
  },
 
  onShow:function(){
   
      var that = this;
      let currentDate = new Date();
      let defaultDate = dateUtil.formatTime(currentDate);
      let bStartDate = dateUtil.dateCalc("y",-20,currentDate);
      let eEndDate = dateUtil.dateCalc("y",20,currentDate);
      let addCurrentOneMonth = dateUtil.dateCalc("m",1,currentDate);
      console.info(addCurrentOneMonth)
      that.loadCountrys();
      that.setData({
        bStartDate:dateUtil.formatTime(bStartDate),
        bEndDate:defaultDate,
        attachCertBeginDate:defaultDate,
        eStartDate:dateUtil.formatTime(dateUtil.dateCalc("d",1,addCurrentOneMonth)),
        attachCertEndDate:dateUtil.formatTime(dateUtil.dateCalc("d",1,addCurrentOneMonth)),
        eEndDate:dateUtil.formatTime(eEndDate),
        certTypeList:arrayUtil.getValuesByArray(certType,'value'),
        attachSexList:arrayUtil.getValuesByArray(attachSex,'value'),
        attachRelationList:arrayUtil.getValuesByArray(attachRelation,'value'),
        attachPosCheckList:arrayUtil.getValuesByArray(attachPosCheck,'value'),
        countryList:arrayUtil.getCountrysByArray(countrys)
      })
      let cacheAttachInfo = wx.getStorageSync("attachCacheInfo");
      if(that.data.applyUuid !='' && !cacheAttachInfo){
          that.setData({
            applyUuid:''
          })
      }
      app.getUserInfo(function(userInfo){});
   
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //证件开始时间事件处理
    datePickerBeginChange:function(e){
    var that = this
    console.info(e.detail.value)
    that.setData({
      attachCertBeginDate:e.detail.value
    })
  },
  //证件截止时间事件处理
  datePickerEndChange:function(e){
    var that = this
    that.setData({
      attachCertEndDate:e.detail.value
    })
  },
  //附属卡姓名
  attachNameInput:function(e){
    var that = this
    that.setData({
      attachName:e.detail.value
    })

  },
  attachChNameInput:function(e){
    var that = this
    that.setData({
       attachChName:e.detail.value
    })
  },
  //附属卡姓名压花名
  getAttachPinYin:function(e) {
    var that = this;
    let params = {
      name:e.detail.value
    };
    api.getAttachPinYin({
      data:params,
      success:(res) =>{
       var pinyin = res.data.pinyin;
       that.setData({
         attachChName:pinyin
       })
       
      },
    });
  },
  
  //证件类型下拉列表
  bindCertType:function(e){
      var that = this
      var index = e.detail.value
      if(index !='null' && index != ''){
          that.setData({
            certTypeindex:e.detail.value,
             certTypeIsPSPT:index == 1?true:false,
            countryList:arrayUtil.getCountrysByArray(countrys)
          })
          
      }
      console.info(that.data.certTypeindex);
      that.dealBirthSexInfo(that,that.data.attachCertNo);
  },
  //国籍下拉列表事件处理
  bindCountrySelect:function(e){
    var that = this
    var index = e.detail.value
    if(index !='null'){
      that.setData({
        countrysindex:index
      })
    }
  },
  attachCertNoInput:function(e){
    var that = this;
    var certNo = e.detail.value;
     that.dealBirthSexInfo(that,certNo);
  },
  isEnternalSwitch:function(e){
    console.info(e.detail.value)
    var that = this
    that.setData({
      certEnternal:!e.detail.value
    })
  },
  attachTelInput:function(e){
    let that = this;
    that.setData({
      attachTel:e.detail.value
    })
  },
  //发送验证码
  getVerifyCode:function(){
    console.info(app.globalData.loginCode+"111111");
     console.info(app.globalData.iv+"22222222");
     console.info(app.globalData.encryptedData+"3333333333");
    
    
      let that = this;
  
    var attachTel = that.data.attachTel;
    
      that.setData({
          promptText:that.validTel(attachTel,that)
      })
      if(that.data.promptText !=''){
           that.setData({
          errorMsg:false
        })
           bubb.popBubble(that)
     }
   if(that.data.errorMsg){
        let params = {
          tel:that.data.attachTel,
          dyFun:that.data.dyFun,
          loginCode:app.globalData.loginCode,
          sessionId:wx.getStorageSync('thirdSession')
        };
        sendCode.sendByCode(that);
         api.baseAttachSendDyCode({
           data:params,
          success:(res) =>{
         //判断是否发送成功
           if(res.data.flag =='true'){
              wx.setStorageSync('thirdSession', res.data.thirdSession);
               console.info("动码发送成功")
          } else {
            sendCode.cleanDyInfo(that);
            if(res.data.isQuit == "true"){
				wx.navigateTo({
                    url: '../resultFail/resultFail?desc='+res.data.message
                });
			}
            that.showTips(res.data.message,that);
           }
         
          }
         });

     }
   
  },
  validTel:function(attachTel,that){
      var promptText = "";
    if(valid.required(attachTel)){
       promptText="请输入您的手机号码"
       return promptText; 
    }
    if(!valid.isMobile(attachTel)){
       promptText="您输入的手机号含非数字内容、空格或不存在"
       return promptText; 
    }
    if(!valid.verifyMobileLength(attachTel,11)){
       promptText="您输入的手机号位数有误"
       return promptText; 
    }
    that.setData({
       errorMsg:true
    })
    return promptText;
  },
  //性别
  bindAttachSex:function(e){
    let that = this;
    let index = e.detail.value;
    if(index !='null'){
      that.setData({
        attachSexindex:index
      })
    }
  },
  //与主卡人关系
  bindAttachRelation:function(e){
    let that = this;
    let index = e.detail.value;
    if(index !='null'){
      that.setData({
        attachRelationindex:index
      })
    }
  },
  //交易密码选择
  bindAttachPOSCheck:function(e){
    var that = this;
    var index = e.detail.value;
    if(index !='null'){
      that.setData({
        attachPosCheckindex:index
      })
    }
    console.info(that.data.attachPosCheckindex);
  },
  bindAttachFormSubmit:function(e){
      var that = this
     // var attachName = null;
      //var attachChName = null;
      that.setData({
        submitdisabled:true
      })
      if(e.detail.value !=null){
      that.setData({
        promptText:that.validForm(e.detail.value,that)
        })
      }
    if(that.data.promptText !=''){
      that.setData({
        errorMsg:false
      })
      bubb.popBubble(that)
    } 
      if(that.data.errorMsg){
        that.formInit(that,e.detail.value)

      }

  },
  validForm:function(formvalue,that){
    //附属卡姓名校验
    var promptText = "";
    var attachName = formvalue.attachName;
    if(valid.required(attachName)){
      promptText="请输入附属卡申请人姓名";
      return promptText; 
    }
    if(valid.wordByteLen(attachName,30)){
      promptText="输入的名字长度过长"
      return promptText; 
    }
    if(!valid.ChineseAbcDotSpace(attachName,'0')){
       promptText="您输入的姓名含空格或符号。若姓名中含有点，请输入英文半角“.”"
       return promptText; 
    }
    //附属卡压花名
    var attachChName = formvalue.attachChName;
    if(valid.required(attachChName)){
       promptText="请以大写字母输入姓名的拼音"
       return promptText; 
    }
     if(valid.wordByteLen(attachChName,30)){
      promptText="输入拼音名称过长"
      return promptText; 
    }
    if(!valid.LowerAbcBlank(attachChName)){
       promptText="您姓名的拼音含符号或数字，请以大写英文字母填写"
       return promptText; 
    }
    //证件号校验
    var attachCertNo = formvalue.attachCertNo;
    if(valid.required(attachCertNo)){
       promptText="请输入您的证件号码"
       return promptText; 
    }
    if(valid.OEOFVerifyLength(attachCertNo,20)){
        promptText="您输入的证件号码有误"
       return promptText; 
    }
    if(that.data.certTypeindex ==0 &&!valid.valCertId(attachCertNo)){
        promptText="请输入正确的二代身份证证件号码"
        return promptText; 
    }
    if(that.data.certTypeindex !=0 &&!valid.isOtherTypeAttach(attachCertNo)){
        promptText="您的证件号码中含有符号或空格，请重新填写！若证件中含有括号，请使用英文半角的“()”输入"
        return promptText; 
    }
    //证件有效期校验(身份证有效期校验)
    if(!that.data.isNotSSNO){
      var startDate = dateUtil.formatDateToYYYYmmdd(that.data.attachCertBeginDate);
      var endDate = that.data.certEnternal?dateUtil.formatDateToYYYYmmdd(that.data.attachCertEndDate):'25001231';
      var birthDay = that.data.certBirthDay;

      if(!valid.creditIdValSupp(startDate,endDate,birthDay)){
         promptText="请选择正确的证件有效期"
         return promptText; 
      }
    }
    //出生日期校验
    if(that.data.isNotSSNO){
    var attachBirthday = formvalue.attachBirthday;
    if(valid.required(attachBirthday)){
       promptText="请输入您的出生日期"
       return promptText; 
    }
    if(!valid.birthFormat(attachBirthday)){
      promptText="请输入正确的出生日期。正确格式为：yyyymmdd";
      return promptText; 
    }
    if(valid.getAge(attachBirthday)<11){
       promptText="附属卡申请人需满11周岁以上。";
       return promptText;
    }
    }
    //附属卡手机号校验
    var attachTel = formvalue.attachTel;
    if(valid.required(attachTel)){
       promptText="请输入您的手机号码"
       return promptText; 
    }
    if(!valid.isMobile(attachTel)){
       promptText="您输入的手机号含非数字内容、空格或不存在"
       return promptText; 
    }
    if(!valid.verifyMobileLength(attachTel,11)){
       promptText="您输入的手机号位数有误"
       return promptText; 
    }
    that.setData({
       errorMsg:true
    })
    return promptText;
  },
  errormsgconfirm:function(){
    var that = this
    that.setData({
      errorMsg:true,
      submitdisabled:false
    })
  },
 dealBirthSexInfo:function(that,value){
   var certValid = true;
    if(valid.required(value)){
        certValid = false
    }
    if(valid.OEOFVerifyLength(value,20)){
        certValid = false
    }
    if(that.data.certTypeindex ==0 &&!valid.valCertId(value)){
       certValid = false
    }
    if(that.data.certTypeindex !=0){
      certValid = false
    }
    that.setData({
        isNotSSNO:!certValid,
        attachCertNo:value
    })
    if(!that.data.isNotSSNO){
      that.setData({
        certBirthDay:valid.countBirth(value),
        certSex:arrayUtil.getValueByIndex(attachSex,valid.getSex(value))
      })
    }
  },

  loadCountrys:function(that){
    var cacheCountry = wx.getStorageSync('countrys');
    if(cacheCountry){
      countrys = cacheCountry
    } else {
    api.getBaseCountry({
       success:(res) =>{
       console.info(res.data.countrys)
        countrys=res.data.countrys;
        wx.setStorage({
          key: 'countrys',
          data: countrys
          
        })

      }
    });
     }
  },
  formInit:function(that,formvalue){
    var formData = {
      attachName:formvalue.attachName,
      attachChName:formvalue.attachChName,
      attachCertType:arrayUtil.getKeyByIndex(certType,that.data.certTypeindex),
      attachCertNo:formvalue.attachCertNo,
      attachCertBeginDate:dateUtil.formatDateToYYYYmmdd(that.data.attachCertBeginDate),
      attachCertEndDate:(that.data.certEnternal?dateUtil.formatDateToYYYYmmdd(that.data.attachCertEndDate):'25001231'),
      attachCountyCode:that.data.certTypeIsPSPT?arrayUtil.getCountrysCodeByIndex(countrys,that.data.countrysindex):'',
      attachSex:that.data.isNotSSNO?arrayUtil.getKeyByIndex(attachSex,that.data.attachSexindex):arrayUtil.getKeyByIndex(attachSex,valid.getSex(formvalue.attachCertNo)),
      attachTel:formvalue.attachTel,
      attachBirthday:that.data.isNotSSNO?formvalue.attachBirthday:that.data.certBirthDay,
      attachHolderRelation:arrayUtil.getKeyByIndex(attachRelation,that.data.attachRelationindex),
      attachPOSCheck:arrayUtil.getKeyByIndex(attachPosCheck,that.data.attachPosCheckindex),
      applyUuid:that.data.applyUuid,
      dyFun:that.data.dyFun,
      dyCode:formvalue.verifyCode,
      iv:app.globalData.iv,
      encryptedData:app.globalData.encryptedData,
      thirdSession:wx.getStorageSync('thirdSession')
    }
 
    api.saveAttachBaseInfo({
      data:formData,
      method:'POST',
      success:(res) =>{
        console.info(res.data.errorMsg);
        if(res.data.status =='true'){
              let uuid = res.data.applyUuid
              console.info(uuid);
              this.setData({
                applyUuid:uuid
              })
              //设置回话缓存uuid，成功提交时，销毁uuid
             wx.setStorageSync('attachCacheInfo', uuid);

             let isSSON = that.data.certTypeindex == 0?true:false;
             let isUploadFront = res.data.isfrontPhoto =='success'?true:false;
             let isUploadBack = res.data.isbackPhoto =='success'?true:false;
              wx.navigateTo({
                  url: '../picture/picture?uuid='+uuid+'&isSSON='+isSSON+'&isUploadFront='+isUploadFront+'&isUploadBack='+isUploadBack,
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
        } else{
          console.info(res.data.errorMsg);
          var error = res.data.message || res.data.errorMsg;
           console.info(res.data.isRedirect);
           if(res.data.isRedirect =="true"){
               that.setData({
                    submitdisabled:false
                    })
             console.info("跳转");
             wx.redirectTo({
               url: '../resultFail/resultFail?desc='+error
             })
            
           } else {
              that.showTips(error,that);
           }
        }
      
      
      //页面跳转代码
     //  uuid = 'fb09159c-a6f1-4f16-b13d-7374c6b30816'//临时使用
     //身份证为true其他为false
      //that.data.isNotSSNO
     


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