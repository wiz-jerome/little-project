// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: {},
    phone: '',
    multiArray: [['今天', '明天', '后天']],
    multiIndex: [0, 0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.initPage(options.orderNO);
    var nameArr = [];
    var multiArray = this.data.multiArray;
    for(var i = 0; i < 9; i++) {
      var name = '';
      name = (9+i)+':00~'+(9+i+1)+':00';
      nameArr.push(name);
    }
    // arr[1] = timeArr;
    multiArray[1] = nameArr;
    this.setData({
      multiArray: multiArray
    })


  
  },
  // 页面初始化
  initPage(options){
    var self = this;
    console.log(options)
    var data = {
      // orderNO: options
      orderNO: 20181220795009
    }
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/order/detail',
      data: data,
      success: function (res) {
        console.log("成功的数据：" + JSON.stringify(res))
        res.data.data.orderStatus = 5
        self.setData({
          productList: res.data.data,
          phone:  res.data.data.receiveAdd.phone.substr(0,3)+"****"+res.data.data.receiveAdd.phone.substr(7)
        })

      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

    // 根据此时时间段判断预约取件时间
    todayDete(e){
      var multiArray = this.data.multiArray;
      var date = new Date();
      var nowHour = date.getHours(); // 此刻时段
      // var nowHour = 15; // 此刻时段
      // console.log(nowHour)
      if (nowHour < 9) {
        /** 早上9点之前 */
        var start = 9;
        this.timeCirculation(start,multiArray);
        
      }else if (nowHour >= 17) {
        /** 下午5点之前 */
        // var m = arr[0].splice(0, 1);
        var r = multiArray[0].splice(0, 1);
        console.log(this.data.multiArray);
      } else {
        /** 正常时间段 */
        var start = nowHour+2;
        if (start >= 18){
          multiArray[1] = ['两个小时内'];
        }else{
          this.timeCirculation(start,multiArray);
          multiArray[1].unshift('两个小时内')
        }
      }
      this.setData({
        // objectMultiArray: arr,
        multiArray: multiArray
      })
    },
  
    // 时间循环
    timeCirculation(start,multiArray){
      console.log(start)
      // var timeArr = [];
      var nameArr = [];
      var len = 18-start;
      for(var i = 0; i < len; i++) {
        var name = '';
        name = (start+i)+':00~'+(start+i+1)+':00';
        nameArr.push(name);
      }
      multiArray[1] = nameArr;
  
      this.setData({
        multiArray: multiArray
      })
    },
  
    // 预约取件时间选择
    bindMultiPickerChange(e) {
      var multiArray = this.data.multiArray;
      console.log(this.data.multiArray)
      console.log('picker发送选择改变，携带值为', e.detail.value)
      var oneIndex = e.detail.value[0];
      var twoIndex = e.detail.value[1];
      console.log(oneIndex+'===='+twoIndex)
      console.log(multiArray[0][oneIndex]+'==='+multiArray[1][twoIndex])
      this.setData({
        multiIndex: e.detail.value
      })
    },
    bindMultiPickerColumnChange(e) {
      // console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
      const data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      }
      data.multiIndex[e.detail.column] = e.detail.value
      switch (e.detail.column) {
        case 0:
          switch (data.multiIndex[0]) {
            case 0:
              // data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']
              break
            case 1:
              // data.multiArray[1] = ['鱼', '两栖动物', '爬行动物']
              break
            case 2:
              var date = new Date();
              var nowHour = date.getHours();
              if (nowHour >= 17) {
                // data.multiArray[1] = ['明天', '后天'];
              } else {
                // data.multiArray[1] = ['今天', '明天', '后天']        
              }
              break
          }
          data.multiIndex[1] = 0
          break
      }
      console.log(data.multiIndex)
      this.setData(data)
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