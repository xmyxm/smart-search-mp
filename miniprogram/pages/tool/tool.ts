const menudata = require('./config/menudata');

Component({
  data: {
    menudata: menudata
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    // 事件处理函数
    bindViewClick() {
      console.log(menudata)
    },
  },
})
