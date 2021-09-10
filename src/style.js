import { StyleSheet, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const stylesheet = StyleSheet.create({
    alwaysred: {
        backgroundColor: 'red',
        height: 100,
        width: 100,
        justifyContent: 'center' 
    },
    cont : {
        flex: 1, 
        alignItems: 'flex-start',
        padding: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        backgroundColor: '#100e19',
    },
    statusBar: {
        height: 40,
      },
      appBar: {
        backgroundColor:'#79B45D',
        height: 20,
      },
      content: {
        flex: 1,
        backgroundColor: '#33373B',
      },
    title: {
        paddingHorizontal:20,
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20
    },
    buttonText: {
        color: 'white'
    },
    filmText : {
        marginLeft: 0,
        marginRight : 'auto',
        maxWidth: deviceWidth*.5,
        backgroundColor: '#6d23b6',
        padding: 10,
        position: 'absolute',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 22,
    },
    filmTextRight : {   
        marginLeft: 'auto',
        marginRight: 0,
        backgroundColor: '#6d23b6',
        padding: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 22,
    },
    video: {
        marginTop: 20,
        maxHeight: 200,
        height: 200,
        width: 320,
        flex: 1
      },
      containerd: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 35,
        backgroundColor: '#100e19'
      },
      loading :  {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
      filmSearchText: {
          
          backgroundColor: '#100e19',
          color: 'white',
          textAlign : 'center',
          position : 'absolute',
          marginBottom : 0,
          maxWidth : deviceWidth * .4,
          padding: 8,
          fontWeight: 'bold',
          borderBottomRightRadius: 10,
          opacity: .65, 
      }
      
    
});


export default stylesheet;