import { InputGroup } from "@rewind-ui/core";
import { PaperPlaneTilt } from "@phosphor-icons/react";

type Props = {
  boxStyle: React.CSSProperties;
};

const placeholders: { text: string; weight: number }[] = [
  { text: "何か話しかけてみよう！", weight: 10 },
  { text: "あなたは誰？", weight: 5 },
  { text: "りゅうせいちゃんとお話ししよう！", weight: 5 },
  { text: "お前を消す方法", weight: 5 },
];

const getRandomPlaceholder = () => {
  const totalWeight = placeholders.reduce((acc, cur) => acc + cur.weight, 0);
  const random = Math.random() * totalWeight;
  let sum = 0;
  for (const placeholder of placeholders) {
    sum += placeholder.weight;
    if (random < sum) {
      return placeholder.text;
    }
  }
  return placeholders?.[0].text ?? "";
};

export const MessageBox = ({ boxStyle }: Props) => {
  return (
    <div style={Object.assign({}, boxStyle, styles.messageBox)}>
      <InputGroup>
        <InputGroup.Input
          placeholder={getRandomPlaceholder()}
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
