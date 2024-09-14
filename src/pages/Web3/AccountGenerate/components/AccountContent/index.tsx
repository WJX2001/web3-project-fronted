import { Card, Tabs } from 'antd';
import AlertContent from './components/AlertContent';
import PublicKeyComp from './components/PublicKeyComp';
import './index.less';
const AccountContent = () => {
  return (
    <div>
      <AlertContent />
      <div className="generate-machine">
        <Card bordered={false}>
          <div className="generate-machine-content">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  label: 'Public/Private Key',
                  key: '1',
                  children: <PublicKeyComp />,
                },
                {
                  label: `Tab 2`,
                  key: '2',
                  children: `Content of Tab Pane 2`,
                },
              ]}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountContent;
