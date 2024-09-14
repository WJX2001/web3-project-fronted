import { copyFunction } from '@/utils';
import {
  CopyOutlined,
  EnvironmentOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, QRCode } from 'antd';

import download from 'downloadjs';
import { useState } from 'react';
import styles from './AddressSection.less';
interface Props {
  publicAddress: string;
  privateKey: string;
}
const AddressSection: React.FC<Props> = (props) => {
  const { publicAddress, privateKey } = props;
  // 地址
  const [publicAddressContent, setPublicAddressContent] =
    useState<string>(publicAddress);
  // 私钥
  const [privateKeyContent, setPrivateKeyContent] =
    useState<string>(privateKey);
  // 将地址和私钥作为文件下载
  const downloadAddress = () => {
    const fileName = 'VET_' + publicAddressContent + '.txt';
    const content =
      'VET Address: ' +
      publicAddressContent +
      '\n' +
      'Private key: ' +
      privateKeyContent;
    download(content, fileName, 'application/json');
  };

  return (
    <div>
      <h4 className={styles['content-title']}>VET Address</h4>
      <div className={styles['qr-canvase']}>
        <QRCode value={publicAddress} size={148} />
      </div>
      <div className={styles['address-content']}>
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 19 }} colon={false}>
          <Form.Item label={<EnvironmentOutlined />} name="publicAddress">
            <div className={styles['custom-formItem']}>
              <Input
                value={publicAddressContent}
                onChange={(e) => {
                  setPublicAddressContent(e.target.value);
                }}
                id="publicAddress"
                addonAfter={
                  <CopyOutlined
                    onClick={() => {
                      copyFunction(publicAddressContent);
                      message.success('复制成功');
                    }}
                  />
                }
              />
            </div>
          </Form.Item>
          <h4 className={styles['privatekey-style']}>Its Private Key</h4>
          <Form.Item label={<KeyOutlined />} name="privateAddress">
            <div className={styles['custom-formItem']}>
              <Input
                value={privateKeyContent}
                onChange={(e) => {
                  setPrivateKeyContent(e.target.value);
                }}
                id="privateAddress"
                addonAfter={
                  <CopyOutlined
                    onClick={() => {
                      copyFunction(privateKeyContent);
                      message.success('复制成功');
                    }}
                  />
                }
              />
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className={styles['submit-button-content']}>
              <Button type="primary" size="large" onClick={downloadAddress}>
                Print/Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddressSection;
