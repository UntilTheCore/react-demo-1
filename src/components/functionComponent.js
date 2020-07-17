import React, {useCallback, useEffect, useState} from "react";
// 函数组件练习，函数组件如何使用生命周期钩子

// 自定义钩子，实现对数据监听时排除第一次初始化那次
// 注意：想要在一个函数内部使用hook函数，那这个函数也必须是hook函数或者是自定义hook函数。
// 而自定义hook函数命名必须要以use开头的命名，这是官方的规定。
// 具体看文档 ==> https://zh-hans.reactjs.org/docs/hooks-custom.html


// 当state被设置的时候，即代码中的setCount，那么就会触发组件重新渲染
// 所以每次点击使n更新也造成count更新，使得useUpdate被调用两次
// 解决方法是阻止重新渲染，类组件有shouldComponentUpdate，函数组件又怎么办呢?
const useUpdate = (fn,num) => {
    console.log('组件产生更新')
    const [count,setCount] = useState(0)
    useEffect( () => {
        setCount(x => {
            console.log('setCount内的x:'+(x + 1))
           return x + 1 }
        )
    },[num])

    // 在这里对 fn 进行改造，使其保持一致，不受渲染的影响
    // useCallback 是 useMemo 的语法糖，少些一个 () => fn
    const temp = useCallback(fn,[])
    useEffect( () => {
        console.log(count);
        if(count >= 1) {
            // fn()
            temp()
        }
        // 数组不监听 fn 会有警告信息，监听了会产生调用两次fn的bug
        // 原因是每次重新渲染时会重新得到fn的值，所以传入到这个函数的fn在每次渲染后会不同
        // 以至于我们将 fn 加入到依赖中会使fn调用两次
    },[count,temp])
}

const FunComponent = () => {
    const [n, setN] = React.useState(0)
    const onClickN = () => {
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

    const fn = () => {
        console.log('n改变了!')
    }
    console.log('父组件更新了!')
    // 使用自定义hook
    useUpdate( fn,n)
    return (
        <div>
            <p>我是FunComponent</p>
            n:{n}
            <button onClick={onClickN}> +1</button>
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
    console.log('Child组件更新了!')
    const [m,setM] = useState(0)
    // const [temp,setTemp] = useState(0)
    // useEffect( () => {
    //     console.log('Child 的m 发生改变了!')
    //     setTemp( temp + 1 )
    // },[m])
    const onClickM = () => {
        setM( m + 1 )
    }
    // 模拟componentWillUnmount() 钩子函数
    // 注意一定要在第二个参数加 [] ,表示在加载和消亡时只调用一次
    React.useEffect(() => {
        // 只处理卸载请求就可省略return之外的内容。
        console.log('第一次渲染Child组件!')
        return () => {
            console.log('Child消亡了！')
        }
    },[])
    return (
        <div>
            <p>Child - show</p>
            m:{m}
            <button onClick={onClickM}>+1</button>
        </div>
    )
}


export default FunComponent