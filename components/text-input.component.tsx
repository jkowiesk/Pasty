import styled from "styled-components";
import { StoryDoc } from "../utils/types.utils";

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
  width: 100%;
`;

const Label = styled.label`
  padding-left: 4px;
  color: var(--color-secondary);
`;

const Input = styled.input`
  border-radius: 5px;
  background: var(--color-gray-1000);
  border: 1px solid var(--color-gray-50);
  outline: none;

  &:focus {
    border: 1px solid var(--color-primary);
  }
`;
