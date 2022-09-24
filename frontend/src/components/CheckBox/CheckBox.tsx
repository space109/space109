import styled from "styled-components";

const TransInput = styled.input.attrs(props => ({
  type: "checkbox",
  name: "Check",
}))`
  position: absolute;
  display: none;
  transition: scale(0);
`

const Box = styled.div`
  margin-top: 0.5em;
  display: flex;
  flex-direction: row;
  width: 8rem;
  height: 2rem;
  justify-content: start;
  border: 1px solid red;
`

const Button = styled.button`
  margin-top: -0.5rem;
  display: inline;
  transition: all .4s ease-in-out;
  &:hover {
    color: $dm-pt-color1;
  }
`

const Check = styled.span`
  display: block;
  width: inherit;
  height: inherit;
  border: 2px solid white;
  border-radius: 6px;
  transition: all 0.375s;

  input:checked ~ {
    transform: rotate(40deg);
    width: 11px;
    margin-left: 5px;
    border-color: $dm-pt-color1;
    border-top-color: transparent;
    border-left-color: transparent;
    border-radius: 0;
  }
`

const Label = styled.label`
  display: block;
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin-right: 0.5rem;
`

function CheckBox ({children}:any) {

  return (
    <Box>
      <Label>
      <TransInput></TransInput>
      <Check></Check>
      </Label>
      <Button>{children}</Button>
    </Box>
  );
}

CheckBox.defaultProps = {
  children: "판매중"
}

export default CheckBox;