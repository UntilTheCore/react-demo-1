import React from 'react'
import ComponentDemo from './components/componentDemo'
const App = () => {
    // return 后面的括号等同于 React.createElement，所以必须引入React
    return (
        <div className="red">
            <p>I`m App Component!</p>
            <Component1 numbers={[1, 2, 3]}/>
            <hr/>
            <ComponentDemo />
        </div>
    )
}


 // 循环使用总结：
// 只要是除了jsx认识的html标签外，有和js沾边的就要用 {} 包起来，否则就是报错。
// 包起来可以是变量，函数调用，对象等。
const Component1 = (props) => {
    // 循环输出写法 1
    // return (
    //     <div> {
    //         props.numbers.map((item,index) => {
    //             return <div>{index} : {item} </div>
    //     })}
    //     </div>
    // )

    // 循环输出写法 2
    return props.numbers.map( (item,index) => {
        return <div>{index} : {item}</div>
    })
}

export default App
