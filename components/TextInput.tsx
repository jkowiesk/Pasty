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

  width: 250px;
`;

const Label = styled.label`
  margin-left: 4px;
  color: var(--color-primary);
`;

const Input = styled.input`
  border: 2px solid var(--color-gray-50);
  border-radius: 5px;
  background: var(--color-gray-1000);

  &:focus {
    outline: none;
    border: 2px solid var(--color-secondary-light);
  }
`;
