import wepy from 'wepy'

// 封装http请求
async function request(userConfig) {
    wepy.showLoading({
        title: '加载中'
    })
    try {
        // ajax默认配置
        const defaultConfig = {}
        // 将默认设置与用户传入的设置merge
        const config = Object.assign(defaultConfig, userConfig)
        return await wepy.request(config)
    } catch (error) {
        console.log('ajax调用失败', error)
        wepy.showModal({
            title: '数据获取失败',
            content: '请检查您的网络连接',
            confirmColor: '#6CACF4',
            showCancel: false
        })
    } finally {
        wepy.hideLoading()
    }
}

async function uploadFile(userConfig) {
    try {
        const defaultConfig = {
            name: 'file'
        }
        const config = Object.assign(defaultConfig, userConfig)
        return await wepy.uploadFile(config)
    } catch (error) {
        console.log('文件上传失败', error)
        wepy.showModal({
            title: '文件上传失败',
            content: '请检查您的网络连接',
            confirmColor: '#6CACF4',
            showCancel: false
        })
    }
}

export function UPLOADFILE(url, formData, filePath) {
    return uploadFile({
        url,
        formData,
        filePath
    })
}

export function GET(url, data) {
    return request({
        url,
        data,
        method: 'GET'
    })
}

export function POST(url, data, callback) {
    return request({
        url,
        data,
        method: 'POST',
        success: callback()
    })
}

export function PUT(url, data) {
    return request({
        url,
        data,
        method: 'PUT'
    })
}

export function DELETE(url, data) {
    return request({
        url,
        data,
        method: 'DELETE'
    })
}
