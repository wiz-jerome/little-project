// pages/afterSale/afterSale.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    tempFiles: [],
    success: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  openPhoto(e) {
    var self = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(JSON.stringify(res));
        // tempFilePath可以作为img标签的src属性显示图片
        var array = res.tempFiles;
        for (let index = 0; index < array.length; index++) {
          self.data.tempFiles.push(array[index].path);
          
        }
        
        console.log(res.tempFiles)

        self.setData({
          tempFiles: self.data.tempFiles
        })
    console.log(self.data.tempFiles)

      }
    })
  }, 
  submitApply(e){
    var self = this;
    if (this.data.value == ''){
      wx.showToast({
        icon: 'none',
        title: '请填写文字',
        duration: 3000
      })
      return
    } else if (this.data.tempFiles.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请上传图片',
        duration: 3000
      })
      return
    } else {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})