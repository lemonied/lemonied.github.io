import { cloneElement, FC } from 'react';

const icons = {
  close: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0002 10.5867L16.9502 5.63672L18.3642 7.05072L13.4142 12.0007L18.3642 16.9507L16.9502 18.3647L12.0002 13.4147L7.05023 18.3647L5.63623 16.9507L10.5862 12.0007L5.63623 7.05072L7.05023 5.63672L12.0002 10.5867Z" fill="#2F3B4F"/>
    </svg>
  ),
};

interface IconProps {
  type: keyof typeof icons;
}
const Icon: FC<IconProps & React.SVGProps<SVGSVGElement>> = (props) => {

  const { type, ...extra } = props;

  const icon = icons[type];

  if (icon) {
    return cloneElement(icon, extra);
  }
  return null;
};

export { Icon };
