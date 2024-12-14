import Matter from "matter-js";
import { Physics } from "../physics";
import { getPipeSizePosPair } from "../random";
import { Dimensions } from "react-native";

// Mock Dimensions
jest.mock("react-native", () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({ height: 800, width: 400 }),
  },
}));

// Mock getPipeSizePosPair
jest.mock("../random", () => ({
  getPipeSizePosPair: jest.fn(() => ({
    pipeTop: { pos: { x: 100, y: 200 } },
    pipeBottom: { pos: { x: 100, y: 600 } },
  })),
}));

describe("Physics()", () => {
  let mockEntities: any;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockEntities = {
      physics: {
        engine: Matter.Engine.create(),
      },
      Bird: {
        body: Matter.Bodies.rectangle(0, 0, 50, 50),
      },
      ObstacleTop1: {
        body: Matter.Bodies.rectangle(200, 100, 50, 300),
        point: false,
      },
      ObstacleBottom1: {
        body: Matter.Bodies.rectangle(200, 500, 50, 300),
      },
      ObstacleTop2: {
        body: Matter.Bodies.rectangle(400, 100, 50, 300),
        point: false,
      },
      ObstacleBottom2: {
        body: Matter.Bodies.rectangle(400, 500, 50, 300),
      },
    };
  });

  it("should update bird velocity on touch press", () => {
    const touches = [{ type: "press" }];
    const time = { delta: 16 };

    Physics(mockEntities, { touches, time, dispatch: mockDispatch });

    expect(mockEntities.Bird.body.velocity.y).toBe(-4);
  });

  it("should update the physics engine", () => {
    const time = { delta: 16 };

    const spyEngineUpdate = jest.spyOn(Matter.Engine, "update");

    Physics(mockEntities, { touches: [], time, dispatch: mockDispatch });

    expect(spyEngineUpdate).toHaveBeenCalledWith(mockEntities.physics.engine, 16);
  });

  it("should dispatch 'new_point' when obstacle passes threshold", () => {
    mockEntities.ObstacleTop1.body.bounds.max.x = 49;

    Physics(mockEntities, { touches: [], time: { delta: 16 }, dispatch: mockDispatch });

    expect(mockDispatch).toHaveBeenCalledWith({ type: "new_point" });
    expect(mockEntities.ObstacleTop1.point).toBe(true);
  });

  it("should call getPipeSizePosPair when obstacle resets", () => {
    mockEntities.ObstacleTop1.body.bounds.max.x = -1;

    Physics(mockEntities, { touches: [], time: { delta: 16 }, dispatch: mockDispatch });

    expect(getPipeSizePosPair).toHaveBeenCalledWith(400);
  });

  it("should translate obstacles to the left", () => {
    const initialTopPosition = { ...mockEntities.ObstacleTop1.body.position };
    const initialBottomPosition = { ...mockEntities.ObstacleBottom1.body.position };

    Physics(mockEntities, { touches: [], time: { delta: 16 }, dispatch: mockDispatch });

    expect(mockEntities.ObstacleTop1.body.position.x).toBe(initialTopPosition.x - 3);
    expect(mockEntities.ObstacleBottom1.body.position.x).toBe(initialBottomPosition.x - 3);
  });

//   it("should dispatch 'game_over' on collision", () => {
//     Matter.Events.trigger(mockEntities.physics.engine, "collisionStart", { pairs: [] });

//     Physics(mockEntities, { touches: [], time: { delta: 16 }, dispatch: mockDispatch });

//     expect(mockDispatch).toHaveBeenCalledWith({ type: "game_over" });
//   });
});
