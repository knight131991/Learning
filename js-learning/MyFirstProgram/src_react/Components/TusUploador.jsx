import React, { useState, useMemo } from 'react'
import * as tus from 'tus-js-client'
// import PropTypes from 'prop-types'

function TusUploador() {
    const status = useMemo(
        () => ({
            uploading: '上傳中!',
            resuming: '偵測到此檔案有上傳紀錄，續傳中!',
            waiting: '等待中',
            stop: '暫停上傳!',
            finish: '上傳完成!',
        }),
        []
    )
    const [upload, setUpload] = useState()
    const [num, setNum] = useState('')
    const [link, setLink] = useState('')
    const [curState, setCurState] = useState(status.waiting)
    return (
        <>
            <div>
                <h3>
                    選擇欲上傳的檔案(檔案會傳到tus的官方伺服器，勿上傳機密文件)
                </h3>
                <input
                    type="file"
                    disabled={
                        curState === status.uploading ||
                        curState === status.resuming
                    }
                    onChange={e => {
                        if (!e.target.files) return
                        if (!e.target.files.length) return
                        const file = e.target.files[0]
                        console.log('file', file, e.target.files)
                        tus.defaultOptions.endpoint =
                            'https://tusd.tusdemo.net/files/'
                        tus.defaultOptions.removeFingerprintOnSuccess = true
                        const tusUpload = new tus.Upload(file, {
                            metadata: {
                                filename: file.name,
                                filetype: file.type,
                            },
                            onError: error => console.log('error', error),
                            onSuccess: () => {
                                setLink(tusUpload.url)
                                setCurState(status.finish)
                                console.log(
                                    'Download %s from %s',
                                    tusUpload.file.name,
                                    tusUpload.url
                                )
                            },
                            onProgress: (bytesUploaded, bytesTotal) => {
                                setNum(
                                    `上傳進度: ${(
                                        (bytesUploaded / bytesTotal) *
                                        100
                                    ).toFixed(2)}`
                                )
                            },
                        })
                        setUpload(tusUpload)
                        tusUpload.findPreviousUploads().then(preUploads => {
                            if (preUploads.length) {
                                setCurState(status.resuming)
                                const item = preUploads
                                    .sort(
                                        (a, b) =>
                                            new Date(b.creationTime).getTime() -
                                            new Date(a.creationTime).getTime()
                                    )
                                    .pop()
                                tusUpload.resumeFromPreviousUpload(item)
                            } else {
                                setCurState(status.uploading)
                            }
                            tusUpload.start()
                        })
                    }}
                ></input>
            </div>
            <h2>
                目前狀態: {curState} {num}
            </h2>
            {(curState === status.uploading ||
                curState === status.stop ||
                curState === status.resuming) && (
                <button
                    onClick={
                        curState === status.stop
                            ? () => {
                                  upload.start()
                                  setCurState(status.uploading)
                              }
                            : () => {
                                  upload.abort()
                                  setCurState(status.stop)
                              }
                    }
                >
                    {curState === status.stop ? '繼續上傳' : '暫停上傳'}
                </button>
            )}

            {link && (
                <a href={link}>
                    <h2>點此下載檔案</h2>
                </a>
            )}
        </>
    )
}

TusUploador.propTypes = {}

export default TusUploador
