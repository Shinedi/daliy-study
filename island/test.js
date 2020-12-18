function fun1 () {
    try{
        fun1()
    } catch(e ){
        throw e
    }
}

function fun2 () {
    try{
        fun3()
    } catch(e ){
        throw e
    }
    
}
console.log(fun3())
function fun3 () {
    try {
        console.log(1/a)
    } catch(e) {
        throw e
    }
    return 'success'
}

// 没有发生异常
// 发生异常

// 函数设计
// 判断出异常 return false null
// throw new Error