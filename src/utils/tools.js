import wepy from 'wepy'

export function _setStorageSync(key, value, app) {
  wepy.setStorageSync(key, value)
  app.globalData[key] = value
}

export function _showToast(title, userConfig) {
  const defaultConfig = {
    title,
    mask: true,
    icon: 'none'
  }
  const config = Object.assign(defaultConfig, userConfig)
  wepy.showToast(config)
}

export function getNowFormatDate(param_time) {
  var date = new Date(param_time * 1000)
  var seperator1 = '.'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var strDate = date.getDate()
  var seconds = date.getSeconds()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (hours >= 0 && hours <= 9) {
    hours = '0' + hours
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + hours + seperator2 + minutes  + seperator2 + seconds
  return currentdate
}
