// page/one/index.js
Page({
  data:{
    swiperHeight: 59, // swiper高度初始值
    marginTop: 8, // 轮播图片的margin-top初始值
    open : false,
    mark: 0,
    newmark: 0,
    istoright:true,
    imagesList: [], // 轮播图片
    whiteImgs: [], // 白色轮播图片
    imgurlList: {}, // 首页数据
    imgUrls: [
      'http://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/file/%E7%81%B0%E9%9E%8B.png',
      'http://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/file/%E9%9E%8B%E5%AD%90.png',
      '../../image/vans-bg.jpg'
    ],
    indicatorDots: true,
    duration: 1000,
    editorialshow: true,
    partList: [], // 部位
      // 材质
    textureList: [], // 材料数据
    colorList: [], // 颜色数据
    scrollshow: false, // 是否显示部位
    textureshow: false, // 是否显示材质
    colorshow: false, // 是否显示颜色
    trueshow: false, // 是否显示底部对勾与返回
    masktype: false,
    // 全屏滚蛋
    scrollindex:0,  //当前页面的索引值
    totalnum:3,  //总共页面数
    starty:0,  //开始的位置x
    endy:0, //结束的位置y
    critical: 100, //触发翻页的临界值
    margintop:0,  //滑动下拉距离
    backType: 'texture', // 返回按钮的指向 默认材质返回
    okType: 'one', // 完成按钮的指向 默认第一次点击完成
    productId: '1', // 产品ID
    positionId: '', // 部位ID
    materialId: '', // 材料ID
    colorId: '', // 颜色ID
    productName: '', // 产品名称
    positionName: '', // 部位名称
    materialName: '', // 材料名称
    colorName: '', // 颜色名称
    pricecar: false, // 底部加入购物车是否显示
    addcared: false, // 已加入购物车
    checkcar: false, // 查看购物车与支付金额
  },
  onShow: function(e){
    console.log('onshow!!!!!!!!!!!!!')
    var self = this;
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/product/index',
      // data: parms,
      // method: methods,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
      // var res = {
      //   "data": {
      //     "code": "200",
      //     "message": "成功",
      //     "data": {
      //       "name": "PLUM FOG",
      //       "imagesList": ["https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/positive.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/bottom.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/reverse.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/top.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/back.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/side.png"]
      //     }
      //   }
      // }
        console.log("成功的数据：" + JSON.stringify(res))
        self.setData({
          imgurlList: res.data.data,
          imagesList: res.data.data.imagesList,
          whiteImgs: res.data.data.imagesList,
          productName: res.data.data.name
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  // 底部按钮
  editorialClick(e){
    var dataset = e.currentTarget.dataset;
    var self = this;
    // 点击编辑设计
    if (dataset.index === '1'){
      wx.request({
        url: 'http://192.168.1.125:8080/api/htt/app/product/position',
        success: function (res) {
          // var res = {
          //   "data": {
          //     "code": "200",
          //     "message": "成功",
          //     "data": [{
          //       "img": "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/upper.png",
          //       "positionId": 1,
          //       "name": "鞋面和鞋舌"
          //     }, {
          //       "img": "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/waist.png",
          //       "positionId": 2,
          //       "name": "鞋腰"
          //     }, {
          //       "img": "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/head.png",
          //       "positionId": 3,
          //       "name": "鞋头／斜眼片／护条"
          //     }]
          //   }
          // }
          console.log("获取首页部位数据：" + JSON.stringify(res))
          self.setData({
            editorialshow: !self.data.editorialshow,
            scrollshow: !self.data.scrollshow,
            partList: res.data.data,
            swiperHeight: 55,
            marginTop: 4
          })
          
        },
        fail: function (err) {
          console.log(err)
        }
      })
    } else if(dataset.index === '2') {
      if (dataset.type === 'one') {
        console.log(self.data.okType)
        // 点击完成
        self.setData({
          editorialshow: !self.data.editorialshow,
          scrollshow: !self.data.scrollshow,
          swiperHeight: 59,
          marginTop: 8,
          imagesList: this.data.whiteImgs,
          okType: 'one'
        })
      } else if (dataset.type === 'two') {
        var data = {};
        data={
          userId: 66,
          productId: self.data.productId,
          positionId: self.data.positionId,
          materialId: self.data.materialId,
          colorId: self.data.colorId,
          productName: self.data.productName,
          positionName: self.data.positionName,
          materialName: self.data.materialName,
          colorName: self.data.colorName
        }
        console.log(data)
        // 编辑完成
        wx.request({
          url: 'http://192.168.1.125:8080/api/htt/app/product/prepared',
          data: data,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            // var res = {
            //   "data": {
            //     "code": "200",
            //     "message": "成功",
            //     "data": null
            //   }
            // }
            console.log("完成编辑返回的数据：" + JSON.stringify(res))
            if (res.data.code === '200') {
              self.setData({
                pricecar: true,
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.data.message,
                duration: 2000
              })
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    }
  },
  // 加入购物车
  addShopcar(e){
    var self = this;
    wx.request({
      url: 'http://192.168.1.125:8080/api/htt/app/product/insertShoppingCart',
      data: {
        userId: 66
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // var res = {
        //   "data": {
        //     "code": "200",
        //     "message": "成功",
        //     "data": null
        //   }
        // }
        console.log("加入购物车数据：" + JSON.stringify(res))
        // debugger
        if (res.data.code === '200'){
          self.setData({
            scrollshow: false,
            colorshow: false,
            addcared: true,
            checkcar: true
          })
          console.log(self.data.colorshow)
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })

  },
  closeAddcard(e){
    var self = this;
    self.setData({
      scrollshow: true,
      addcared: false
    })
  },
  // 部位与材质和颜色的切换
  textureClick(e){
    var dataset = e.currentTarget.dataset;
    var self = this;
    if (dataset.type === 'part'){
      wx.request({
        url: 'http://192.168.1.125:8080/api/htt/app/product/material?positionId=' + dataset.item.positionId,
        success: function (res) {
          // var res = {
          //   "data": {
          //     "code": "200",
          //     "message": "成功",
          //     "data": [{
          //       "materialName": "人造皮",
          //       "positionId": 3,
          //       "materialId": 1,
          //       "materialImage": "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/äººé ç®.jpg",
          //       "productName": "PLUM FOG",
          //       "imgList": ["https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/positive.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/bottom.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/reverse.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/top.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/back.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/side.png"]
          //     }]
          //   }
          // }
          console.log("点击部位获取材料数据：" + JSON.stringify(res))
          self.setData({
            textureshow: true,
            scrollshow: false,
            trueshow: true,
            textureList: res.data.data,
            positionName: dataset.item.name
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
      
    } else if(dataset.type === 'texture'){
      var item = dataset.item
      // console.log(item)
      wx.request({
        url: 'http://192.168.1.125:8080/api/htt/app/product/color?positionId=' + item.positionId + '&materialId=' + item.materialId,
        success: function (res) {
          // var res = {
          //   "data": {
          //     "code": "200",
          //     "message": "成功",
          //     "data": [{
          //       "colorName": "纯红",
          //       "positionId": 3,
          //       "colorId": 1,
          //       "colorCode": "Red",
          //       "materialId": 1,
          //       "RGB": "255,0,0",
          //       "productName": "PLUM FOG",
          //       "hexadecimal": "#FF0000",
          //       "imgList": ["https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼çº¢ï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼çº¢ï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼çº¢ï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼çº¢ï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼çº¢ï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼çº¢ï¼.png"]
          //     }, {
          //       "colorName": "纯蓝",
          //       "positionId": 3,
          //       "colorId": 2,
          //       "colorCode": "Blue",
          //       "materialId": 1,
          //       "RGB": "0,0,255",
          //       "productName": "PLUM FOG",
          //       "hexadecimal": "#0000FF",
          //       "imgList": ["https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼èï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼èï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼èï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼èï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼èï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼èï¼.png"]
          //     }, {
          //       "colorName": "纯黑",
          //       "positionId": 3,
          //       "colorId": 3,
          //       "colorCode": "Black",
          //       "materialId": 1,
          //       "RGB": "0,0,0",
          //       "productName": "PLUM FOG",
          //       "hexadecimal": "#000000",
          //       "imgList": ["https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼é»ï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼é»ï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼é»ï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼é»ï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼é»ï¼.png", "https://zhaocai-image.oss-cn-hangzhou.aliyuncs.com/img/éå¤´ï¼éç¼çï¼æ¤æ¡ï¼é»ï¼.png"]
          //     }]
          //   }
          // }
          console.log("点击材质获取颜色数据：" + JSON.stringify(res))
          self.setData({
            imagesList: item.imgList,
            colorshow: true,
            textureshow: false,
            colorList: res.data.data,
            backType: 'color',
            materialName: item.materialName
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    } else if (dataset.type === 'color') {
      self.setData({
        imagesList: dataset.item.imgList,
        positionId: dataset.item.positionId,
        materialId: dataset.item.materialId,
        colorId: dataset.item.colorId,
        colorName: dataset.item.colorName,
      })
      
    }
    
  },
  // 点击返回事件
  backClick(e){
    var dataset = e.currentTarget.dataset;
    console.log(dataset.type)
    if (dataset.type === 'texture'){
      this.setData({
        textureshow: false,
        scrollshow: true,
        trueshow: false,
        colorshow: false,
        imagesList: this.data.whiteImgs
      })
    } else if (dataset.type === 'color') {
      this.setData({
        textureshow: true,
        scrollshow: false,
        trueshow: true,
        colorshow: false,
        backType: 'texture',
        imagesList: this.data.whiteImgs
      })
    }
  },
  // 点击对勾事件
  trueClick(e){
    var self = this;
    self.setData({
      scrollshow: true,
      trueshow: false,
      okType: 'two'
    })
  },
  /*
    打开与关闭侧边栏
  */
  // 点击菜单打开侧边栏
  tap_ch: function(e){
    if(this.data.open){
      this.setData({
        open : false,
        masktype: false
      });
    }else{
      this.setData({
        open : true,
        masktype: true
      });
    }
  },
  // 点击蒙层关闭侧边栏
  click_end: function(e){
    this.istoright = false;
    this.setData({
      open : false,
      masktype: false
    });
  },
  // 手指触摸动作开始
  tap_start:function(e){
    // touchstart事件
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  // 手指触摸后移动
  tap_drag: function(e){
    // touchmove事件
 
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if(this.data.mark < this.data.newmark && this.data.mark < 100){
      this.istoright = true;
    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if(this.data.mark > this.data.newmark){
      this.istoright = false;
      
    }
    this.data.mark = this.data.newmark;

  },
  // 手指触摸动作结束
  tap_end: function(e){
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    if(this.istoright){
      this.setData({
        open : true,
        masktype: true
      });
    }else{
      this.setData({
        open : false,
        masktype: false
      });
    }
  },

  /*
    全屏滚动
  */
  scrollTouchstart:function(e){
    let py = e.touches[0].pageY;
    this.setData({
      starty: py
    })
  },
  scrollTouchmove:function(e){
    let py = e.touches[0].pageY;
    let d = this.data;
    this.setData({
      endy: py,
    })
    // debugger
    if(py-d.starty>100){    
      this.setData({
        margintop: py - d.starty
      })
    }
    console.log(e.touches[0])
  },
  scrollTouchend:function(e){
    let d = this.data;
    if(d.endy-d.starty >100 && d.scrollindex>0){
      this.setData({
        scrollindex: d.scrollindex-1
      })
    }else if(d.endy-d.starty <-100 && d.scrollindex<this.data.totalnum-1){
      this.setData({
        scrollindex: d.scrollindex+1
      })
    }
    this.setData({
        starty:0,
        endy:0,
        margintop:0
    })
  },
  /**
   * 跳转页面
   */
  goMyaddress(e){
    wx.navigateTo({
      url: '../myaddress/myaddress',
    })
  },
  goShopcar(e){
    wx.navigateTo({
      url: '../shopcart/shopcart',
    })
  },
  goOrder(e){
    wx:wx.navigateTo({
      url: '../myOrderlist/myOrderlist'
    })
  },
  goSuggestion(e){
    wx.navigateTo({
      url: '../userSuggestion/userSuggestion',
    })
  }
})