import Route from 'koa-router';
const router = Route();

// 微信登录
router.post('/', async (ctx, next) => {
    ctx.body = 'hello'
})

export default router