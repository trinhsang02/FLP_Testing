import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get("window").width;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEB067",
        borderRadius: 43,
        justifyContent: "space-between",   
    },
    likeButton: {
        position: 'absolute',
        top: 15, 
        right: 15, 
        backgroundColor: 'white',
        borderRadius: 50, 
        padding: 10, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      },
    nft: {
      width: width * 0.8,
      height: width * 0.8,
      marginHorizontal: 10,  
    },
    NFTCardContainer: {
      flexDirection: "column", // Arrange items horizontally
    },
    textContainer: {
        backgroundColor: 'rgba(50, 32, 10, 0.26)',
        alignItems: "center", 
        padding: 10,
        marginTop: 50, 
        flexDirection: "row",
        borderRadius: 20,
        justifyContent: "space-between",
        marginHorizontal: 10,
    },
    nftprice: {
      backgroundColor: "#0B1E5B",
      borderRadius: 15,
      width: width * 0.3,
      maxWidth: 200,
      padding: 10,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    NFTName: {
        color: "white",
        fontWeight: "bold",
        textAlign: "auto",
        fontSize: 16,
        marginBottom: 5,
        marginTop: 5,
        flexWrap: 'wrap', 
        width: '50%', 
      },
    nftImage: {
      width: "100%",
      height: 100,
      borderRadius: 10,
      marginTop: width*0.2,     
    },
    loadingIndicator: {
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      color: "#11C0CB", // cyan color,
    },
    text: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "500",
      marginLeft: 10,
    },
    imageContainer: {
      zIndex: 1, 
      alignItems: "center", 
      justifyContent: "center", 
      borderRadius: 10,

    },
    iconCoin :{
      width: 24,
      height: 24,
      marginLeft: 5,
    },
  });

  export default styles;
