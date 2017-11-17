
module.exports = {
  popBubble: popBubble
}

  function popBubble(that){
    // 动画
    that.setData({
      bubIsHide: false
    })

    that.animation.opacity(1).step({duration: 1000})
    that.setData({
      //输出动画
      animationData: that.animation.export()
    })

    setTimeout(function() {
        that.animation.opacity(0).step({duration: 1000})
        that.setData({
          //输出动画
          animationData: that.animation.export()
        })
    }.bind(that), 1000)

    setTimeout(function() {
        that.setData({
          bubIsHide: true,
          submitdisabled:false //按钮恢复可点
        })
    }.bind(that), 2000)

  }

