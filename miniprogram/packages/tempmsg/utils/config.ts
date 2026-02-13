import { formatMiniTime } from '../../../utils/util'

export const subscribeTemplates = [
    {
        tmplId: 'Us4RcpvArdJLYujJlrrjZOi8Xr14fy_O_ZMcTi_1ABY',
        title: '未读消息提醒',
        data: {
            time2: {
                value: formatMiniTime(new Date())
            },
            thing3: {
                value: '您有新消息未读，请点击查看'
            },
            thing4: {
                value: '五年级'
            },
            time5: {
                value: formatMiniTime(new Date()) //'2026年12月10日10:00'
            },
        }
    },
    {
        tmplId: 'dqPDiow6Qgw55jcAPYSFWzJpaUfT8EUFuC7zp7gs6HQ',
        title: '签到提醒',
        data: {
            thing1: {
                value: '每日签到'
            },
            thing2: {
                value: '点击立即签到'
            },
            name3: {
                value: '张三'
            },
            date4: {
                value: '2026-12-18'
            },
            time5: {
                value: '18:24:00'
            },
        }
    },
    {
        tmplId: '65PEMjcbejA8oTk51l2_TicYU-nK9y6lNUMALsMhoQk',
        title: '打卡提醒',
        data: {
            thing1: {
                value: '每日7:00准时晨读'
            },
            time2: {
                value: '06:00:00～08:30:00'
            },
            character_string3: {
                value: '0/21'
            },
            thing4: {
                value: '拍照打卡'
            },
        }
    },
    {
        tmplId: 'gAhKHhoKzi10lqTMK23dOfr3SOkuZJJTJMnVPl3z0rM',
        title: '宣讲会通知',
        data: {
            thing1: {
                value: '每日7:天天公司宣讲'
            },
            date2: {
                value: '2026-012-01'
            },
            thing3: {
                value: '体育馆'
            },
            thing4: {
                value: '请准备好电脑并登录'
            },
        }
    },
    {
        tmplId: 'RXP6n88JSJruJccpVlifmFNnFTty7KjlI4ZvFkz0U0A',
        title: '订阅课程开课提醒',
        data: {
            thing2: {
                value: '每日7:ps入门到精通'
            },
            thing3: {
                value: '第一讲：操作界面的使用'
            },
            date5: {
                value: '2026年12月16日 20：00'
            },
            character_string6: {
                value: '1/10'
            },
        }
    },
]

export const chooseTemplateIcons = {
    xuanzhong: 'https://img.meituan.net/dpmobile/55ab7f172eb0b5121dfb5a261ec5085f4806.png.webp',
    daixuanze: 'https://img.meituan.net/dpmobile/e09b33c07ffa6570c1e2457822adbfa63263.png.webp',
    // 已订阅
    accept: 'https://img.meituan.net/dpmobile/d89431812aa19c6cc13891172d000fa96901.png.webp',
    // 拒绝
    reject: 'https://img.meituan.net/dpmobile/87a381e90b749326a99ad4f3810f930d3466.png.webp',
}

export default subscribeTemplates
