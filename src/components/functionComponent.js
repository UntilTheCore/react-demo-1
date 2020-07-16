import React from "react";
// 函数组件练习，函数组件如何使用生命周期钩子

const FunComponent = () => {
    const [n, setN] = React.useState(0)
    const onClick = () => {
        setN(n + 1)
    }
    let [childVisible, setChildVisible] = React.useState(1)
    const show = () => {
        setChildVisible(1)
    }
    const hide = () => {
        setChildVisible(0)
    }

    // 模拟componentDidUpdate() 钩子函数
    // 第二个参数要么没有，要么必须是一个数组，数组内放可能会发生改变的值。
    // 如果没有传第二个参数，那么就是监听所有变量的改变
    // React.useEffect(() => {
    //     console.log('n发生改变了！')
    // }, [n/*,m*/])

    // React.useEffect( () => {
    //     console.log('改变了!')
    // })

    // 模拟 componentDidMount
    React.useEffect( () => {
        console.log('第一次渲染父组件!')
    }, [])

    return (
        <div>
            <p>我是FunComponent</p>
            n:{n}
            <button onClick={onClick}> +1</button>
            {/*<Child />*/}
            {childVisible ?
                <>
                <button onClick={hide}>hide</button>
                <Child/>
                </>
                :
                <button onClick={show}>show</button>
            }
        </div>
    )
}

const Child = () => {
    // 模拟componentWillUnmount() 钩子函数
    // 注意一定要在第二个参数加 [] ,表示在加载和消亡时只调用一次
    React.useEffect(() => {
        console.log('第一次渲染Child组件!')
        return () => {
            console.log('Child消亡了！')
        }
    },[])
    return (
        <div>Child - show</div>
    )
}


export default FunComponent