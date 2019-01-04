// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allarray: {}, // 全部省
    allCityarray: {}, // 全部市
    provarray: [],   // 全部省名
    cityarray: [], // 全部市名
    areaarray: [], // 全部区名
    provindex: 0,  // 省索引
    cityindex: 0, // 市索引
    areaindex: 0, // 区索引
    selectProvince: "", // 选中的省
    selectCity: "", // 选中的市
    selectArea: "", // 选中的区
    provinceCityArea: '', // 选中的省市区
    parentId: 0,
    cityId: 0,
    areaId: 0,
    valueName: '',
    valuePhone: '',
    valueDetailedAddress: '',
    switchKey: false,
  },
  onShow: function () {
    console.log('onshow!!!');
    this.getProvince();
  },
  // 获取姓名
  bindKeyInput(e) {
    this.setData({
      valueName: e.detail.value
    })
  },
  // 获取手机号
  bindPhoneInput(e) {
    this.setData({
      valuePhone: e.detail.value
    })
  },
  // 获取详细地址
  bindDetailedAddress(e){
    this.setData({
      valueDetailedAddress: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log(e)
    // console.log(e.currentTarget.dataset.select)
    console.log('省发送选择改变，携带值为', e.detail.value)
    this.setData({
      provindex: e.detail.value,
      provinceCityArea: this.data.provarray[e.detail.value] + this.data.cityarray[this.data.cityindex] + this.data.areaarray[this.data.areaindex]
    })
    console.log(this.data.provinceCityArea+'!!!!!!!!!!!!!!111')
    this.getCity();
  },
  bindcityChange: function(e) {
    console.log(e)
    console.log('市发送选择改变，携带值为', e.detail.value)
    this.setData({
      cityindex: e.detail.value,
      provinceCityArea: this.data.provarray[this.data.provindex] + this.data.cityarray[e.detail.value] + this.data.areaarray[this.data.areaindex]
    })
    console.log(this.data.provinceCityArea+'!!!!!!!!!!!!!!222')
    this.getArea();
  },
  bindareaChange: function(e) {
    this.data.areaId = this.data.selectCity[e.detail.value].areaCode; //选中区编号
    console.log(' 选中的区编号：', this.data.areaId)
    this.setData({
      areaindex: e.detail.value,
      provinceCityArea: this.data.provarray[this.data.provindex] + this.data.cityarray[this.data.cityindex] + this.data.areaarray[e.detail.value]
    })
    console.log(this.data.provinceCityArea+'!!!!!!!!!!!!!!333')
  },
  // 点击省框框
  setProvin(e){
    this.getProvince();
  },
  // 点击市框框
  setCity(e){
    this.getCity();
  },
  // 点击区框框
  setArea(e){
    this.getArea();
  },
  // 设为默认
  switchChange: function (e){
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      switchKey: e.detail.value
    })
  },
  // 获取省
  getProvince(){
    var self = this;
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/commonData/getProvince',
      method: 'GET',
      success: function (res) {
        console.log("省市成功的数据："+JSON.stringify(res))
        console.log(res.data.code)
        if (res.statusCode !== 200 && res.data.code !== 200){
          return
        }
        var arr = [];
        const length = res.data.data.length;
        for (let i = 0; i < length; ++i) {
          arr.push(res.data.data[i].areaName)
        }
        self.setData({
          provarray: arr,
          allarray: res.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 获取市
  getCity(e){
    var self = this;
    var idx = this.data.provindex;

    console.log(this.data.allarray)
    var parentId = this.data.allarray[idx].areaCode;
    self.data.parentId = parentId; //选中省编号
    console.log(this.data.allarray[idx].areaCode);
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/commonData/getCity?parentId=' + parentId,
      method: 'GET',
      success: function (res) {
        console.log("城市成功的数据："+JSON.stringify(res))
        // var objArray = [];
        var arr = [];
        const length = res.data.data.length;
        for (let i = 0; i < length; ++i) {
          arr.push(res.data.data[i].areaName);
        }
        self.setData({
          cityarray: arr,
          selectProvince: res.data.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 获取区
  getArea(e){
    var self = this;
    var idx = this.data.cityindex;
    var parentId = this.data.selectProvince[idx].areaCode;
    self.data.cityId = parentId; //选中市编号
    console.log(this.data.selectProvince[idx].areaCode);
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/commonData/getDistrict?parentId=' + parentId,
      method: 'GET',
      success: function (res) {
        console.log("区域成功的数据："+JSON.stringify(res))
        // var objArray = [];
        var arr = [];
        const length = res.data.data.length;
        for (let i = 0; i < length; ++i) {
          arr.push(res.data.data[i].areaName);
        }
        self.setData({
          areaarray: arr,
          selectCity: res.data.data
        })
        console.log(self.data.selectCity)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 保存地址
  insertAddress(){
    if(this.data.valueName == ''){
      wx.showToast({
        icon: 'none',
        title: '姓名填写为空～',
        duration: 2000
      })
      return
    }
    if(!(/^1[34578]\d{9}$/.test(this.data.valuePhone))){ 
      wx.showToast({
        icon: 'none',
        title: '手机号码有误，请重填',
        duration: 2000
      }) 
      return 
    }

    if(this.data.cityarray[this.data.cityindex] == undefined || this.data.provarray[this.data.provindex] == undefined || this.data.areaarray[this.data.areaindex] == undefined){
      wx.showToast({
        icon: 'none',
        title: '请选择地址',
        duration: 2000
      })
      return
    }
    if(this.data.valueDetailedAddress == ''){
      wx.showToast({
        icon: 'none',
        title: '详细地址填写为空～',
        duration: 2000
      })
      return
    }

    console.log('==========={'+ this.data.provarray[this.data.provindex] + this.data.cityarray[this.data.cityindex] + this.data.areaarray[this.data.areaindex] + '}=============')
    console.log(this.data.selectCity[this.data.areaindex].areaCode)
    console.log('省名：'+this.data.provarray[this.data.provindex] + '，省编号：' + this.data.parentId);
    console.log('市名：'+this.data.cityarray[this.data.cityindex] + '，市编号：' + this.data.cityId);
    console.log('区名：'+this.data.areaarray[this.data.areaindex] + '，区编号：' + this.data.areaId);
    var parms = {},
    parms = {
      'userId': '66', // 用户id
      'name': this.data.valueName, // 	昵称
      'phone': this.data.valuePhone, // 手机号码
      'province': this.data.provarray[this.data.provindex], // 	省份名字
      'provinceCode': this.data.parentId, // 	省份编码
      'city': this.data.cityarray[this.data.cityindex], // 城市
      'cityCode': this.data.cityId, // 城市编码
      'district': this.data.areaarray[this.data.areaindex], // 区域
      'districtCode': this.data.areaId, // 区域编码
      'address': this.data.valueDetailedAddress, // 详细地址
      'isDefault': this.data.switchKey===false? 0:1 // 是否默认地址 0否 1是
    };
    console.log('地址如下：')
    console.log(parms)
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/user/insertAddress',
      data: parms,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("成功的数据：" + JSON.stringify(res));
        if (res.data.code === '200') {
          wx.showToast({
            icon: 'none',
            title: '添加地址成功',
            duration: 1000
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../myaddress/myaddress',
            })
          }, 1000);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})