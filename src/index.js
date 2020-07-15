import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let n = 0
// createElement是React创建出来的一个虚拟DOM对象。
// 如果下面不使用函数，那么创建的就只是一个元素，而使用函数后则为一个函数组件
const myApp = () => React.createElement(
    // 参数1 是创建的1级节点类型
    'div',
    // 参数 2 设置参数属性
    {className:'red'},
    // 参数 3 设置节点内的参数值，并可以以数组形式创建更多的子节点
    [n,
        React.createElement(
            'button',
            {
                onClick:() => {
                    n += 1
                    ReactDOM.render(myApp() ,
                        document.getElementById('root'))
                }},'+1'
        )
    ]
)
ReactDOM.render(myApp() ,
  document.getElementById('root')
);

