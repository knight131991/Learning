import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'
import GreenCard from './Components/GreenCard'
import { Select, Button } from 'antd'
import 'antd/dist/antd.css'

class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello React!</h1>
                <Select defaultValue="1">
                    <Select.Option value="1">中文</Select.Option>
                    <Select.Option value="2">English</Select.Option>
                </Select>
                <Button>Click me!</Button>
                <GreenCard content="hahahahaha" height="100px" />
            </div>
        )
    }
}

export default hot(App)
