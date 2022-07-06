export const changeNameAvatar='修改昵称'
export const updateAccount='升级为用户账户'
export const generateTicket='生成我的观展纪念票'
export const showMoreComment='查看更多评论'
export const commentPlaceholder='说说你的想法吧~'
export const unlockCondition='解锁条件：'
export const saveSkin='保存装扮'
export const designerIs='设计者：'
export const favorTitle='逛展收藏'
export const skinTitle='个性装扮'
export const welcomeText='-进入虚拟展厅-'
export const allComments='观展评论'
export const guestLogin='游客浏览'
export const userLogin='用户登录'
export const agreement='我同意《隐私政策》和《用户服务协议》'
export const startVisit='-开始参观-'
export const loginTypePrompt1='游客账号：仅限本次登录使用，不保留用户数据'
export const loginTypePrompt2='用户账号：可升级为用户账号，可重复登录，保留用户数据'
export const loginWelcome='欢迎！'
export const loginNamePlaceholder='请输入你的用户ID'
export const guestNamePlaceholder='请输入你的名字'
export const loginPasswordPlaceholder='请输入访问密码'
export const agreeWarning='请先同意相关协议'
export const emptyUsername='用户名不可为空'
export const emptyPassword='密码不可为空'
export const pendingSignUp='正在为您注册'
export const pendingSignin='正在为您登录'
export const unknownError='出现未知错误，请重试'
export const conflictError='用户名重复，请更换'
export const notFoundError='未找到该用户，请重试'
export const invalidError='用户名与密码不匹配，请重试'
export const pendingProfile='正在获取用户信息'
export const pendingExhibits='正在获取展品信息'
export const pendingInit='正在初始化账号'
export const registerTitle='注册用户账号'
export const registerSubmit='升级为用户账号'
export const registerUsername='用户ID'
export const registerPassword='密码'
export const registerPending='正在提交注册'
export const registerSuccess='注册成功'
export const registerError='出现错误，用户名被占用'
export const nicknameLabel='昵称'
export const emptyNickname='昵称不可为空'
export const nicknameSubmit='提交修改'
export const nicknamePending='正在提交修改'
export const nicknameSuccess='修改成功'
export const noComment='暂无评论'
export const progressComplete='已解锁'
export const progressNotComplete='未解锁'
export const regularUsername='请输入字母、数字或下划线'
export const pendingLoading='正在前往虚拟展厅'
export const pendingFavor='正在获取收藏夹信息'
export const skinPending='正在提交修改'
export const skinSuccess='修改成功'


export const SkinList={
    cloth: [{
        id: 'original',
        name: '求是蓝',
        desc: '进入展馆',
        perc: (_v: number,_s: number,_c: number,_t: number)=>{
            return 100
        }
    },{
        id: 'doughnut',
        name: '梦想甜甜圈',
        desc: '进入展馆',
        perc: (_v: number,_s: number,_c: number,_t: number)=>{
            return 100
        }
    },{
        id: 'leaves',
        name: '火红枫叶',
        desc: '浏览7件展品',
        perc: (v: number,_s: number,_c: number,_t: number)=>{
            return v/7*100
        }
    },{
        id: 'palette',
        name: '小画家',
        desc: '分享3件展品',
        perc: (_v: number,s: number,_c: number,_t: number)=>{
            return s/3*100
        }
    },{
        id: 'star',
        name: '星星斗篷',
        desc: '观展时长达到10min',
        perc: (_v: number,_s: number,_c: number,t: number)=>{
            return t*10
        }
    },{
        id: 'tie',
        name: '毕业礼',
        desc: '评论3件展品',
        perc: (_v: number,_s: number,c: number,_t: number)=>{
            return c/3*100
        }
    }],
    head: [{
        name: '求是蓝',
        id: 'basic',
        desc: '进入展馆',
        perc: (_v: number,_s: number,_c: number,_t: number)=>{
            return 100
        }
    },{
        name: '甜心圈',
        id: 'doughnut',
        desc: '进入展馆',
        perc: (_v: number,_s: number,_c: number,_t: number)=>{
            return 100
        }
    },{
        name: '美梦睡帽',
        id: 'hat',
        desc: '观展时长达到3min',
        perc: (_v: number,_s: number,_c: number,t: number)=>{
            return t/3*100
        }
    },{
        name: '小天使',
        id: 'ring',
        desc: '浏览5件展品',
        perc: (v: number,_s: number,_c: number,_t: number)=>{
            return v/5*100
        }
    },{
        name: '时尚发带',
        id: 'band',
        desc: '分享1件展品',
        perc: (_v: number,s: number,_c: number,_t: number)=>{
            return s*100
        }
    },{
        name: '好奇眼睛',
        id: 'glasses',
        desc: '评论1件展品',
        perc: (_v: number,_s: number,c: number,_t: number)=>{
            return c*100
        }
    }
    ]
}