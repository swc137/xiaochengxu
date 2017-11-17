const imgUrl = 'https://xiaochengxu.zhuniu.com';
const hostAddress = 'https://xiaochengxu.zhuniu.com/api';
const token = '55204e241819fac45ca44f1af2aad231';
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
  wxRequest(params, hostAddress + '/banner?token=' + token)
};
//获取产品分类
const getCategory = (params) => {
  wxRequest(params, hostAddress + '/category?token=' + token)
};
//获取产品列表
const getProductList = (params, pagesize, page, category_id) => {
  wxRequest(params, hostAddress + '/product_list?pagesize=' + pagesize + '&&page=' + page + '&&token=' + token + '&&category_id=' + category_id)
};
//获取产品详情
const getProdectDetail = (params,product_id) => {
  wxRequest(params, hostAddress + '/product_detail?product_id=' + product_id + '&&token=' + token)
};
//获取菜单详情
const getNavDetail = (params, page_name) => {
  wxRequest(params, hostAddress + '/page?page_name=' + page_name + '&&token=' + token)
};
//提交数据
const forSubmit = (params) => {
  wxRequest(params, hostAddress + '/saveUserDesigner?token=' + token)
};
//获取设计师
const getDesgin = (params, pagesize) => {
  wxRequest(params, hostAddress + '/zxDesignerList?token=' + token + '&pagesize=' + pagesize)
};
//获取设计师详情
const getDesginDetail = (params, id) => {
  wxRequest(params, hostAddress + '/zxDesignerDetails?token=' + token + '&id=' + id)
};
 
module.exports = {
  getBanner: getBanner,
  getCategory: getCategory,
  getProductList: getProductList,
  getProdectDetail: getProdectDetail,
  getNavDetail: getNavDetail,
  imgUrl: imgUrl,
  getDesgin: getDesgin,
  getDesginDetail: getDesginDetail,
  forSubmit: forSubmit
}
