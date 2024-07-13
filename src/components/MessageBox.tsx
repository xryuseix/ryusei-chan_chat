import { InputGroup } from "@rewind-ui/core";
import { PaperPlaneTilt } from "@phosphor-icons/react";

type Props = {
  boxStyle: React.CSSProperties;
};

export const MessageBox = ({ boxStyle }: Props) => {
  return (
    <div style={Object.assign({}, boxStyle, styles.messageBox)}>
      <InputGroup>
        <InputGroup.Input
          placeholder={"Search..."}
          type="search"
          withRing={false}
        />
        <InputGroup.Button withRing={false}>
          <PaperPlaneTilt weight="duotone" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

const styles = {
  messageBox: {
    bottom: 0,
    left: 0,
    zIndex: 101,
    margin: 4,
  },
};
