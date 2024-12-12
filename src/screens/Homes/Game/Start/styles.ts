import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    margin: 5,
    marginBottom: 20,
    elevation: 3,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
