import Matter from "matter-js";
import { getPipeSizePosPair } from "./random";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;


/**
 * Updates the game state by handling touch events, updating the physics engine, 
 * processing obstacles, and managing collision events.
 * 
 * @param entities - The current game entities including physics and obstacles.
 * @param params - An object containing touch events, time delta, and dispatch function.
 * @returns The updated entities after processing.
 * @throws {Error} Throws an error if the physics engine fails to update.
 */
export const Physics = (entities, { touches, time, dispatch }) => {
  const engine = entities.physics.engine;

  // Handle touch events
  touches
    .filter(t => t.type === "press")
    .forEach(() => {
      Matter.Body.setVelocity(entities.Bird.body, { x: 0, y: -4 });
    });

  // Update the physics engine
  Matter.Engine.update(engine, time.delta);

  // Process obstacles
  for (let index = 1; index <= 2; index++) {
    const obstacleTop = entities[`ObstacleTop${index}`];
    const obstacleBottom = entities[`ObstacleBottom${index}`];

    if (obstacleTop.body.bounds.max.x <= 50 && !obstacleTop.point) {
      obstacleTop.point = true;
      dispatch({ type: "new_point" });
    }

    if (obstacleTop.body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 1);

      Matter.Body.setPosition(obstacleTop.body, pipeSizePos.pipeTop.pos);
      Matter.Body.setPosition(obstacleBottom.body, pipeSizePos.pipeBottom.pos);

      obstacleTop.point = false;
    }

    // Move obstacles
    Matter.Body.translate(obstacleTop.body, { x: -3, y: 0 });
    Matter.Body.translate(obstacleBottom.body, { x: -3, y: 0 });
  }

  // Handle collision events
  if (!engine.hasCollisionHandler) {
    Matter.Events.on(engine, "collisionStart", () => {
      dispatch({ type: "game_over" });
    });
    engine.hasCollisionHandler = true; // Custom property to prevent duplicate registrations
  };

  return entities;
};