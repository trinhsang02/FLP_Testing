import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;


const styles = StyleSheet.create({
  container: {
    flex: 4,
    padding: 20,
    flexDirection: "column",
  },
  content: {
    paddingTop:200,
    backgroundColor: "#EEB067",
    borderRadius: 43,
    justifyContent: "flex-end",
    display: "flex",
  },
  footer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#4EC0CA",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    flex: 1, 
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: "#D9D9D9",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    flex: 1, 
    marginHorizontal: 5,
  },
  buttonError: {
    backgroundColor: "#D9D9D9",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    flex: 1, 
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  overlayImage: {
    position: "absolute",
    marginTop: 200,
    marginLeft: 175,
    width: 100,
    height: 100,
    resizeMode: "contain",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  nftInfo: {
    backgroundColor: 'rgba(50, 32, 10, 0.26)',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  containerPrice: {
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    flex: 4,
  },
  iconCoin: {
    width: 24,
    height: 24,
  },
  approvecontainer: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 5,
    marginBottom: 13,
    marginTop: 15,
    height: 100,
  },
  imageContainer: {
    justifyContent: "center",
    alignContent: "center"
  },
  buttonContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  }
});

export default styles;