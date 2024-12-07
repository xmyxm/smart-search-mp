interface StepInfo {
	title: string
	content: string | undefined
	imgUrlList: string[] | undefined
}

interface GuideInfo {
	id: string
	stepList: StepInfo[]
}

const guideList: GuideInfo[] = [
	{
		id: '1',
		stepList: [
			{
				title: '第一步打开点评App搜索要查找的商户',
				content: '我们以喜茶店铺为例，输入店铺名称关键字，点击搜索',
				imgUrlList: [
					'https://img.meituan.net/dpmobile/a771457f1f6ca311fe6db4ce8537cef7297594.jpg.webp',
					'https://img.meituan.net/dpmobile/4aa811628b559c133b3b286fe589cff3260541.jpg.webp',
				],
			},
			{
				title: '点击对应的店铺进入商户详情页，再点击商户详情页右上角的分享按钮',
				content: '可以看到弹出了分享浮层，点击浮层上的复制链接',
				imgUrlList: [
					'https://img.meituan.net/dpmobile/8919274755788f161f7b43776688e864232646.jpg.webp',
					'https://img.meituan.net/dpmobile/5c8928ccb4decb16d3406be053c99153190231.jpg.webp',
				],
			},
			{
				title: '复制成功',
				content: '把复制文本全部粘贴到链接区域',
				imgUrlList: ['https://img.meituan.net/dpmobile/d4d83de6d92c06519bf46c8f454d4a8d235064.jpg.webp', ''],
			},
		],
	},
]

export default guideList
