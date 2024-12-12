import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  logo: {
    width: 230,
    height: 60,
  },
  playButton: {
    marginTop: 32,
    width: 120,
    height: 74,
  },
  connectButton: {
    marginTop: 32,
    backgroundColor: "#54cd64",
    flexDirection: "row", // Use 'row' for horizontal arrangement
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 30, // Adjust padding as needed
    paddingVertical: 10, // Adjust padding as needed
    borderWidth: 1,
    borderColor: "#9ae9a5",
    shadowColor: "#35a5af",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    // Set width and height to desired fixed dimensions
    width: 250, // Adjust width as needed
    height: 50, // Adjust height as needed
  },

  monospaceText: {
    fontFamily: "monospace",
    fontWeight: "bold", // System monospace font
    fontSize: 16, // Set your desired font size
    color: "white", // Set your desired text color (optional)
  },
  ownedNFT: {
    backgroundColor: "#eee",
    width: "100%",
    height: undefined,
    marginTop: 20,
    borderRadius: 8,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  ownedNFTImage: {
    width: "100%",
    height: undefined,
    borderRadius: 8,
  },
  card: {
    width: "100%",
    alignItems: "center",
  },
  connectedView: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "center",
    padding: 20,
  },
  scrollView: {
    width: "100%",
    alignItems: "center", // Center elements horizontally
  },
  bottomMenuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eaeaea',
  },
  iconCoin :{
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingLeft: 10,
    justifyContent: "flex-start"
  },
});
 