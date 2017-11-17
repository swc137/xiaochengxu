const imgUrl = 'https://xiaochengxu.zhuniu.com';
const hostAddress = 'https://xiaochengxu.zhuniu.com';
const token = '55204e241819fac45ca44f1af2aad415';
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
const getBanner = (params) =>{
  wxRequest(params, hostAddress + '/api/banner?token=' + token)
};
//获取商家列表
const getStore = (params) => {
  wxRequest(params, hostAddress + '/api5/store?token=' + token + '&pagesize=8&page=1')
};
//获取商家详情
const getStoreDetail = (params, storeId) => {
  wxRequest(params, hostAddress + '/api5/store_detail?id=' + storeId + '&token=' + token)
};
//获取动态资讯
const getNews = (params) => {
  wxRequest(params, hostAddress + '/api/news_list?token=' + token + '&tuijian=1')
};
//获取资讯详情
const getNewsDetail = (params, news_id) => {
  wxRequest(params, hostAddress + '/api/news_detail?token=' + token + '&id=' + news_id)
};
//获取产品列表
const getProduct = (params) => {
  wxRequest(params, hostAddress + '/api/product_list?pagesize=6&page=1&token=' + token + '&tuijian=1')
};
//获取课程详情
const getProdectDetail = (params, product_id) => {
  wxRequest(params, hostAddress + '/api/product_detail?product_id=' + product_id + '&token=' + token)
};
//获取课程分类
const getCategory = (params) => {
  wxRequest(params, hostAddress + '/api/category?token=' + token)
};
//获取分类下的产品列表
const getProductById = (params,id) => {
  wxRequest(params, hostAddress + '/api/product_list?pagesize=100&page=1&token=' + token + '&type=1&category_id='+id)
};
//获取搜索产品列表
const getProductByKey = (params, keyword) => {
  wxRequest(params, hostAddress + '/api/product_list?pagesize=100&page=1&token=' + token + '&keyword=' + keyword)
};
//获取用户详情
const getUserInfo = (params) => {
  wxRequest(params, hostAddress + '/api/user_info?token=' + token + '&id=6')
};
//获取菜单详情
const getNavDetail = (params, page_name) => {
  wxRequest(params, hostAddress + '/api/page?page_name=' + page_name + '&token=' + token)
};
//获取订单列表
const getOrderList = (params, status) => {
  wxRequest(params, hostAddress + '/api/order_list?token=' + token + '&status=' + status)
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
  getStore: getStore,
  getStoreDetail: getStoreDetail,
  getNews: getNews,
  getNewsDetail: getNewsDetail,
  getProduct:getProduct,
  getProductById: getProductById,
  getProductByKey: getProductByKey,
  getUserInfo: getUserInfo,
  getCategory: getCategory,
  getProdectDetail: getProdectDetail,
  getNavDetail: getNavDetail,
  getOrderList: getOrderList,
  imgUrl: imgUrl,


  login: login,
  register: register
}
