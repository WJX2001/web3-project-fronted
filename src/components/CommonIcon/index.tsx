import { classnames } from 'syfed-ui';
import React from 'react';
import styles from './index.module.less';

interface IconProps {
  type: string;
  style?: React.CSSProperties;
  onClick?: (name?: any, e?: Event) => void;
  name?: any;
  className?: string;

  [propKey: string]: any;
}

const CommonIcon: React.FC<IconProps> = (props) => {
  const { type, className, name, style, ...other } = props;
  const handleClick = (e) => {
    props.onClick && props.onClick(props.name, e);
  };
  return (
    <svg
      className={classnames(styles.icon, className)}
      aria-hidden="true"
      style={{ ...style }}
      onClick={handleClick}
      name={name}
      {...other}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};

export default CommonIcon;
