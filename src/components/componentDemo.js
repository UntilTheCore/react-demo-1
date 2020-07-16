import React from "react";
import './css/componentDemo.css'

function ComponentDemo() {
    return (
        <div className={"componentDemo"}>
            <p>我是ComponentDemo组件，练习使用函数和类组件</p>
            <p>爷爷</p>
            <Parent name={'utc'}/>
        </div>
    )
}

function Parent(props) {
    // 解构赋值，解构数组用[]，解构对象用 {}
    // 函数组件使用内部数据state
    const [n, setN] = React.useState(0)
    return (<div className={"parent"}>
        <span>爸爸</span>
        {/*  函数组件使用外部数据 */}
        <div>我接收组件间传值：{props.name}</div>
        <input type="text" name={"parent"} value={n} readOnly={true}/>
        {/* setN 永远不会去改变n，而是产生一个新的n */}
        <button onClick={() => setN(n + 1)}>+1</button>
        <Son name={'小李子'}/>
    </div>)
}


class Son extends React.Component {
    constructor() {
        super()
        this.state = {n: 0}
    }

    render() {
        return <div className={"son"}>
            <p>儿子</p>
            {/* 类组件使用外部数据 */}
            <div>我接收组件传值:{this.props.name}</div>
            {/* 类组件使用内部数据state */}
            <input type="text" value={this.state.n} readOnly={true}/>
            <button onClick={this.add}>+1</button>
        </div>
    }

    // add() {
    //     // this.setState({n: this.state.n + 1})
    //     // setState 会等一会儿去改变 n
    //     this.setState(state => {
    //         // 参数 state 是旧的state
    //         let n = state.n + 1
    //         return {n}
    //     })
    // }

    // 上面这个书写方法并不好，因为this问题，在绑定事件的时候还要用匿名函数，应该这样写
    // add = () => this.setState({n:this.state.n + 1})
    // add = () => {} 是个本在constructor内部的函数，它存在于对象实例
    // 至于为什么要写外面是为了在某些情况下少写constructor和this这几个字。所以写外面这种方式是写在constructor里面的语法糖
    add = () => this.setState(state => {
        let n = state.n + 1
        return {n}
    })
}


export default ComponentDemo