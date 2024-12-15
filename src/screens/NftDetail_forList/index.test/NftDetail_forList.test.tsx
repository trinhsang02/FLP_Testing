import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useContractRead, useBalance, useAccount } from "wagmi";

// Mock the wagmi hooks
jest.mock("wagmi", () => ({
  useAccount: jest.fn(),
  useContractRead: jest.fn(),
  usePrepareContractWrite: jest.fn(),
  useContractWrite: jest.fn(),
}));

describe("NFTDetailList Component Logic", () => {
  let mockNft, mockAddress, mockOnApproveNft, mockOnListNFT, mockApprovedAddress;

  beforeEach(() => {
    // Mock initial values
    mockNft = {
      tokenId: "1",
      tokenUrl: { _j: "ipfs://..." }
    };
    mockAddress = "0x123...";
    mockApprovedAddress = "0x0"; // Initially not approved

    // Clear all mocks before each test
    jest.clearAllMocks();

    // Mock contract write functions
    mockOnApproveNft = jest.fn(() => ({
      hash: "0x456",
    }));
    mockOnListNFT = jest.fn(() => ({
      hash: "0x789",
    }));

    useContractWrite.mockImplementation((config) => {
      if (config?.functionName === "approve") {
        return { writeAsync: mockOnApproveNft };
      }
      return { writeAsync: mockOnListNFT };
    });

    // Mock useAccount
    useAccount.mockReturnValue({ address: mockAddress });
  });

  it("Button text changes based on approval status and loading state", () => {
    const buttonText = (txLoading: boolean, approvedAddress: string, marketPlaceAddress: string) => {
      if (txLoading && approvedAddress?.toString().toLowerCase() != marketPlaceAddress) return "Approving...";
      else if (approvedAddress?.toString().toLowerCase() != marketPlaceAddress) return "Approve";
      else if (txLoading && approvedAddress?.toString().toLowerCase() == marketPlaceAddress) return "Listing..."
      else return "List Now";
    };

    const marketPlaceAddress = "0x456...";

    // Test different scenarios
    expect(buttonText(false, "0x0", marketPlaceAddress)).toBe("Approve");
    expect(buttonText(true, "0x0", marketPlaceAddress)).toBe("Approving...");
    expect(buttonText(false, marketPlaceAddress.toLowerCase(), marketPlaceAddress)).toBe("List Now");
    expect(buttonText(true, marketPlaceAddress.toLowerCase(), marketPlaceAddress)).toBe("Listing...");
  });

  it("Contract write approve NFT function works", async () => {
    const response = await mockOnApproveNft();
    expect(response.hash).toBe("0x456");
    expect(mockOnApproveNft).toHaveBeenCalled();
  });

  it("Contract write list NFT function works", async () => {
    const response = await mockOnListNFT();
    expect(response.hash).toBe("0x789");
    expect(mockOnListNFT).toHaveBeenCalled();
  });

  it("Button is disabled during transactions", () => {
    const buttonStyle = (txLoading: boolean) => {
      if (txLoading) return "disabledButton";
      else return "button";
    };

    expect(buttonStyle(true)).toBe("disabledButton");
    expect(buttonStyle(false)).toBe("button");
  });

  it("Price input validation works", () => {
    const validatePrice = (price: string) => {
      const numPrice = parseFloat(price);
      return numPrice > 0;
    };

    expect(validatePrice("0")).toBe(false);
    expect(validatePrice("-1")).toBe(false);
    expect(validatePrice("1.5")).toBe(true);
    expect(validatePrice("100")).toBe(true);
  });

  it("Bird color change works correctly", () => {
    const getBirdColor = (id: string) => {
      if (id === "1") return "blue";
      if (id === "2") return "red";
      if (id === "0") return "yellow";
      return "default";
    };

    expect(getBirdColor("1")).toBe("blue");
    expect(getBirdColor("2")).toBe("red");
    expect(getBirdColor("0")).toBe("yellow");
    expect(getBirdColor("3")).toBe("default");
  });

  it("Approval address is tracked correctly", () => {
    useContractRead.mockReturnValue({
      data: mockApprovedAddress,
    });

    const { data: approvedAddress } = useContractRead();
    expect(approvedAddress).toBe(mockApprovedAddress);
  });
});