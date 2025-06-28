interface urlInfoType {
    url: string,
    status: number
}

interface domainConfigType {
    request_domain: urlInfoType[],
    ws_request_domain: urlInfoType[],
    upload_domain: urlInfoType[],
    download_domain: urlInfoType[],
    biz_domain: urlInfoType[],
}

const domainInfo: domainConfigType = {
        "request_domain": [
            {
                "url": "https://accountapi.dianping.com",
                "status": 0
            },
            {
                "url": "https://act.dianping.com",
                "status": 0
            },
            {
                "url": "https://ad.maoyan.com",
                "status": 0
            },
            {
                "url": "https://api-phx.meituan.com",
                "status": 0
            },
            {
                "url": "https://api.maoyan.com",
                "status": 0
            },
            {
                "url": "https://api.meishi.meituan.com",
                "status": 0
            },
            {
                "url": "https://api.mobile.meituan.com",
                "status": 0
            },
            {
                "url": "https://apimeishi.meituan.com",
                "status": 0
            },
            {
                "url": "https://apimobile.meituan.com",
                "status": 0
            },
            {
                "url": "https://apitrip.meituan.com",
                "status": 0
            },
            {
                "url": "https://appmock.sankuai.com",
                "status": 0
            },
            {
                "url": "https://appsec-mobile.meituan.com",
                "status": 0
            },
            {
                "url": "https://asr.meituan.com",
                "status": 0
            },
            {
                "url": "https://auth-ai.meituan.com",
                "status": 0
            },
            {
                "url": "https://awp-assets.meituan.net",
                "status": 0
            },
            {
                "url": "https://catfront.dianping.com",
                "status": 0
            },
            {
                "url": "https://cem.sankuai.com",
                "status": 0
            },
            {
                "url": "https://dreport.meituan.net",
                "status": 0
            },
            {
                "url": "https://dsp.dianping.com",
                "status": 0
            },
            {
                "url": "https://g.dianping.com",
                "status": 0
            },
            {
                "url": "https://g.meituan.com",
                "status": 0
            },
            {
                "url": "https://h5.dianping.com",
                "status": 0
            },
            {
                "url": "https://i.meituan.com",
                "status": 0
            },
            {
                "url": "https://i.waimai.meituan.com",
                "status": 0
            },
            {
                "url": "https://ihotel.meituan.com",
                "status": 0
            },
            {
                "url": "https://img.meituan.com",
                "status": 0
            },
            {
                "url": "https://img.meituan.net",
                "status": 0
            },
            {
                "url": "https://inf-faas.meituan.com",
                "status": 0
            },
            {
                "url": "https://iohhotel.meituan.com",
                "status": 0
            },
            {
                "url": "https://itrip.meituan.com",
                "status": 0
            },
            {
                "url": "https://kf.dianping.com",
                "status": 0
            },
            {
                "url": "https://logan.sankuai.com",
                "status": 0
            },
            {
                "url": "https://lvyou.meituan.com",
                "status": 0
            },
            {
                "url": "https://lx1.meituan.net",
                "status": 0
            },
            {
                "url": "https://lx2.meituan.net",
                "status": 0
            },
            {
                "url": "https://m.51ping.com",
                "status": 0
            },
            {
                "url": "https://m.api.51ping.com",
                "status": 0
            },
            {
                "url": "https://m.dianping.com",
                "status": 0
            },
            {
                "url": "https://maccount.dianping.com",
                "status": 0
            },
            {
                "url": "https://maoyan.dianping.com",
                "status": 0
            },
            {
                "url": "https://mapi.51ping.com",
                "status": 0
            },
            {
                "url": "https://mapi.dianping.com",
                "status": 0
            },
            {
                "url": "https://mars.meituan.com",
                "status": 0
            },
            {
                "url": "https://mboxorder-travel.meituan.com",
                "status": 0
            },
            {
                "url": "https://meishi.meituan.com",
                "status": 0
            },
            {
                "url": "https://mlog.dianping.com",
                "status": 0
            },
            {
                "url": "https://mlog.meituan.com",
                "status": 0
            },
            {
                "url": "https://mobilenext-web.meituan.com",
                "status": 0
            },
            {
                "url": "https://mos-map.meituan.com",
                "status": 0
            },
            {
                "url": "https://mss-shon.sankuai.com",
                "status": 0
            },
            {
                "url": "https://npay.meituan.com",
                "status": 0
            },
            {
                "url": "https://open.wpt.test.sankuai.com",
                "status": 0
            },
            {
                "url": "https://optimus-mtsi.meituan.com",
                "status": 0
            },
            {
                "url": "https://p.meituan.com",
                "status": 0
            },
            {
                "url": "https://p0.meituan.com",
                "status": 0
            },
            {
                "url": "https://p0.meituan.net",
                "status": 0
            },
            {
                "url": "https://p1.meituan.com",
                "status": 0
            },
            {
                "url": "https://p1.meituan.net",
                "status": 0
            },
            {
                "url": "https://passport.wpt.test.sankuai.com",
                "status": 0
            },
            {
                "url": "https://pdc.meituan.com",
                "status": 0
            },
            {
                "url": "https://pike-lb.dianping.com",
                "status": 0
            },
            {
                "url": "https://pike-lb.sankuai.com",
                "status": 0
            },
            {
                "url": "https://plx.meituan.com",
                "status": 0
            },
            {
                "url": "https://portal-portm.meituan.com",
                "status": 0
            },
            {
                "url": "https://prism-report-custom.dreport.meituan.net",
                "status": 0
            },
            {
                "url": "https://q.dpurl.cn",
                "status": 0
            },
            {
                "url": "https://report.meituan.com",
                "status": 0
            },
            {
                "url": "https://rpc.meituan.com",
                "status": 0
            },
            {
                "url": "https://s3.meituan.net",
                "status": 0
            },
            {
                "url": "https://s3plus-shon.meituan.net",
                "status": 0
            },
            {
                "url": "https://speech.meituan.com",
                "status": 0
            },
            {
                "url": "https://stable-pay.st.meituan.com",
                "status": 0
            },
            {
                "url": "https://stable.pay.test.sankuai.com",
                "status": 0
            },
            {
                "url": "https://travel.meituan.com",
                "status": 0
            },
            {
                "url": "https://union.dianping.com",
                "status": 0
            },
            {
                "url": "https://up.img.heidiancdn.com",
                "status": 0
            },
            {
                "url": "https://verify.meituan.com",
                "status": 0
            },
            {
                "url": "https://vod2.qcloud.com",
                "status": 0
            },
            {
                "url": "https://web.meituan.com",
                "status": 0
            },
            {
                "url": "https://www.dianping.com",
                "status": 0
            },
            {
                "url": "https://wx.maoyan.com",
                "status": 0
            },
            {
                "url": "https://wxfans.meituan.com",
                "status": 0
            }
        ],
        "ws_request_domain": [
            {
                "url": "wss://pdaozong.dianping.com",
                "status": 0
            },
            {
                "url": "wss://pike0-test.sankuai.com",
                "status": 0
            },
            {
                "url": "wss://pike0.dianping.com",
                "status": 0
            },
            {
                "url": "wss://pikem0.sankuai.com",
                "status": 0
            }
        ],
        "upload_domain": [
            {
                "url": "https://extrauploader.inf.test.sankuai.com",
                "status": 0
            },
            {
                "url": "https://pic-up.meituan.com",
                "status": 0
            },
            {
                "url": "https://pic.meituan.com",
                "status": 0
            },
            {
                "url": "https://s3.meituan.net",
                "status": 0
            },
            {
                "url": "https://vod2.qcloud.com",
                "status": 0
            }
        ],
        "download_domain": [
            {
                "url": "https://h5.dianping.com",
                "status": 0
            },
            {
                "url": "https://img.meituan.net",
                "status": 0
            },
            {
                "url": "https://p0.meituan.net",
                "status": 0
            },
            {
                "url": "https://p1.meituan.net",
                "status": 0
            },
            {
                "url": "https://qcloud.dpfile.com",
                "status": 0
            },
            {
                "url": "https://s3-img.meituan.net",
                "status": 0
            },
            {
                "url": "https://s3plus.sankuai.com",
                "status": 0
            },
            {
                "url": "https://vfile.meituan.net",
                "status": 0
            },
            {
                "url": "https://www.dpfile.com",
                "status": 0
            }
        ],
        "biz_domain": [
            {
                "url": "https://act.dianping.com",
                "status": 0
            },
            {
                "url": "https://activity.dianping.com",
                "status": 0
            },
            {
                "url": "https://aduland.dianping.com",
                "status": 0
            },
            {
                "url": "https://agreement.meituan.com",
                "status": 0
            },
            {
                "url": "https://awp.meituan.com",
                "status": 0
            },
            {
                "url": "https://cps.dianping.com",
                "status": 0
            },
            {
                "url": "https://cube.dianping.com",
                "status": 0
            },
            {
                "url": "https://dache.meituan.com",
                "status": 0
            },
            {
                "url": "https://dlc-act.dianping.com",
                "status": 0
            },
            {
                "url": "https://dp.dianping.com",
                "status": 0
            },
            {
                "url": "https://dpurl.cn",
                "status": 0
            },
            {
                "url": "https://dzzz.gjzwfw.gov.cn",
                "status": 0
            },
            {
                "url": "https://ecom.meituan.com",
                "status": 0
            },
            {
                "url": "https://evt.dianping.com",
                "status": 0
            },
            {
                "url": "https://g.dianping.com",
                "status": 0
            },
            {
                "url": "https://h5.dianping.com",
                "status": 0
            },
            {
                "url": "https://h5.waimai.meituan.com",
                "status": 0
            },
            {
                "url": "https://i-mantou.meituan.com",
                "status": 0
            },
            {
                "url": "https://i.meituan.com",
                "status": 0
            },
            {
                "url": "https://i.waimai.meituan.com",
                "status": 0
            },
            {
                "url": "https://invoice.meituan.com",
                "status": 0
            },
            {
                "url": "https://jchunuo.com",
                "status": 0
            },
            {
                "url": "https://kf.dianping.com",
                "status": 0
            },
            {
                "url": "https://ku.dianping.com",
                "status": 0
            },
            {
                "url": "https://link.dianping.com",
                "status": 0
            },
            {
                "url": "https://m-sqt.meituan.com",
                "status": 0
            },
            {
                "url": "https://m.51ping.com",
                "status": 0
            },
            {
                "url": "https://m.dianping.com",
                "status": 0
            },
            {
                "url": "https://m.maoyan.com",
                "status": 0
            },
            {
                "url": "https://maccount.dianping.com",
                "status": 0
            },
            {
                "url": "https://maker.dianping.com",
                "status": 0
            },
            {
                "url": "https://maoyan.com",
                "status": 0
            },
            {
                "url": "https://meishi.meituan.com",
                "status": 0
            },
            {
                "url": "https://meituan.com",
                "status": 0
            },
            {
                "url": "https://mh5.bl.com",
                "status": 0
            },
            {
                "url": "https://minsu.dianping.com",
                "status": 0
            },
            {
                "url": "https://mlogin.dianping.com",
                "status": 0
            },
            {
                "url": "https://mobilenext-web.dianping.com",
                "status": 0
            },
            {
                "url": "https://mobilenext-web.meituan.com",
                "status": 0
            },
            {
                "url": "https://mpay.meituan.com",
                "status": 0
            },
            {
                "url": "https://npay.meituan.com",
                "status": 0
            },
            {
                "url": "https://openapi.waimai.meituan.com",
                "status": 0
            },
            {
                "url": "https://optimus-mtsi.meituan.com",
                "status": 0
            },
            {
                "url": "https://osm.dianping.com",
                "status": 0
            },
            {
                "url": "https://osx.dianping.com",
                "status": 0
            },
            {
                "url": "https://page.meituan.net",
                "status": 0
            },
            {
                "url": "https://pdc.dianping.com",
                "status": 0
            },
            {
                "url": "https://pmtmeishi.meituan.com",
                "status": 0
            },
            {
                "url": "https://promotion.bl.com",
                "status": 0
            },
            {
                "url": "https://qcs.meituan.com",
                "status": 0
            },
            {
                "url": "https://qr.bl.com",
                "status": 0
            },
            {
                "url": "https://reserve.dianping.com",
                "status": 0
            },
            {
                "url": "https://rules-center.meituan.com",
                "status": 0
            },
            {
                "url": "https://shangou.meituan.net",
                "status": 0
            },
            {
                "url": "https://takeaway.51ping.com",
                "status": 0
            },
            {
                "url": "https://takeaway.dianping.com",
                "status": 0
            },
            {
                "url": "https://txwk.10010.com",
                "status": 0
            },
            {
                "url": "https://verify.meituan.com",
                "status": 0
            },
            {
                "url": "https://wenjuan.meituan.com",
                "status": 0
            },
            {
                "url": "https://www.dianping.com",
                "status": 0
            },
            {
                "url": "https://www.jchunuo.com",
                "status": 0
            },
            {
                "url": "https://yantest.meituan.com",
                "status": 0
            }
        ]
}

export default domainInfo