import { Dimensions, StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 4,
        flexDirection: "column",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        // paddingBottom: 100
    },
    title: {
        color: "#FEFEFE",
        fontSize: 30,
        marginBottom: 7,
        marginLeft: 25,
        fontWeight: 'bold',

    },
    text: {
        color: "black",
        fontSize: 30,
        marginBottom: 24,
        marginLeft: 25,
        fontWeight: 'bold',
    },
    rectangle: {
        flexDirection: "row",
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 10,
        marginHorizontal: 15,
        backgroundColor: "#eee",
        shadowColor: "#eee",
    },
    buttonContainer: {
        flexDirection: "row",
        marginHorizontal: 10,
        // marginTop: 20,
    },
    button: {
        backgroundColor: "#4EC0CA",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
        flex: 1, 
        marginHorizontal: 5,
        height: 50,
    },
    disabledButton: {
        backgroundColor: "#D9D9D9",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
        flex: 1, 
        marginHorizontal: 5,
        height: 50,
      },
    coin: {
        color: "black",
        fontSize: 16,
        marginRight: 4,
        marginLeft: 4,
        fontWeight: "bold",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        flex: 1,
        textAlign: "center",
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 8,
        justifyContent: "space-between",
        padding: 5,
        paddingLeft: 10,
    },
    approveText: {
        color: "black",
        fontSize: 15,
        textAlign: "left",
        marginBottom: 10,
        fontWeight: "600"
    },
    textInput: {
        color: "black",
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInputError: {
        color: "red",
        fontSize: 20,
    },
    header: {
        color: "black",
        fontSize: 14,
        marginRight: 4,
    },
    icon: {
        width: 24,
        height: 24,
    },
    balance: {
        color: "#42444d",
        fontSize: 14,
        marginRight: 4,
        fontStyle: "italic",
        paddingBottom: 10,
    },
    coinContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    approvecontainer: {
        flexDirection: "row",
        backgroundColor: "#D9D9D9",
        borderRadius: 8,
        paddingBottom: 5,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 10,
        marginHorizontal: 15,
        marginTop: 15,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        height: 100,
    },
    coinWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 8,
        padding: 8,
        // backgroundColor: '#D9D9D9',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },


});
export default styles;