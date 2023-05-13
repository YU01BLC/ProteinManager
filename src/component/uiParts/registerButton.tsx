import { Button, ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {
  onClick?: () => void;
  label?: string;
};

export default function RegisterButton({ onClick, label, ...rest }: Props) {
  return (
    <Button onClick={onClick} {...rest}>
      {label}
    </Button>
  );
}
