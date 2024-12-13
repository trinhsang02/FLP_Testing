import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Swap from '../screens/Swap/index';
import { parseEther } from '../contracts/utils/parseEther';

// Mock all required images
jest.mock('../../assets/images/ronin_logo.png', () => 'ronin-logo');
jest.mock('../../assets/images/medal_gold.png', () => 'medal-gold');
jest.mock('../../assets/images/Background_Store.png', () => 'background-store');

// Mock react-native components
jest.mock('react-native/Libraries/Image/Image', () => 'Image');
jest.mock('react-native/Libraries/Components/Keyboard/KeyboardAvoidingView', () => 'KeyboardAvoidingView');
jest.mock('react-native/Libraries/Components/TextInput/TextInput', () => 'TextInput');
jest.mock('react-native/Libraries/Image/ImageBackground', () => 'ImageBackground');

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

// Mock contract utilities
jest.mock('../contracts/utils/getAddress', () => ({
  getFloppyAddress: () => '0xFloppy',
  getBirdMarketPlaceAddress: () => '0xMarket',
  getFLPCrowdSaleAddress: () => '0xCrowdsale',
}));

jest.mock('../contracts/utils/getAbis', () => ({
  getFloppyAbi: () => [],
  getFLPCrowdSaleABI: () => [],
}));

// Mock wagmi hooks with more detailed implementation
const mockWriteAsync = jest.fn();
const mockApproveAmount = BigInt(0);

jest.mock('wagmi', () => ({
  useBalance: () => ({
    data: { value: BigInt(2000000000000000000) }, // 2 RON
    isLoading: false,
    isError: false,
  }),
  useContractRead: ({ functionName }) => {
    if (functionName === 'balanceOf') {
      return {
        data: BigInt(3000000000000000000), // 3 FLP
        isLoading: false,
        isError: false,
      };
    }
    if (functionName === 'allowance') {
      return {
        data: mockApproveAmount,
        isLoading: false,
        isError: false,
      };
    }
    return {};
  },
  useContractWrite: () => ({
    writeAsync: mockWriteAsync,
    isLoading: false,
    isError: false,
  }),
  usePrepareContractWrite: () => ({
    config: {},
    isSuccess: true,
    isLoading: false,
    isError: false,
  }),
}));

// Mock context
jest.mock('../context', () => ({
  useStateContext: () => ({
    address: '0x123...789',
  }),
}));

describe('Swap Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    const { getByText, getByTestId } = render(<Swap />);
    
    // Check initial coin states
    expect(getByText('You sell :')).toBeTruthy();
    expect(getByText('You buy :')).toBeTruthy();
    expect(getByText('RON')).toBeTruthy();
    expect(getByText('FLP')).toBeTruthy();
    
    // Check initial balances
    expect(getByText('Balance: 2')).toBeTruthy();
    expect(getByText('Balance: 3')).toBeTruthy();
    
    // Check initial button state
    expect(getByText('Enter an amount')).toBeTruthy();
  });

  it('handles coin amount input correctly', async () => {
    const { getByPlaceholderText } = render(<Swap />);
    
    const input = getByPlaceholderText('0.0');
    await act(async () => {
      fireEvent.changeText(input, '1.0');
    });
    
    expect(input.props.value).toBe('1.0');
  });

  it('swaps coins and updates rates correctly', async () => {
    const { getByText, getAllByText } = render(<Swap />);
    
    const swapButton = getAllByText('RON')[0].parent;
    await act(async () => {
      fireEvent.press(swapButton);
    });
    
    // After swap, FLP should be the selling coin
    const sellText = getByText('You sell :');
    expect(sellText.parent.findByText('FLP')).toBeTruthy();
  });

  it('shows approval UI when swapping FLP to RON', async () => {
    const { getByText, getByPlaceholderText, getAllByText } = render(<Swap />);
    
    // First swap to get FLP as selling coin
    const swapButton = getAllByText('RON')[0].parent;
    await act(async () => {
      fireEvent.press(swapButton);
    });
    
    // Enter amount
    const input = getByPlaceholderText('0.0');
    await act(async () => {
      fireEvent.changeText(input, '1.0');
    });
    
    // Should show approval UI
    expect(getByText('Approve spending cap')).toBeTruthy();
  });

  it('handles approval and swap transaction correctly', async () => {
    const { getByText, getByPlaceholderText } = render(<Swap />);
    
    // Enter amount
    const input = getByPlaceholderText('0.0');
    await act(async () => {
      fireEvent.changeText(input, '1.0');
    });
    
    // Click swap button
    const swapButton = getByText('Swap');
    await act(async () => {
      fireEvent.press(swapButton);
    });
    
    // Verify contract interaction
    expect(mockWriteAsync).toHaveBeenCalled();
  });

  it('displays error for insufficient balance', async () => {
    const { getByText, getByPlaceholderText } = render(<Swap />);
    
    // Enter amount larger than balance
    const input = getByPlaceholderText('0.0');
    await act(async () => {
      fireEvent.changeText(input, '10.0');
    });
    
    expect(getByText('Insufficient RON Balance to swap')).toBeTruthy();
  });

  it('calculates swap rate correctly', async () => {
    const { getByText, getByPlaceholderText } = render(<Swap />);
    
    // Enter 1 RON
    const input = getByPlaceholderText('0.0');
    await act(async () => {
      fireEvent.changeText(input, '1.0');
    });
    
    // Check rate display
    expect(getByText('1 RON = 1000 FLP')).toBeTruthy();
  });
});