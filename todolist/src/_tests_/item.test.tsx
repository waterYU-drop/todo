import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import TodoItem from "../components/TodoItem";
import { TODO, TODOITEM } from "../store/stateType";
import TodoInput from "../components/TodoInput";


// Enzyme.configure({ adapter: new Adapter() })

// describe('Enzyme shallow的浅渲染（Shallow Rendering）中', function () {
//   it('Example组件中按钮的名字为子组件Sub中span的值', function () {
//     const name='按钮名'
//     let app = shallow(<Example text={name} />)
//     const buttonObj=app.find('button')
//     const spanObj=app.find('span')

//     console.info(`查找到button的个数：${buttonObj.length}`)
//     console.info(`查找到span的个数：${spanObj.length}`)

//     assert.equal(buttonObj.text(),spanObj.text())
//   })
// })


describe("Enzyme Shallow的浅渲染（Shallow Rendering）中'", () => {
// Example组件中按钮的名字为子组件Sub中span的值 TodoInputShow
    it("TodoInputShow", () => {
        let todoinput = shallow(<TodoInput />);
        //  const spanObj=app.find('span')
        // eslint-disable-next-line jest/valid-expect
        expect(todoinput.find("input").length).to.equal(1);
    });
});
it("addTodo", () => {
    const addliState: TODO = {
        todoli: [
            {
                id: 0,
                value: "todo1",
                status: 0,
            },
            {
                id: 1,
                value: "todo2",
                status: 0,
            }
        ],
        checked: 0,
        content: "",
    };
    let todoinput = shallow(<TodoInput />);
    const todo = {
        id: 3,
        value: "todo4",
        status: 0,
    };


    // 添加数据
    addliState.todoli.push(todo);
    let todoLength = addliState.todoli.length;
    let ul = shallow(
        <ul>
            {Array.from(addliState.todoli).map((todo: TODOITEM, index: number) => (
                <TodoItem item={todo} key={index} />
            ))}
            <li>
                完成 : {addliState.checked}&nbsp;/&nbsp;all :{" "}
                {addliState.todoli.length}
            </li>
        </ul>
    );
    //回车添加
// 主要利用simulate()接口模拟事件，实际上simulate是通过触发事件绑定函数，来模拟事件的触发。
// 触发事件后，去判断props上特定函数是否被调用，传参是否正确；组件状态是否发生预料之中的修改；某个dom节点是否存在是否符合期望。

    todoinput.find(".todoinput").simulate("click", { key: "Enter" });
    //有无显示 
    // expect(wrapper.find('.order-simpleGrid')).toHaveLength(0);
    // 长度有没有加一
    // eslint-disable-next-line jest/valid-expect
    expect(ul.children()).to.have.lengthOf(todoLength + 1);
});
it("delTodo", () => {
    const addliState: TODO = {
        todoli: [
            {
                id: 0,
                value: "todo1",
                status: 0,
            },
            {
                id: 1,
                value: "todo2",
                status: 0,
            },
            {
                id: 2,
                value: "todo3",
                status: 0,
            },
        ],
        checked: 0,
        content: "",
    };
    let item = shallow(<span className="delete-btn">删除</span>);

    // 删除数据
    addliState.todoli.splice(1, 1);
    let todoLength = addliState.todoli.length;
    let ul = shallow(
        <ul>
            {Array.from(addliState.todoli).map((todo: TODOITEM, index: number) => (
                <TodoItem item={todo} key={index} />
            ))}
        </ul>
    );
    item.find(".delete-btn").simulate("click");
    // eslint-disable-next-line jest/valid-expect
    expect(ul.children()).to.have.lengthOf(todoLength);
});

it("changeTodo", () => {
    let item = shallow(
        <span
            id="test_span"
            className="check-btn"
            onClick={() => {
                const d = document.getElementById("test_span") as HTMLElement;
                if (d) {
                    d.style.backgroundColor = "rgba(255, 255, 255, 0.5";
                }
            }}
            style={{ backgroundColor: "pink" }}
        ></span>
    );
    item.find(".check-btn").simulate("click");
    // console.log(item);
    
    // eslint-disable-next-line jest/valid-expect
    //  const itemStyle=item.find('span').get(0).style();
    //   expect(itemStyle).haveOwnProperty(
    //     'backgroundColor',
    //     'pink',
    //   );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    item.matchesElement(
        <span
            id="s"
            className="check-btn"
            onClick={() => {
                const d = document.getElementById("test_span") as HTMLElement;
                if(d){
                    d.style.backgroundColor = "pink";
                }
            }}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        ></span>
        // 样式是否改变
    ) === true;
});