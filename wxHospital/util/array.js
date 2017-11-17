var api = require('api.js');
//根据数组下标获得对应的key,数组结构类似于[{key:'',value:''},...]
function getKeyByIndex(array,index){
    return array[index].key
}
//根据数组获取对应value集合，数组结构类似于[{key:'',value:''},...]，value集合类似于[value0,value1,value2,...]
function getValuesByArray(array,value){
    var values = [];
    if(array !='' && array.length >0){
        for(var index=0,length = array.length; index < length;index++){
          values.push(array[index][value])
        }
    }
    return values
}
//根据数组获取对应value集合，数组结构类似于[{key:'',value:''},...]，value集合类似于[value0,value1,value2,...]
function getCountrysByArray(array){
    var values = [];
    if(array !='' && array.length >0){
        for(var index=0,length = array.length; index < length;index++){
            values.push(array[index].countryName)
        }
    }
    return values
}
function getCountrysCodeByIndex(array,index){
    return array[index].code
}
function getValueByIndex(array,index){
    return array[index].value
}
//根据数组获取对应value集合，数组结构类似于[{key:'',value:''},...]，value集合类似于[value0,value1,value2,...]
function getBannerByArray(array, value) {
  var values = [];
  if (array != '' && array.length > 0) {
    for (var index = 0, length = array.length; index < length; index++) {
      values.push(api.imgUrl+array[index][value])
    }
  }
  return values
}
module.exports={
    getKeyByIndex:getKeyByIndex,
    getValuesByArray:getValuesByArray,
    getValueByIndex:getValueByIndex,
    getCountrysByArray:getCountrysByArray,
    getCountrysCodeByIndex:getCountrysCodeByIndex,
    getBannerByArray:getBannerByArray
}