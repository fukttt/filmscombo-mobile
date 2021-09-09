import { StyleSheet } from 'react-native';

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
        backgroundColor: '#fff',
    },
    title: {
        paddingHorizontal:10,
        color: 'black',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10
    },
    buttonText: {
        color: 'white'
    },
    filmText : {
        marginLeft: 0,
        marginRight : 'auto',
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
        justifyContent: 'space-between',
    
      },
      
    
});


export default stylesheet;