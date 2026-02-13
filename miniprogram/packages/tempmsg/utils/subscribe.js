import { chooseTemplateIcons } from './config'

// 查询展示的订阅状态
export function queryGlobalSubscribeStatus(subscribeTemplates = []) {
    const result = {
        mainSwitch: false,
        subscriptionInfoList: []
    }
    return new Promise((resolve) => {
        wx.getSetting({
            withSubscriptions: true,
            success: function (data) {
                const { itemSettings = [], mainSwitch } = data.subscriptionsSetting
                result.mainSwitch = mainSwitch
                Object.keys(itemSettings).forEach((key) => {
                    // mainSwitch: true, // 订阅消息总开关
                    // 'accept'表示用户同意订阅这条消息，'reject'表示用户拒绝订阅这条消息，'ban'表示已被后台封禁
                    result.subscriptionInfoList.push({
                        tmplId: key,
                        type: itemSettings[key]
                    })
                })
                subscribeTemplates.forEach(({ tmplId, title, data }) => {
                    const info = result.subscriptionInfoList.find(info => info.tmplId === tmplId)
                    if (!info) {
                        result.subscriptionInfoList.push({
                            tmplId,
                            type: '',
                            title: title,
                            data: data,
                            icon: chooseTemplateIcons.daixuanze
                        })
                    } else {
                        info.title = title
                        info.data = data
                        info.icon = chooseTemplateIcons[info.type]
                    }
                })
                resolve(result)
            },
            fail: function (data) {
                console['log']('+++++++++++查询订阅状态失败', data)
                resolve(result)
            },
        })
    })
}

// 点击订阅
export function openSubscribeStatus(subscribeTemplates) {
    return new Promise((resolve) => {
        console['log']('----------点击订阅', subscribeTemplates)
        wx.getSetting({
            withSubscriptions: true,
            success: function (res) {
                const { itemSettings = [], mainSwitch } = res.subscriptionsSetting
                // 当前订阅状态
                const subscriptionInfoList = []
                Object.keys(itemSettings).forEach((key) => {
                    subscriptionInfoList.push({
                        tmplId: key,
                        type: itemSettings[key]
                    })
                })
                console['log']('----------点击订阅查询订阅状态1', mainSwitch, subscriptionInfoList)
                if (mainSwitch) {
                    // 是否全部保持以上选择
                    const isAllKeep = subscribeTemplates.every(tmplId => subscriptionInfoList.find(info => info.tmplId === tmplId));
                    if (isAllKeep) {
                        // that.subscriptionInfoList = subscriptionInfoList
                        wx.openSetting({
                            success: function (res) {
                                console['log']('----------点击订阅打开设置成功', res)
                            },
                            fail: function (data) {
                                console['log']('----------点击订阅打开设置失败', data)
                            },
                        })
                        resolve(false)
                    } else {
                        // 订阅弹窗曝光
                        wx.requestSubscribeMessage({
                            tmplIds: subscribeTemplates,
                            success: function (data) {
                                const currentSubscriptionInfo = {}
                                let openList = [] // 是否有开启订阅
                                Object.keys(data).forEach((key) => {
                                    if (key !== 'errMsg') {
                                        currentSubscriptionInfo[key] = data[key]
                                        if (data[key] === 'accept' && !subscriptionInfoList.find(info => info.tmplId === key && ['accept', 'acceptWithForcePush'].includes(info.type))) {
                                            openList.push(key)
                                        }
                                    }
                                })
                                console['log']('----------点击订阅弹窗回调', currentSubscriptionInfo)
                                const valLab = {
                                    custom: {
                                        select_status: openList.join(',') || '-999'
                                    }
                                }
                                wx.getSetting({
                                    withSubscriptions: true,
                                    success: function (res) {
                                        const { itemSettings = [], mainSwitch } = res.subscriptionsSetting
                                        const keyList = []
                                        Object.keys(itemSettings).forEach((key) => {
                                            keyList.push(key)
                                        })
                                        // 是否保持以上选择
                                        const permanent = keyList.length !== subscriptionInfoList.length
                                        console['log'](`-----------点击订阅查询订阅状态2`, mainSwitch, currentSubscriptionInfo, itemSettings)
                                        resolve({
                                            currentSubscriptionInfo,
                                            permanent,
                                            isPass: !!openList.length, // 是否有至少开启一个订阅模板
                                        })
                                    },
                                    fail: function (data) {
                                        console['log']('-----------点击订阅查询订阅状态失败', data)
                                        resolve(false)
                                    },
                                })
                            },
                            fail: function (data) {
                                console['log']('-----------点击订阅打开订阅弹窗失败', data)
                                resolve(false)
                            },
                        })
                    }
                } else {
                    // that.subscriptionInfoList = subscriptionInfoList
                    wx.openSetting({
                        success: function (res) {
                            console['log']('----------点击订阅打开设置成功', res)
                        },
                        fail: function (data) {
                            console['log']('----------点击订阅打开设置失败', data)
                        },
                    })
                    resolve(false)
                }
            },
            fail: function (data) {
                console['log']('-----------点击订阅查询订阅状态失败', data)
                resolve(false)
            },
        })
    })
}

// 设置页面编辑订阅后返回
export function setSubscribeListAfterReturn(that, subscribeTemplates) {
    return new Promise((resolve) => {
        if (!that.subscriptionInfoList) {
            resolve(0)
            return
        }
        wx.getSetting({
            withSubscriptions: true,
            success: function (res) {
                const { itemSettings = [], mainSwitch } = res.subscriptionsSetting
                if (!mainSwitch) {
                    resolve({ isPass: false })
                    return
                } else {
                    const currentSubscriptionInfoList = []
                    Object.keys(itemSettings).forEach((key) => {
                        // mainSwitch: true, // 订阅消息总开关
                        // 'accept'表示用户同意订阅这条消息，'reject'表示用户拒绝订阅这条消息，'ban'表示已被后台封禁
                        currentSubscriptionInfoList.push({
                            tmplId: key,
                            type: itemSettings[key]
                        })
                    })
                    const currentSubscriptionInfo = {}
                    currentSubscriptionInfoList.filter(info => that.subscriptionInfoList.find(item => item.tmplId === info.tmplId && item.type !== info.type)).forEach(({ tmplId, type }) => {
                        currentSubscriptionInfo[tmplId] = type
                    })
                    // 是否全部永久订阅
                    const isAllPass = currentSubscriptionInfoList.every(({ type }) => ['accept', 'acceptWithForcePush'].includes(type));
                    // 是否保持以上选择
                    console['log'](`===========设置页返回后查询订阅状态`, currentSubscriptionInfoList, that.subscriptionInfoList)
                    that.subscriptionInfoList = null
                    resolve({
                        currentSubscriptionInfo,
                        permanent: true,
                        isAllPass,  // 是否全部永久订阅
                    })
                }
            },
            fail: function (data) {
                console['log']('===========设置页返回后查询订阅状态失败', data)
                resolve(false)
            },
        })
    })
}

// 页面隐藏时订阅状态查询
export function querySubscribeStatusWhenPageHide(that) {
    return new Promise((resolve) => {
        if (!that.subscriptionInfoList) {
            wx.getSetting({
                withSubscriptions: true,
                success: function (res) {
                    const { itemSettings = [] } = res.subscriptionsSetting
                    // 当前订阅状态
                    const subscriptionInfoList = []
                    Object.keys(itemSettings).forEach((key) => {
                        subscriptionInfoList.push({
                            tmplId: key,
                            type: itemSettings[key]
                        })
                    })
                    that.subscriptionInfoList = subscriptionInfoList
                    console['log']('>>>>>>>>>>>>>>页面隐藏时查询订阅状态成功', that.subscriptionInfoList)
                },
                fail: function (data) {
                    console['log']('>>>>>>>>>>>>>>页面隐藏时查询订阅状态失败', data)
                },
            })
            resolve(false)
        }
    })
}

// 拉起设置面板
export function openSettingPanel() {
    wx.openSetting({
        withSubscriptions: true, // 必须设置为 true 才能获取订阅消息状态
        success: (res) => {
            console.log('设置页返回', res);
        },
        fail: (err) => {
            console.error('打开设置页失败', err);
        }
    });
}

export default {
    querySubscribeStatusWhenPageHide,
    setSubscribeListAfterReturn,
    queryGlobalSubscribeStatus,
    openSubscribeStatus,
    openSettingPanel,
}
