// 权限控制hook
import { Access, useAccess } from '@umijs/max';

interface Props {
  // 权限码
  accessCode: string;
  accessComponet: JSX.Element;
}
const useAccessContainer: React.FC<Props> = (props) => {
  const access = useAccess();
  const { accessCode, accessComponet } = props;
  return (
    <Access accessible={access.btnPermissions?.includes(accessCode) ?? true}>
      {accessComponet}
    </Access>
  );
};

export default useAccessContainer;
