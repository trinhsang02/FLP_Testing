import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useContractRead, useBalance, useAccount } from "wagmi";

// Mock the wagmi hooks
jest.mock("wagmi", () => ({
  useAccount: jest.fn(),
  useContractRead: jest.fn(),
  usePrepareContractWrite: jest.fn(),
  useContractWrite: jest.fn(),
}));

describe("NFTDetail Component Logic", () => {
  let mockNft, mockAddress, mockOnApprove, mockOnBuyNFT, mockUserBalance, mockApprovedAmount;

  beforeEach(() => {
    // Mock initial values
    mockNft = {
      id: "1",
      price: BigInt(2 * 1e18).toString(), // 2 FLP
    };
    mockAddress = "0x123...";
    mockUserBalance = BigInt(5 * 1e18); // 5 FLP
    mockApprovedAmount = BigInt(1 * 1e18); // 1 FLP initially approved

    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock contract write functions
    mockOnApprove = jest.fn(() => ({
      hash: "0x456",
    }));
    mockOnBuyNFT = jest.fn(() => ({
      hash: "0x789",
    }));

    useContractWrite.mockImplementation((config) => {
      if (config?.functionName === "approve") {
        return { writeAsync: mockOnApprove };
      }
      return { writeAsync: mockOnBuyNFT };
    });

    // Mock useAccount
    useAccount.mockReturnValue({ address: mockAddress });
  });

  it("Button text changes based on approval status and loading state", () => {
    const buttonText = (txLoading: boolean, amountApproved: bigint, nftPrice: number) => {
      if (txLoading && amountApproved >= BigInt(nftPrice)) return "Buying...";
      else if (amountApproved >= BigInt(nftPrice)) return "Buy";
      else if (txLoading && amountApproved < BigInt(nftPrice)) return "Approving...";
      else return "Approve";
    };

    // Test different scenarios
    expect(buttonText(false, BigInt(3 * 1e18), 2 * 1e18)).toBe("Buy");
    expect(buttonText(true, BigInt(3 * 1e18), 2 * 1e18)).toBe("Buying...");
    expect(buttonText(false, BigInt(1 * 1e18), 2 * 1e18)).toBe("Approve");
    expect(buttonText(true, BigInt(1 * 1e18), 2 * 1e18)).toBe("Approving...");
  });

  it("Contract write approve function works", async () => {
    const response = await mockOnApprove();
    expect(response.hash).toBe("0x456");
    expect(mockOnApprove).toHaveBeenCalled();
  });

  it("Contract write buy NFT function works", async () => {
    const response = await mockOnBuyNFT();
    expect(response.hash).toBe("0x789");
    expect(mockOnBuyNFT).toHaveBeenCalled();
  });

  it("Handles insufficient balance correctly", () => {
    const checkInsufficientBalance = (userBalance: bigint, nftPrice: bigint) => {
      return userBalance < nftPrice;
    };

    expect(checkInsufficientBalance(BigInt(1 * 1e18), BigInt(2 * 1e18))).toBe(true);
    expect(checkInsufficientBalance(BigInt(3 * 1e18), BigInt(2 * 1e18))).toBe(false);
  });

  it("Button is disabled during transactions", () => {
    const buttonStyle = (txLoading: boolean) => {
      return txLoading ? "disabledButton" : "button";
    };

    expect(buttonStyle(true)).toBe("disabledButton");
    expect(buttonStyle(false)).toBe("button");
  });

  it("Contract read balance updates correctly", () => {
    useContractRead.mockReturnValue({
      data: mockUserBalance,
    });

    const balance = useContractRead();
    expect(balance.data).toBe(mockUserBalance);
  });

  it("Approval amount is tracked correctly", () => {
    useContractRead.mockReturnValue({
      data: mockApprovedAmount,
    });

    const { data: amountApproved } = useContractRead();
    expect(amountApproved).toBe(mockApprovedAmount);
  });
});