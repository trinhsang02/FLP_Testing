import { View } from "react-native";
import React from "react";
import Matter from "matter-js";
import { styles } from "./styles";

const Flor = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={
        styles({
          widthBody,
          heightBody,
          xBody,
          yBody,
          color,
        }).bird
      }
    />
  );
};

export default (world, color, pos, size) => {
  const initialFlor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: "Flor",
      isStatic: true,
    }
  );

  Matter.World.add(world, [initialFlor]);

  return {
    body: initialFlor,
    color,
    pos,
    renderer: <Flor />,
  };
};