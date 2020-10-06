/*eslint-env node*/

// var nodemailer = require('nodemailer')
const http = require('http')

const sendNotification = cookie => {
    const emailInfo = JSON.stringify({
        messageType: 'EMAIL',
        body: {
            sender: 'DMS-UI BOT',
            recipient: [
                'TZU.CHIEH.LIN@DELTAWW.COM',
                'STEINER.WANG@DELTAWW.COM',
            ],
            subject: '參見死靈大法師',
            content: 'DMS-UI BOT 晉見死靈大法師',
            priority: 3,
            origin: 'community',
        },
    })
    const request = http.request(
        {
            method: 'POST',
            host: '10.136.226.139',
            path: '/dmsnotification/notification',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Content-length': Buffer.byteLength(emailInfo),
                cookie: cookie.join('; '),
            },
        },
        res => {
            console.log('sned email status code', res.statusCode)
            res.on('error', e => {
                console.error('ERR', e)
            })

            res.on('data', chunk => {
                console.log(`mail BODY: ${chunk}`)
            })
        }
    )
    request.write(emailInfo)
    request.end()
}

const userInfo = JSON.stringify({
    password: 'RMSpassw0rd',
    username: 'softbot.debbie',
})

const req = http.request(
    {
        method: 'POST',
        host: '10.136.226.139',
        path: '/dmsnotification/auth/login',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': userInfo.length,
        },
    },
    res => {
        if (res.headers['set-cookie']) {
            sendNotification(res.headers['set-cookie'])
        }
        res.on('data', chunk => {
            console.log(`BODY: ${chunk}`)
        })

        res.on('error', e => {
            console.error('ERR', e)
        })
    }
)

req.write(userInfo)
req.end()

// const transporter = nodemailer.createTransport({
//     host: 'mail.deltaww.com',
//     port: 25,
//     auth: {
//         user: 'TZU.CHIEH.LIN@deltaww.com',
//         pass: '1qaz2WSX-+',
//     },
// })

// const mailOptions = {
//     from: 'TZU.CHIEH.LIN@deltaww.com',
//     to: 'TZU.CHIEH.LIN@deltaww.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!',
// }

// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log('Email sent: ' + info.response)
//     }
// })
