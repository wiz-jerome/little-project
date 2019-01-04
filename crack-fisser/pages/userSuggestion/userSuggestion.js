// pages/userSuggestion/userSuggestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    success: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 提交建议
   */
  insertSuggestion (e) {
    var self = this;
    if (this.data.value == ''){
      wx.showToast({
        icon: 'none',
        title: '填写为空～',
        duration: 2000
      })
    } else {
      var parms = {
        'content': this.data.value, // 用户id
        'userId': 66
      };
      console.log(parms);
      wx.request({
        url: 'http://192.168.1.125:8080/api/htt/app/user/insertSuggestion',
        data: parms,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log("成功的数据：" + JSON.stringify(res))
          if(res.data.code === "200"){
            self.setData({
              success: true
            })
            // 三秒后消失
            setTimeout(() => {
              self.setData({
                success: false
              })
            }, 3000);
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  },
  /**
   * 获取用户输入内容
   */
  bindTextAreaBlur(e) {
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  /**
   * 提交
   */
  submit(e){
    console.log('点击提交后的数据:'+this.data.value)
  },
})