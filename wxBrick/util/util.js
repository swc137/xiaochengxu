function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function dateCalc(interval,number,date){
  var tempDate = new Date(date);
  switch(interval){
    case "y":{
      tempDate.setFullYear(date.getFullYear() + number)
      return tempDate
      break
    }
    case "m":{
      tempDate.setMonth(date.getMonth() + number)
      return tempDate
      break
    }
    case "d":{
      tempDate.setDate(date.getDate() + number)
      return tempDate
      break
    }
    default : {
      tempDate.setDate(date.getDate() + number)
      return tempDate
      break
    }
  }
}
function bStartDate(){
   let currentDate = new Date();
   currentDate.setFullYear(currentDate.getFullYear()-20);
   return currentDate

}
//转换YYYY-MM-DD to YYYYMMDD
function formatDateToYYYYmmdd(str){
  return str.split('-').join('')

}
module.exports = {
  formatTime: formatTime,
  dateCalc:dateCalc,
  formatDateToYYYYmmdd:formatDateToYYYYmmdd,
  bStartDate:bStartDate
  
}
