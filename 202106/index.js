

// 使用Promise实现串行
function getPromise (time) {
    return new Promise((resolve,reject) => {
        console.log('wait', time)
        setTimeout(()=> {
            resolve(time)
        }, time)
    })
}
// async ... await
/* async function getMoney() {
    var money=[100,200,300]  
    for( let i=0; i<money.length; i++){
        await getPromise(money[i]).then(()=>{
            console.log(money[i])
        })
    }
}
 */
/* async function getMoney() {
    var money = [100, 200, 300]
    for (let i = 0; i < money.length; i++) {
        await getPromise(money[i]).then(time => {
            console.log(time)
        })
    }
} */
// 递归
/* function getMoney(i) {
    var money = [100, 200, 300]
    getPromise(money[i++]).then(res => {
        console.log(res)
        if (money[i]) {
            getMoney(i)
        }
    })
} */
var money = [100, 200, 300]
// reduce
function getMoney() {
    money.reduce((prev, cur) => {
        return prev.then(() => getPromise(cur))
    }, Promise.resolve())
}
// for...await...of
function createAsyncIterable(arr) {
    return {
      [Symbol.asyncIterator]() {
        return {
          i: 0,
          next() {
            if (this.i < arr.length) {
              return getPromise(arr[this.i]).then(() => ({
                value: this.i++,
                done: false
              }))
            }
  
            return Promise.resolve({ done: true })
          }
        }
      }
    }
  }
  
//   ;(async function() {
//     for await (i of createAsyncIterable(money)) {
//     }
//   })()
  var i= 0
  function _setInterval(time) {
    setTimeout(() => {
        console.log(i++)
        _setInterval(time)
    }, time);
  }
  _setInterval(1000)