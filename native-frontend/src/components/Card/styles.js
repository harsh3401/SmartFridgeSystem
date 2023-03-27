import { StyleSheet } from "react-native"
const styles=StyleSheet.create({
    card:
      {
        flex:1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 10,
        margin:"1%",

      },
    cardTitle:
      {
          paddingLeft:"5%",
          paddingTop:"5%",
        fontSize: 11,
        color:'#6f6f6f'
      },
      indicator:
      {  paddingLeft:"10%",
      paddingTop:"10%",
        fontSize: 31,
      },
      foodItem:{
        width: 50,
        height: 100,
      },

     
      
    
      
  })
export default styles