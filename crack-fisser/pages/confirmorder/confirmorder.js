
// pages/confirmorder/confirmorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNO: '', //订单编号
    defaultAddress: {}, // 地址对象
    totalCost: 0, // 费用
    days: 0, // 用时
    productList: [], // 订单列表
    noAddress: false, // 有无地址标示
    phone:'', // 手机号
    multiArray: [['今天', '明天', '后天']],
    // objectMultiArray: [
    //   [
    //     {
    //       id: 0,
    //       name: '今天'
    //     },
    //     {
    //       id: 1,
    //       name: '明天',
    //     },
    //     {
    //       id: 2,
    //       name: '后天',
    //     }
    //   ]
    // ],
    multiIndex: [0, 0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPage(options.uniqueCodeList);
    this.todayDete();
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
    console.log('======:'+this.strToDate('20181226103800'));
    console.log('======:'+options);
    
    var self = this;
    // 编辑完成
    var data = {
      userId: 66,
      uniqueCodeList: options
    }
    var res = {
      "data": {
        "code": "200",
        "message": "成功",
        "data": {
          "orderNO": "20190102621465",
          "days": "1.5",
          "productList": [{
            "img": "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/positive.png",
            "cost": 100,
            "uniqueCode": "cart_5464118278789915",
            "describe": "鞋头／斜眼片／护条人造皮纯黑鞋面和鞋舌人造皮纯红",
            "productName": "PLUM FOG"
          }, {
            "img": "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/positive.png",
            "cost": 100,
            "uniqueCode": "cart_5464021455794990",
            "describe": "鞋腰鳄鱼皮纯蓝",
            "productName": "PLUM FOG"
          }],
          "totalCost": 100,
          "defaultAddress": {
            "id": 26,
            "userId": 66,
            "name": "红大姐",
            "phone": "18888888888",
            "province": "浙江省",
            "provinceCode": 330000,
            "city": "杭州市",
            "cityCode": 330100,
            "district": "江干区",
            "districtCode": 330104,
            "address": "1区1号楼102",
            "isDefault": 1,
            "createTime": 1545274736000,
            "updateTime": 1545274736000
          }
        }
      }
    }
    // wx.request({
    //   url: 'http://192.168.1.125:8080/api/htt/app/order/shopGenOrder',
    //   data: data,
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
        console.log("生成订单返回的数据：" + JSON.stringify(res));
        if (res.data.code === '200') {
          if(res.data.data.defaultAddress === null) {
            self.setData({
              noAddress: true,
            })
          } else {
            // console.log(res.data.data.defaultAddress)
            self.setData({
              defaultAddress: res.data.data.defaultAddress,
              noAddress: false,
              phone: res.data.data.defaultAddress.phone.substr(0,3)+"****"+res.data.data.defaultAddress.phone.substr(7)
            })
          }
          self.setData({
            orderNO: res.data.data.orderNO,
            days: res.data.data.days,
            totalCost: res.data.data.totalCost,
            productList: res.data.data.productList
          })
        }
        // console.log(self.data.defaultAddress)
        
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })
  },
  strToDate: function(str) {
    var year, month, day, hh, mm, ss;
    if (str.length == 8) {
        year = str.substr(0, 4);
        month = str.substr(4, 2);
        day = str.substr(6, 2);
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else if (str.length == 14) {
        year = str.substr(0, 4);
        month = str.substr(4, 2);
        day = str.substr(6, 2);
        hh = str.substr(8, 2);
        mm = str.substr(10, 2);
        ss = str.substr(12, 2);
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hh), parseInt(mm), parseInt(ss));
    } else {
        return str;
    }
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
    function GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth()+1;//获取当前月份的日期
      var d = dd.getDate();
      return y+"-"+m+"-"+d;
    }
    console.log(multiArray[0][oneIndex] + GetDateStr(oneIndex));
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
   * 支付
   */
  orderPay() {
    var self = this;
    var receiveStartTime = (new Date("2018/12/20 14:00:00")).getTime();
    console.log(receiveStartTime);
    var receiveEndTime = (new Date("2018/12/20 15:00:00")).getTime();
    console.log(self.data.defaultAddress);
    if (self.data.defaultAddress === null){
      return
    }
    var data={
      userId: 66,
      orderNO: self.data.orderNO, // 订单编号
      receiveAddId: self.data.defaultAddress.id, // 取货地址ID
      deliveryAddId: self.data.receiveAddId, // 收货地址ID
      receiveStartTime: receiveStartTime / 1000, // 取货开始时间
      receiveEndTime: receiveEndTime / 1000, // 取货结束时间
    }
    console.log(data)
    // wx.request({
    //   url: 'http://192.168.1.125:8080/api/htt/app/order/pay',
    //   data: data,
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     console.log("支付接口返回的数据：" + JSON.stringify(res))
        
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })
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