import styled from "styled-components";
import { Story } from "../utils/types.utils";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: any;
  type?: string;
  required?: boolean;
};

export default function TextInput({
  label,
  name,
  value,
  onChange,
  type,
  ...otherProps
}: Props) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        type={type ? type : "text"}
        name={name}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: min(100%, 250px);
`;

const Label = styled.label`
  margin-left: 4px;
  color: var(--color-secondary);
`;

const Input = styled.input`
  border-radius: 5px;
  background: var(--color-gray-1000);
  border: 2px solid var(--color-gray-50);
  outline: none;

  &:focus {
    border: 2px solid var(--color-primary);
  }
`;
