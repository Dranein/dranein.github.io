export default {
	'imgApi': 'http://39.106.203.38:8888',
	// GET /v1/keys 获取Public Key
	'getKey':'v1/keys',
	//POST /v1/credentials 创建用户Credential,即用户登录
	'login': 'v1/credentials',
	//GET /v1/user 获取登录者信息
	'getUserInfo':'v1/user',
	//POST /v1/files 上传文件资源
	'files':'v1/files',
	//POST /v1/sms 获取手机短信资源
	'getsms': 'v1/sms',
	//POST /v1/users 新建用户
	'addUser': 'v1/users',
	//获取字典 GET /v1/dics
	'getDics': 'v1/dics',
	//新增帖子 POST /v1/posts
	'publish': 'v1/posts',
	//我的帖子 GET /v1/user/posts
	'getMypublish': 'v1/user/posts',
	//帖子详情 GET /v1/posts/{postId}
	'getpostDetail': 'v1/posts',
	//帖子收藏 POST /v1/posts/{postId}/collect
	//取消帖子收藏 DELETE /v1/posts/{postId}/collect
	'setCollect': 'v1/posts/:postId/collect',
	//帖子点赞 POST /v1/posts/{postId}/like
	//取消帖子点赞 DELETE /v1/posts/{postId}/like
	'setLike': 'v1/posts/:postId/like',
	//某帖子资源更新 PATCH /v1/posts/{postId}
	'patchPosts': 'v1/posts/',
	//帖子资源收藏 GET /v1/collections
	'getmycollect': 'v1/collections',
	//板块帖子 GET /v1/{postModule}/posts
	'getposts': 'v1/:postModule/posts',
	//公开帖子资源 GET /v1/posts/public
	'getpublicPosts': 'v1/posts/public',
	//某帖子评论资源 GET /v1/posts/:postId/coms
	'getComsList': 'v1/posts/:postId/coms',
	//评论帖子 POST /v1/posts/{postId}/com
	'setcom': 'v1/posts/:postId/com',
	//回复评论 POST /v1/coms/{comId}/com
	'setcomChild': 'v1/coms/:comId/com',
	//获取广告展示,用于前台广告展示 GET /v1/ads/public
	'getads':'v1/ads/public'
}