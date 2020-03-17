import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import data from './Asset/data'
import columns from './Asset/columns'

const App = () => {
    return (
        <div>
            <h1>ESLint Report</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default hot(App)
