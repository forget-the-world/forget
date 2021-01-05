/*
综合了所有的关于table数据的方法
*/
export default class LinkEnum {
    constructor(value) {
            this.value = value
        }
        // 获取相关的obj
    get(...val) {
            // 如果当前的方法没有传入值，或或者不是数组，我们就返回所有
            if (val.length === 0) return this.value
                // 否则就获取对应的数据
                // arr的作用就是返回得到的枚举数据
            let arr = []
                // val是需要的数据
            val.forEach((item) => {
                // val的item和this.value的title进行一一匹配，从而获取对应的数据
                this.value.forEach((name) => {
                    if (item === name.title) {
                        arr.push(name)
                    }
                })
            })
            return arr
        }
        // 过滤对应的数据
    un(val, data) {
            // data指的是需要的过滤的数据源
            // val是需要过滤的内容
            let arr = data
                // 判断如果val是数组，则直接用数组，则直接用数组，不是将该数据转换为数组
            let value = Array.isArray(val) ? val : [val];
            // 对数据进行过滤操作
            return arr.filter((item) => !value.includes(item.title))
        }
        // 头部增加方法
    unshift(val, data) {
            // data指的是需要的过滤的数据源
            // val是需要增加的内容
            let arr = data || []
                // 判断如果val是数组，则直接用数组，则直接用数组，不是将该数据转换为数组
            let value = Array.isArray(val) ? val : [val];
            // 在整个大的数据源中进行查找增加
            this.value.forEach((item) => {
                if (value.includes(item.title)) {
                    arr.unshift(item)
                }
            })
            return arr
        }
        // 尾部增加方法
    push(val, data) {
            // data指的是需要的过滤的数据源
            // val是需要增加的内容
            let arr = data || []
                // 判断如果val是数组，则直接用数组，则直接用数组，不是将该数据转换为数组
            let value = Array.isArray(val) ? val : [val];
            // 在整个大的数据源中进行查找增加
            this.value.forEach((item) => {
                if (value.includes(item.title)) {
                    arr.push(item)
                }
            })
            return arr
        }
        // 指定位置增加内容
    insert(val, index, data) {
        // val是需要增加的内容
        // index指的是增加的下标位置
        // data数据源
        let arr = data;
        // 判断如果val是数组，则直接用数组，则直接用数组，不是将该数据转换为数组
        let value = Array.isArray(val) ? val : [val];
        // 在整个大的数据源中进行查找增加
        this.value.forEach((item) => {
            if (value.includes(item.title)) {
                arr.splice(index, 0, item)
            }
        })
        return arr;
    }
}