import { StyleSheet } from "react-native"
const styles=StyleSheet.create({
    card:
      {
        flex:1,
        justifyContent: 'flex-start',
        shadowColor: '#000',
        backgroundColor: 'white',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        margin:"1%",
  
   
        
      },
    cardTitle:
      {
        paddingLeft:"10%",
        paddingTop:"10%",
        paddingRight:"10%",
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