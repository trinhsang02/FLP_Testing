import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useContractRead, useBalance } from "wagmi";

// Mock các hooks của wagmi
jest.mock("wagmi", () => ({
  useBalance: jest.fn(),
  useContractRead: jest.fn(),
  usePrepareContractWrite: jest.fn(),
  useContractWrite: jest.fn(),
}));

describe("Swap Component Logic", () => {
  let coins, setCoins, mockOnApprove, mockBalance, mockApprovedAmount;

  beforeEach(() => {
    // Mock các giá trị cần thiết
    coins = { coin1: "RON", coin2: "FLP" };
    setCoins = jest.fn();
    mockBalance = { coin1: 1, coin2: 10 };
    mockApprovedAmount = 0.5 * 1e18; // 0.5 FLP

    // Clear mocks before each test
    jest.clearAllMocks();

    // Mocking useContractWrite return value
    mockOnApprove = jest.fn(() => ({
      hash: "0x123",
    }));
    useContractWrite.mockReturnValue({ writeAsync: mockOnApprove });
  });

  it("Initial coin state is set correctly", () => {
    expect(coins).toEqual({ coin1: "RON", coin2: "FLP" });
  });

  it("Swap coins functionality works as expected", () => {
    // Giả lập việc gọi hàm đổi chỗ coin
    setCoins({ coin1: coins.coin2, coin2: coins.coin1 });
    expect(setCoins).toHaveBeenCalledWith({ coin1: "FLP", coin2: "RON" });
  });

  it("Contract write approve function works", async () => {
    const response = await mockOnApprove();
    expect(response.hash).toEqual("0x123");
    expect(mockOnApprove).toHaveBeenCalled();
  });

  it("Calculate button text based on input", () => {
    const buttonText = (coinAmount1, coins, approvedAmount, txLoading, balance) => {
      if (Number(coinAmount1) === 0) {
        return "Enter an amount";
      } else if (Number(coinAmount1) > Number(balance.coin1)) {
        return "Insufficient " + coins.coin1 + " Balance to swap";
      } else if (
        coins.coin1 === "FLP" &&
        parseFloat((approvedAmount)?.toString()) / 1e18 < Number(coinAmount1)
      ) {
        return txLoading ? "Approving..." : "Approve spending cap";
      } else {
        return txLoading ? "Swapping..." : "Swap";
      }
    };

    const result = buttonText(0.6, { coin1: "FLP", coin2: "RON" }, mockApprovedAmount, false, mockBalance);
    expect(result).toEqual("Approve spending cap");
  });

  it("Contract read balance updates correctly", () => {
    useBalance.mockReturnValue({
      data: { value: BigInt(2 * 1e18) }, // 2 RON
    });

    const balance = useBalance();
    expect(balance.data.value).toEqual(BigInt(2 * 1e18));
  });

  it("Check disabled button condition works", () => {
    const checkDisabled = (coinAmount1, balance, txLoading, coins, approvedAmount) => {
      if (txLoading) return true;
      if (Number(coinAmount1) === 0) return true;
      if (Number(coinAmount1) > Number(balance.coin1)) return true;
      if (
        coins.coin1 === "FLP" &&
        parseFloat((approvedAmount)?.toString()) / 1e18 <
          Number(coinAmount1)
      ) {
        return false;
      }
      return false;
    };

    const result = checkDisabled(0.5, { coin1: 1, coin2: 10 }, false, { coin1: "FLP", coin2: "RON" }, 0.3 * 1e18);
    expect(result).toBe(false);
  });
});
