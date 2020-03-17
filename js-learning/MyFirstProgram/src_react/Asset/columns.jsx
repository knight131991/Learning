import React from 'react'
export default [
    {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
        sorter: (a, b) => a.type.length - b.type.length,
        filters: [
            { text: 'Error', value: 'Error' },
            { text: 'Warning', value: 'Warning' },
        ],
        onFilter: (value, record) => record.type.includes(value),
        ellipsis: true,
    },
    {
        title: 'File',
        key: 'file',
        dataIndex: 'file',
        sorter: (a, b) => a.file.length - b.file.length,
        ellipsis: true,
    },
    {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
        ellipsis: true,
    },
    {
        title: 'Eslint Rule',
        key: 'rule',
        dataIndex: 'rule',
        sorter: (a, b) => a.description.length - b.description.length,
        // eslint-disable-next-line react/display-name
        render: text => {
            return (
                <a
                    href={`https://eslint.org/docs/rules/${text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {text}
                </a>
            )
        },
        ellipsis: true,
    },
]
