function sendByCode(that){
    var repeatClick = displayDyInfo(that);
    if(!repeatClick){
        return false;
    }
}
function cleanDyInfo(that){
	var globals = that.data.globals;
    clearInterval(globals.pop());
    that.setData({
        dycodeInfo:"发送",
        globals:globals,
        sendCodeState:false
    })
}
function displayDyInfo(that){
    var globals = that.data.globals
    var coundown = that.data.coundown
    var codestr = 's后重发'
        var clickValue = false;
        if(globals.length==0){
            var si = setInterval(function() {
                if(coundown > 0) {
                    that.setData({
                        dycodeInfo:coundown + codestr,
                        sendCodeState:true
                    })
                    coundown--
                } else if (coundown == 0) {
                    clearInterval(globals.pop())
                    that.setData({
                        dycodeInfo:"重新发送",
                        globals:globals,
                        sendCodeState:false
                    })
                }
            }, 1000);
            globals.push(si)
            that.setData({
                globals:globals
            })
            clickValue = true
            coundown = 60
        }
        return clickValue
}

module.exports={
    sendByCode:sendByCode,
    cleanDyInfo:cleanDyInfo
}
