const imgUrl = 'https://xiaochengxu.zhuniu.com';
const hostAddress = 'https://xiaochengxu.zhuniu.com';
const token = '3dd9b8525f3f221040b4a90ed1c7e6b3';
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
//获取轮播图
const getBanner = (params, category_id) =>{
  wxRequest(params, hostAddress + '/api/banner?category_id=51&token=' + token + '&category_id=' + category_id)
};
//获取产品分类
const getCategory = (params) => {
  wxRequest(params, hostAddress + '/api/category?token=' + token)
};
//获取产品列表
const getProductList = (params, pagesize, page, category_id) => {
  wxRequest(params, hostAddress + '/api/product_list?pagesize=' + pagesize + '&page=' + page + '&token=' + token + '&category_id=' + category_id)
};
//获取产品详情
const getProdectDetail = (params,product_id) => {
  wxRequest(params, hostAddress + '/api/product_detail?product_id=' + product_id + '&token=' + token)
};
//获取菜单详情
const getNavDetail = (params, page_name) => {
  wxRequest(params, hostAddress + '/api/page?page_name=' + page_name + '&token=' + token)
};
//获取热门配件
const getLimit = (params) => {
  wxRequest(params, hostAddress + '/api/advertise?&limit=3&token=' + token)
};
//获取新闻资讯
const getNews = (params, tuijian) => {
  wxRequest(params, hostAddress + '/api/news_list?token=' + token + '&tuijian=' + tuijian)
};
//获取新闻详情
const getNewsDetail = (params, news_id) => {
  wxRequest(params, hostAddress + '/api/news_detail?token=' + token + '&id=' + news_id)
};
//登录
const login = (params, username,password) => {
  wxRequest(params, hostAddress + '/member/login_in?token=' + token + '&username=' + username + '&password=' + password)
};
//注册
const register = (params, info) => {
  wxRequest(params, hostAddress + '/member/register?token=' + token + '&username=' + info.username + '&mobile=' + info.mobile + '&password=' + info.password + '&repassword=' + info.repassword + '&email=' + info.email)
};
// //验证是否登录
// const isLogin = (params, info) => {
//   wxRequest(params, hostAddress + '/member/is_login?token=' + token)
// };

 
module.exports = {
  getBanner: getBanner,
  getCategory: getCategory,
  getProductList: getProductList,
  getProdectDetail: getProdectDetail,
  getNavDetail: getNavDetail,
  imgUrl: imgUrl,
  getLimit: getLimit,
  getNews: getNews,
  getNewsDetail: getNewsDetail,
  login: login,
  register: register
}
