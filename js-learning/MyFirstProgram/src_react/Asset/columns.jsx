import React from 'react'
export default function(rules) {
    return [
        {
            title: 'Type',
            key: 'type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
            width: 100,
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
            width: 400,
            sorter: (a, b) => a.description - b.description,
            ellipsis: true,
        },
        {
            title: 'Eslint Rule',
            key: 'rule',
            filters: rules,
            dataIndex: 'rule',
            width: 200,
            onFilter: (value, record) => record.rule.includes(value),
            sorter: (a, b) => (a.rule - b.rule > 0 ? 1 : -1),
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
}
