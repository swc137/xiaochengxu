function trim(E){
    return (E||"").replace(/^\s+|\s+$/g,"")
}
function required(value){
    return trim(value).length<=0
}
function wordByteLen(s,length){
    var len = 0
    for(var i=0,j=s.length;i<j;i++){
        var c = s.charCodeAt(i)
        if((c >=0x0001 && c <=0x007e) || 0Xff60 <= c && c <= 0Xff9f){
            len ++
        } else {
            len +=2
        }
       
       
    }
     console.info(len)
     return len<=length?false:true
}
function ChineseAbcDotSpace(s,certType){
    if(certType =='1'){
        return /^([\u4e00-\u9fa5A-Za-z.]+\s?)*[\u4e00-\u9fa5A-Za-z.]+$/.exec(s)
    }
    return /^[\u4e00-\u9fa5A-Za-z.]+$/.exec(s);
}
function LowerAbcBlank(s){
    return /^[A-Z\s]+$/.exec(s)
}
function trimSpace(str){
    var asciiblankregex = /\s/g;
    var unicodeblankregex = /[\u3000]/g;
    str = str.replace(asciiblankregex,"");
    return str.replace(unicodeblankregex,"");
}
function addBlank(str){
    str = trimSpace(str);
    var regex = /([\u0391-\uFFE5]+)/g;
    var repalcement = " $1 ";
    return str.replace(regex,repalcement);
}
function OEOFVerifyLength(str,length){
    str = addBlank(str);
    return wordByteLen(str,length)
}
function valCertId(sId){
    var aCity = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	};
    var iSum = 0;
	var info = "";
	// 是否15、18位数字或17位数字加x
	if (!(/^\d{17}([0-9]|X|x)$/.test(sId))) {
		// alert('身份证号长度不对，或不符合格式要求.');
		return false;
	}
    sId = sId.replace(/x$/i, "a");
	// 非法地区
	if (aCity[parseInt(sId.substr(0, 2))] == null) {
		// alert('地区不对！');
		return false;
	}
	var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-"
			+ Number(sId.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	// 非法生日
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
			.getDate())) {
		// alert("生日有误！");
		if(!whiteList(sBirthday)){
			return false;			
		}
	}
	for (var i = 17; i >= 0; i--)
		iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
	// 非法证号
	if (iSum % 11 != 1) {
		// alert('非法证号！');
		return false;
	}
	return true;
}
//出生年月白名单
function whiteList(str){
    return "1960-4-10,1986-5-4,1987-4-12,1988-4-10,1989-4-16,1990-4-15,1991-4-14".lastIndexOf(str)>=0;
}
//校验其他证件类型证件号
function isOtherTypeAttach(str){
    return /^[\u4e00-\u9fa5\(\)A-Za-z0-9]+$/.exec(str);
}
//出生日期格式校验
function birthFormat(str){
    if(str ==""|| str==null || str==undefined){
        return true;
    }
    var strReg = /^[12]\d{7}$/;
    if(!strReg.test(str)){
        return false;
    }
    var year = str.substr(0,4);
    var month = str.substr(4,2);
    var day = str.substr(6,2);
    var days = [31,29,31,30,31,30,31,31,30,31,30,31];
    if((month <1 || month >12) ||(day < 1 || day > days[month-1]) ||month ==2 && !isLeapYear(year) && day >28){
        return false;
    }
    return true;
}
//闰年判断
function isLeapYear(year){
    if((year % 4 ==0 && year % 100 !=0) || (year % 400 == 0)){
        return true;
    }
    return false;
}
//获得年龄
function getAge(str){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var day = now.getDate();
    var birthYear = parseInt(str.substr(0,4));
    var birthMonth = parseInt(str.substr(4,2));
    var birthDay = parseInt(str.substr(6,2));
    var old = year - birthDay;
    if(month-birthMonth>0){
        old = old + 1;
    }else if(month-birthMonth ==0){
        if(day-birthDay > 0){
            old = old +1;
        }else if (day-birthDay<0){
            old = old -1;
        }
    }else{
        old = old -1;
    }
    return old;
}
function isMobile(str){
    var result = true;
    if(str.length !=11){
        result = /^\d*$/.exec(str);
        return result;
    }
    if(trim(str).length >0){
        result = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.exec(str);
    }
    return result;
}
function verifyMobileLength(str,length){
    var result = true;
    if(trim(str).length > 0){
        result = (trim(str).length == length);
    }
    return result;
}
function countBirth(certNo){
    var year = certNo.substr(6,4);
    var month = certNo.substr(10,2);
    var day = certNo.substr(12,2);
    return year+month+day
}
function getSex(certNo){
    if(certNo.length == 15){
        certNo = certId15To18(certNo)
    }
    var sexnum = certNo.substring(16,17);
    if(sexnum % 2 ==0){
        return 1
    } 
    return 0

}
function certId15To18(num) {
	
	// 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	var nTemp = 0, i;
	var num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
	
	for(i = 0; i < 17; i ++) {
		nTemp += num.substr(i, 1) * arrInt[i];
	}
	num += arrCh[nTemp % 11];
	return num;
}
//主卡身份证有效期校验为疑似欺诈校验
function creditIdValSupp(beginDate,endDate,birthday) {
	
	var beginDateSub = beginDate.substring(0,4);
	var endDateSub = endDate.substring(0,4);
	
	var temp = endDateSub - beginDateSub;
	var str = ((beginDate - birthday) / 10000) + "";
	var dd = str.split(".");
	
	var B = dd[0];
	var A = "wrong";
	
	if (temp==5) {
		A="5";
	} 
	if (temp==10) {
		A="10";
	}
	if (temp==20) {
		A="20";
	}
	if (temp>20) {
		A="forever";
	}
	if (temp==0) {
		A="0";
	}
	if (temp==1) {
		A="1";
	}
	
	B = B + "";
	
	if (A == "5" && (B > 16 || B == 16)) {
		return false;
	}
	if (A == "10" && (B > 25 || B < 16)) {
		return false;
	}
	if (A == "20" && (B > 45 || B < 26)) {
		return false;
	}
	if (A == "forever" && (B < 46)) {
		return false;
	}
	if (A != "5" && A != "10" && A != "20" && A != "forever" && A != "1" && A != "0") {
		return false;
	}
	return true;
}
function carddigitNumber(value){
	   return trim(value).length<16
}
function cardAbcDotSpace(value){
	   if(value == undefined){
			return false;
		}else if(!/^\d{16}$/.test(value)){
			return false;
		}else if(/[^\u4E00-\u9FA5a-zA-Z0-9]/.test(value)){
	        return false;
	    }
		return true;
}
function cardNoValid(value){
    var isEven = true;// 卡号长度是否为偶数
	if (value.length % 2 === 1) {
		isEven = false;
	}
	var i;
	var sum = 0;
	for (i = 0; i < value.length; i++) {// 偶数位卡号奇数位上数字*2，奇数位卡号偶数位上数字*2。
		// 计算权重
		var weight = 1;
		if (i % 2 === 0 && isEven) {// 位号位为偶数位且卡号长度是为偶数
			weight = 2;
		} else if (i % 2 === 1 && !isEven) {// 位号位为奇数位且卡号长度是为奇数
			weight = 2;
		}

		var factor = parseInt(value.charAt(i), 10) * weight;
		if (factor > 9) {// 大于9的数减9
			factor -= 9;
		}
		sum += factor;
	}
	
	if (sum % 10 === 0) {
		return true;
	} else {
		return false;
	}
}
function dyCode(value){
    return /^\d{6}$/.test(value);
}
function isMoreCard(value){
    var cardBin = value.substr(0,6);
    if(cardBin =="622284"){
        return true;
    }
    return false;
}
module.exports = {
    trim:trim,
    required:required,
    wordByteLen:wordByteLen,
    ChineseAbcDotSpace:ChineseAbcDotSpace,
    LowerAbcBlank:LowerAbcBlank,
    OEOFVerifyLength:OEOFVerifyLength,
    valCertId:valCertId,
    isOtherTypeAttach:isOtherTypeAttach,
    birthFormat:birthFormat,
    getAge:getAge,
    isMobile:isMobile,
    countBirth:countBirth,
    verifyMobileLength:verifyMobileLength,
    getSex:getSex,
    creditIdValSupp:creditIdValSupp,
    carddigitNumber:carddigitNumber,
    cardAbcDotSpace:cardAbcDotSpace,
    cardNoValid:cardNoValid,
    dyCode:dyCode,
    isMoreCard:isMoreCard
}