import {StyleSheet} from 'react-native';
import {  Platform , } from "react-native";
import {textColor,} from '../../../assets/theme/colors';
import {Dimensions} from 'react-native';
import {normalizeFont} from '../../../helpers/FontSize/';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  wrapper: { flex: 1,backgroundColor: 'white'},
 // avatarView: { marginTop: Platform.OS === "ios" ? 10 : 10},
 
  form_header: { justifyContent : 'center', flexDirection : 'row',marginBottom:20 },
  header_text: {fontSize : normalizeFont(16), fontWeight : 'bold' , paddingBottom : 8,marginLeft :15,marginRight :15},
  underline: { borderBottomWidth :3, borderBottomColor: '#1584BD',color:"#1584BD"},
  selectRole:{
    fontWeight:'bold',marginTop:10,fontSize:16,
  },
  roleAlign:{width:'85%',alignSelf:'center',marginBottom:WindowHeight/16},
  align:{ 
    flexDirection : 'row', 
    marginTop:7,
 //   marginBottom:WindowHeight/20,
    
  },
  commanText:{
    fontFamily:'Roboto', 
    fontSize:normalizeFont(16), 
    fontWeight:"400",
    marginLeft:5,
    
  },
  checkBoxAlign:{
    width:'50%'
  },
 // formView: {  marginTop: 10 },
  input: {
    
   width:'85%',
    borderRadius: 10,
    backgroundColor: '#e5e5e5' ,
    alignSelf:'center',
    marginTop: 6,
    color: "black",
    fontWeight: "bold" ,
    height:55
    
  
},
loginButton: { borderRadius: 30, padding: 16, marginTop: WindowHeight/10,width:"95%",alignSelf:'center'},
buttonText: { textAlign: "center", fontSize: 16 , color : "#ffffff"},
forgotText:{
color:"#1182BC",
textAlign:'center',
},







   
});