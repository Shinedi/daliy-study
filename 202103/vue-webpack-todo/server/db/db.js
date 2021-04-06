const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo' // 线上数据库存储数据都存在这个命名空间下面

const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

const handleRequest = ({status, data, ...rest}) => {
  if (status == 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}


module.exports = function(appId, appKey) {
  const getHeaders = () => {
    const now = Date.now()
    return { // 请求数据库的时候必须包含的header
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getAllTodos () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },
    // 添加数据
    async addTodo (todo) {
      return handleRequest(await request.post(`/${className}`, todo, {
        headers: getHeaders()
      }))
    },
    // 更新数据
    async updataTodo (id, todo) {
      return handleRequest(await request.put(`/${className}/${id}`, todo, {
        headers: getHeaders()
      }))
    },
    // 删除指定数据
    async deleteTodo (id) {
      return handleRequest(await request.delete(`/${className}/${id}`, {
        headers: getHeaders()
      }))
    },
    // 删除多个数据
    async deleteCompleted (ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return handleRequest(await request.post(
        '/batch',
        {requests},
        {headers: getHeaders()}
      ))
    }
  }
}

