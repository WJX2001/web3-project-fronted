import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { ReactNode, useState } from 'react';

interface commonConfirmForFailLogProps {
  open: boolean;
  failText: string;
  failBtnText: string;
  failModalTitle: string;
  failModalContent: ReactNode;
  changeOpenHandle: () => void;
}
const commonConfirmForFailLog: React.FC<commonConfirmForFailLogProps> = (
  props,
) => {
  const { open, changeOpenHandle, failText, failBtnText, failModalTitle, failModalContent } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [failModal, setFailModal] = useState<boolean>(false);
  return (
    <>
      <Modal
        title='提示'
        open={open}
        onCancel={changeOpenHandle}
        width={400}
        destroyOnClose
        maskClosable={false}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText={'我知道了'}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ExclamationCircleFilled
            style={{ color: '#FFBB20', fontSize: '21px' }}
          />
          <span style={{ fontSize: '16px', marginLeft: '12px' }}>
            {failText}
          </span>
        </div>
        <div>
          <Button
            type={'link'}
            style={{ marginLeft: '34px' }}
            onClick={() => setFailModal(true)}
          >
            {failBtnText}
          </Button>
        </div>
      </Modal>
      <Modal
        title={failModalTitle}
        open={failModal}
        onCancel={() => setFailModal(false)}
        width={1200}
        destroyOnClose
        bodyStyle={{ maxHeight: 600, overflowY: 'auto' }}
        footer={null}
      >
        {failModalContent}
      </Modal>
    </>
  );
};
export default commonConfirmForFailLog;
