const hostAddress = 'https://zazhishe.zhuniu.com';
const wxRequest = (params,url) =>{
    var reqMethod = params.method || 'GET'
    wx.request({
      url: url,
      data: params.data || {},
      method: reqMethod, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {
         //  'Accept':'application/json',
           'content-type':'application/x-www-form-urlencoded'
       }, // 设置请求的 header
      success: function(res){
          //console.info(res);
       if(params.success){
           params.success(res);
       }
      },
      fail: function(res) {
        if(params.fail){
            params.fail(res);
        }
      },
      complete: function(res) {
        if(params.complete){
            params.complete(res);
        }
      }
    });
};
//保存公司信息
const save_company_info = (params) =>{
  wxRequest(params, hostAddress + '/api/save_baoming')
};
//添加人员
const save_person_info = (params) => {
  wxRequest(params, hostAddress + '/api/save_people')
};
//人员列表
const show_people = (params) => {
  wxRequest(params, hostAddress + '/api/show_people')
};
//已报报名 
const check_baoming = (params) => {
  wxRequest(params, hostAddress + '/api/check_baoming')
};
//获取会议详情 
const get_huiyi = (params) => {
  wxRequest(params, hostAddress + '/api/get_huiyi_info')
};
//获取会议主题
const get_huiyi_theme = (params) => {
  wxRequest(params, hostAddress + '/api/get_huiyi_theme')
};
//签到
const get_sign = (params) => {
  wxRequest(params, hostAddress + '/mini/save_user_phone')
};
//获取首页北京
const get_banner = (params) => {
  wxRequest(params, hostAddress + '/api/banner')
};
//获取报名企业信息
const get_companyinfo = (params) => {
  wxRequest(params, hostAddress + '/api/get_company_info')
};
//获取用户报名信息
const get_memberinfo = (params, member_id) => {
  wxRequest(params, hostAddress + '/api/get_member_info?member_id=' + member_id)
};


module.exports = {
  hostAddress: hostAddress,
  save_company_info: save_company_info,
  save_person_info: save_person_info,
  show_people: show_people,
  check_baoming: check_baoming,
  get_huiyi: get_huiyi,
  get_huiyi_theme: get_huiyi_theme,
  get_sign: get_sign,
  get_banner: get_banner,
  get_companyinfo: get_companyinfo,
  get_memberinfo: get_memberinfo
}
