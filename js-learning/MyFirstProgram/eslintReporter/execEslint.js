const fs = require('fs')

const { exec } = require('child_process')

process.argv.splice(0, 2)

const command = `..\\node_modules\\.bin\\eslint -f compact ${process.argv.join(' ')} > .\\test.txt`

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log('process.argv', process.argv)
        const data = fs
            .readFileSync('./test.txt')
            .toString()
            .split('\n')
            .filter(str => str.length > 1)
            .map((str, id) => {
                const reg = /(.*): line \d+, col \d+, (.*) - (.*)\((.*)\)/
                const result = reg.exec(str)
                if (!result) {
                    console.error('\x1b[31m%s\x1b[0m', `no match string: "${str}"`)
                    return
                }
                console.log(str)
                return {
                    key: id,
                    file: result[1],
                    type: result[2],
                    description: result[3].replace(/</g, '!@#123').replace(/>/g, '123!@#'),
                    rule: result[4],
                }
            })
        let htmlContent = fs.readFileSync('./index_copy.html').toString()
        htmlContent = htmlContent.replace('{replace me haha}', JSON.stringify(data))
        fs.writeFile('./index.html', htmlContent, err => {
            if (err) throw err
        })
        console.error('\x1b[32m%s\x1b[0m', 'Done!!')
        exec('start ./index.html')
        return
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
    }
    console.log(`stdout: ${stdout}`)
})
