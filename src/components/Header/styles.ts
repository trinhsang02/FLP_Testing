import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        top: 20,
        // paddingBottom: 10,
    },
    blockHeaderBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft:20,
        paddingRight:20,
        height:60
    },
    screenDescription: {
        backgroundColor: "#D9D9D9",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
    },
    Address: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
    },
    description:{
        color: "black",
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center", 
    },
});