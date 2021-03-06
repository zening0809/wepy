export function Login(_url) {
    wx.login({
        success: function (result) {
            //   console.log(result.code);
            if (result.code) {
                wx.getUserInfo({
                    success: function (res) {
                        wx.setStorageSync('userInfo', res.userInfo)
                        //发起网络请求
                        wx.request({
                            url: _url + '/public/wxLogin',
                            data: { code: result.code,
                            userInfo:  res.userInfo },
                            method: 'GET',
                            header: {
                                'content-type': 'application/json' // 默认值
                            },
                            success: function (res) {
                                if (res.data.status == 1) {
                                    wx.setStorageSync('openid', res.data.data.openid);
                                    // wx.setStorageSync('sessionKey', res.data.data.session_key)
                                } else {
                                    wx.showToast({
                                        title: res.data.errmsg,
                                        icon: 'loading',
                                        duration: 1500
                                    });
                                }
                            },
                            complete: function (res) {
                                if (res.statusCode < 200 && res.statusCode > 300) {
                                    wx.showToast({
                                        title: '网络不给了',
                                        icon: 'loading',
                                        duration: 1500
                                    });
                                }
                            }
                        })
                    },
                    complete: function (res) {
                        // console.log('complete',res);
                    }

                })
            } else {
                wx.showToast({
                    title: '获取用户登录态失败！',
                    icon: 'fail',
                    duration: 1500
                });
            }
        }
    });
}
