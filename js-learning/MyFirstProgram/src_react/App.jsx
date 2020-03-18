import React, { useState, useCallback } from 'react'
import { hot } from 'react-hot-loader/root'
import Table from 'antd/lib/table/Table'
import 'antd/dist/antd.css'
import columns from './Asset/columns'
sdfsdf

const App = () => {
    const data = JSON.parse(document.getElementById('data').innerHTML).filter(
        data => data !== null
    )
    const [num, setNum] = useState(data.length)

    const rules = [...new Set(data.map(d => d.rule))].map(rule => ({
        text: rule,
        value: rule,
    }))
    const onTableChange = useCallback((pagination, filters, sorter, extra) => {
        setNum(extra.currentDataSource.length)
    })

    return (
        <div style={{ padding: '0 20px' }}>
            <h1>ESLint Report</h1>
            <h3 style={{ color: 'red' }}>{num} problems</h3>
            <Table
                columns={columns(rules)}
                dataSource={data}
                pagination={false}
                onChange={onTableChange}
            />
        </div>
    )
}

export default hot(App)
