Page({
  data: {
    markers: [{
      iconPath: '/image/addcared.png',
      id: 0,
      latitude: 31.297794,
      longitude: 121.429791,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 121.429791,
        latitude: 31.297794
      }, {
        longitude: 120.166785,
        latitude: 30.270801
      }],
      color: '#000000',
      width: 2
    }],
    controls: [{
      id: 1,
      iconPath: '/image/addcared.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})