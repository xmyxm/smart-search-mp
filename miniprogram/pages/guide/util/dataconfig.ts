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
				content: '把复制文本全部粘贴到链接区域，点击生成链接',
				imgUrlList: [
					'https://img.meituan.net/dpmobile/d4d83de6d92c06519bf46c8f454d4a8d235064.jpg.webp',
					'https://img.meituan.net/dpmobile/93dc9bcbc23b9a25ea56a6f1943e8f74246537.png.webp',
				],
			},
		],
	},
	{
		id: '2',
		stepList: [
			{
				title: '第一步打开点评App搜索要查找的商户',
				content: '我们直接打开任意一家美食店铺',
				imgUrlList: [
					'https://img.meituan.net/dpmobile/a771457f1f6ca311fe6db4ce8537cef7297594.jpg.webp',
					'https://img.meituan.net/dpmobile/766287463f9fea144e46319b73962b99299367.jpg.webp',
				],
			},
			{
				title: '点击任意店铺进入商户详情页，再滑动到团购模块',
				content: '点击任意团购，进入团购详情页',
				imgUrlList: [
					'https://img.meituan.net/dpmobile/73b8748e48d6a9ffa2ce527de1e48c03268659.jpg.webp',
					'https://img.meituan.net/dpmobile/f6f78c0f870638d24304c8d17f54e558266645.jpg.webp',
				],
			},
			{
				title: '团购详情页点击右上角的分享按钮',
				content: '可以看到弹出了分享浮层，点击浮层上的复制链接',
				imgUrlList: [
					'https://img.meituan.net/dpmobile/e55753c831fa17003827cc6736e610a7254458.jpg.webp',
					'https://img.meituan.net/dpmobile/e64a66a2481cdcda04baa745e34d984d208009.jpg.webp',
				],
			},
			{
				title: '复制成功',
				content: '把复制文本全部粘贴到链接区域，点击生成链接',
				imgUrlList: [
					'https://img.meituan.net/dpmobile/89a801f1b4cd2456e58571579cd9fc2d254919.jpg.webp',
					'https://img.meituan.net/dpmobile/21d828cf64058378ed16140e72bcf0df279077.png.webp',
				],
			},
		],
	},
]

export default guideList
