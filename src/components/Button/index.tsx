// Imports
// ========================================================
import { W3mButton, useWeb3Modal } from "@web3modal/wagmi-react-native";
import { StyleProp, TouchableWithoutFeedback, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../screens/Homes/Game/Start/styles";
import PLAY from "../../assets/images/play.png";

type ButtonPross = {
    text?: string;
    onPress: () => void
}
// Component
// ========================================================
export default function Button({ text, onPress }: ButtonPross) {


    return (
        <View >
            <TouchableOpacity style={styles.connectButton} onPress={onPress}>
                <Text style={styles.monospaceText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}