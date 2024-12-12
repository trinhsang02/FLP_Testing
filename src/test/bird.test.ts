import React from "react";
import { render } from "@testing-library/react-native";
import Bird from "../components/Bird";

// Mock hình ảnh
jest.mock("../../assets/images/bluebird-midflap.png", () => "bluebird-image");
jest.mock("../../assets/images/default-bird.png", () => "default-bird-image");

describe("Bird Component", () => {
  it("renders the bird with the correct image based on the skin prop", () => {
    const mockBody = {
      bounds: { min: { x: 0, y: 0 }, max: { x: 50, y: 50 } },
      position: { x: 25, y: 25 },
    };

    const { getByTestId } = render(
      <Bird body={mockBody} skin="blue" />
    );

    // Kiểm tra xem hình ảnh của bluebird được render
    expect(getByTestId("bird-image").props.source).toBe("bluebird-image");
  });

  it("renders the default bird image when skin is not provided", () => {
    const mockBody = {
      bounds: { min: { x: 0, y: 0 }, max: { x: 50, y: 50 } },
      position: { x: 25, y: 25 },
    };

    const { getByTestId } = render(
      <Bird body={mockBody} skin="unknown" />
    );

    // Kiểm tra xem hình ảnh mặc định được render
    expect(getByTestId("bird-image").props.source).toBe("default-bird-image");
  });
});
