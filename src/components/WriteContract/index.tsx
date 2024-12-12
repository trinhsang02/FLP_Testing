import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@web3modal/ui-react-native';

import { useAccount, useContractWrite, usePrepareContractWrite, useSignMessage, usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import RequestModal from '../RequestModal';
import { parseEther } from 'viem';
import { getFloppyAbi, getCrowdSaleAbi, getUsdtAbi, getBirdAbi } from '../../contracts/utils/getAbis';
import { getFloppyAddress } from '../../contracts/utils/getAddress';

export function WriteContract() {
    const [requestModalVisible, setRequetsModalVisible] = useState(false);
    const { isConnected, address } = useAccount();


    const floppyAddress = getFloppyAddress()
    const floppyABI = getFloppyAbi();

    const { config } = usePrepareContractWrite({
        address: floppyAddress,
        abi: floppyABI,
        functionName: 'transfer',
        enabled: requestModalVisible,
        args: ["0xF0d510f911e9F5805ade80F7B8639f168507A6c0", 100000]
    });

    const { data, isLoading, isSuccess, isError, write } = useContractWrite(config)
    const onPress = () => {
        setRequetsModalVisible(true);
        try {
            write();
        } catch (error) {
        }
    };



    return isConnected ? (
        <View>
            <Button disabled={isLoading} onPress={() => onPress()}>
                Write contract
            </Button>

            <RequestModal
                isVisible={requestModalVisible}
                isLoading={isLoading}
                rpcResponse={isSuccess ? data?.toString() : undefined}
                rpcError={isError ? 'Error writing contract' : undefined}
                onClose={() => setRequetsModalVisible(false)}
            />
        </View>
    ) : null;
}