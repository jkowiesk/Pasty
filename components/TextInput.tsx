import styled from "styled-components";
import { Story } from "../utils/types.utils";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: any;
  type?: string;
};

export default function TextInput({
  label,
  name,
  value,
  onChange,
  type,
}: Props) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        type={type ? type : "text"}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 200px;
`;

const Label = styled.label`
  color: var(--color-secondary);
`;

const Input = styled.input`
  border: none;
  outline: none !important;
  background: var(--color-primary-dark);
  &:focus {
  }
`;
