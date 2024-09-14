import { Button, Card, Col, Collapse } from 'antd';
import { useState } from 'react';
import AddressSection from './components/AddressSection';
import styles from './index.less';
const { Panel } = Collapse;

interface Props {
  publicAddress: string;
  privateKey: string;
}

const CardHolder: React.FC<Props> = (props) => {
  const { publicAddress, privateKey } = props;
  const [defaultCollapeKey, setDefaultCollapeKey] = useState<string>('1');

  return (
    <div className={styles['card-holder']}>
      <Col style={{ margin: '4px 0' }}>
        <Card className={styles['card-class'] }>
          <div>
            {defaultCollapeKey === '1' && (
              <Collapse
                key={'collapse1'}
                className={styles['custom-collapse']}
                defaultActiveKey={['1']}
                ghost
                destroyInactivePanel
              >
                <Panel showArrow={false} header="" key="1">
                  <AddressSection
                    publicAddress={publicAddress}
                    privateKey={privateKey}
                  />
                </Panel>
              </Collapse>
            )}
            {defaultCollapeKey === '2' && (
              <Collapse
                key={'collapse2'}
                className={styles['custom-collapse']}
                defaultActiveKey={['2']}
                ghost
                destroyInactivePanel
              >
                <Panel showArrow={false} header="" key="2">
                  <p>22222</p>
                </Panel>
              </Collapse>
            )}
          </div>
          <div className={styles['card-footer']}>
            <div className={styles['button-container']}>
              <Button
                type="text"
                size="small"
                disabled={defaultCollapeKey === '1'}
                onClick={() => {
                  setDefaultCollapeKey('1');
                }}
              >
                Address
              </Button>
              ｜
              <Button
                type="text"
                size="small"
                disabled={defaultCollapeKey === '2'}
                onClick={() => {
                  setDefaultCollapeKey('2');
                }}
              >
                KeyStore
              </Button>
            </div>
          </div>
        </Card>
      </Col>
    </div>
  );
};

export default CardHolder;
