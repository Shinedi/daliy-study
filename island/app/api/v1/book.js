const Router = require('koa-router')
const {PositiveIntegerValidator, SearchValidator, AddShortCommentValidator} = require('../../validators/validator')
const {HotBook} = require('../../models/hot-book')
const {Book} = require('../../models/book')
const {Favor} = require('../../models/favor')
const {Comment} = require('../../models/book-comment')
const {Auth} = require('../../../middlewares/auth')
const {success} = require('../../lib/helper') // 成功返回值
const router = new Router({
    prefix: '/v1/book'
})
router.get('/hot_list',async (ctx, next)=> {
    const favors = await HotBook.getAll();
    ctx.body = {
        books: favors
    }
})

router.get('/:id/detail',async (ctx, next)=> {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book = new Book(v.get('path.id'));
    ctx.body = await book.detail()
})

router.get('/search', async (ctx, next) => {
    const v = await new SearchValidator().validate(ctx);
    console.log('__q', v.get('body.q'))
    const result = await Book.searchFromYushu(v.get('body.q'), v.get('body.start'), v.get('body.count'))
    ctx.body = result;
})

router.get('/favor/count', new Auth(1).m, async (ctx, next)=> {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid);
    ctx.body = {
        count
    }
})

router.get('/:book_id/favor', new Auth(1).m, async (ctx, next)=> {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'book_id'
    })
    const favor = await Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'));
    ctx.body = favor
})

router.post('/add/short_comment', async (ctx, next) => {
    const v = await new AddShortCommentValidator().validate(ctx, {
        id: 'book_id'
    });
    Comment.addComment(v.get('body.book_id'), v.get('body.content'))
    success();
})
// 图书基础数据 服务
// 旧岛 API/项目

// node.js中间层
// 微服务
// 雏形


module.exports = router