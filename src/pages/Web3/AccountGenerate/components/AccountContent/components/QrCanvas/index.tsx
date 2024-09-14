
import { QRCode } from 'antd'
import React from 'react'

const QrCanvas = () => {
  return (
    <div>
      <QRCode value='11111' size={148}/>
    </div>
  )
}

export default QrCanvas