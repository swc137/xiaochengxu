const imgUrl = 'https://xiaochengxu.zhuniu.com';
const hostAddress = 'https://xiaochengxu.zhuniu.com';
const token = 'a831361fcc96f245591fce3b0ae64499';
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
  wxRequest(params, hostAddress + '/api/banner?token=' + token)
};
//获取产品分类
const getCategory = (params) => {
  wxRequest(params, hostAddress + '/api/category_one?parent_id=0&token=' + token)
};
//二级分类
const getCategory2 = (params,id) => {
  wxRequest(params, hostAddress + '/api/category_one?parent_id=0&token=' + token + '&parent_id='+id)
};
//获取产品列表
const getProductList = (params, pagesize, page, category_id) => {
  wxRequest(params, hostAddress + '/api/product_list?pagesize=' + pagesize + '&page=' + page + '&token=' + token + '&category_id=' + category_id)
};
//获取项目列表
const projectList = (params, pagesize, page) => {
  wxRequest(params, hostAddress + '/api/news_list?pagesize=' + pagesize + '&page=' + page + '&token=' + token)
};
//获取产品详情
const getProdectDetail = (params,product_id) => {
  wxRequest(params, hostAddress + '/api/product_detail?product_id=' + product_id + '&token=' + token)
};
//获取项目详情
const projectDeatil = (params, id) => {
  wxRequest(params, hostAddress + '/api/news_detail?id=' + id + '&token=' + token)
};
//获取菜单详情
const getNavDetail = (params, page_name) => {
  wxRequest(params, hostAddress + '/api/page?page_name=' + page_name + '&token=' + token)
};

module.exports = {
  getBanner: getBanner,
  getCategory: getCategory,
  getProductList: getProductList,
  getProdectDetail: getProdectDetail,
  imgUrl: imgUrl,
  projectList: projectList,
  projectDeatil: projectDeatil,
  getCategory2: getCategory2,
  getNavDetail: getNavDetail
}
