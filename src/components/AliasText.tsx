import React from "react";

export default function AliasText(props: { isAlias: boolean; text: string }) {
  const { isAlias, text } = props;
  return isAlias ? <>---</> : <>{text}</>;
}
