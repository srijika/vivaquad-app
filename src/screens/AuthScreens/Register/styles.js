import {StyleSheet} from 'react-native';
import {  Platform ,Dimensions } from "react-native";
import colors from '../../../assets/theme/colors';
//import { primaryColor, secondaryColor, buttonColor } from '../../constants/Colors';
import {normalizeFont} from '../../../helpers/FontSize/';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  form_header: { justifyContent : 'center', flexDirection : 'row', },
  header_text: {fontSize : normalizeFont(18) , fontWeight : 'bold' , paddingBottom : 8,marginLeft :15,marginRight :15,marginBottom:WindowHeight/10},
  underline: { borderBottomWidth :3, borderBottomColor: '#1584BD',color:"#1182BC"},
  input: {
   width:'85%',
    borderRadius: 10,
    backgroundColor: '#e5e5e5' ,
    alignSelf:'center',
    marginTop: 6,
    color: "black",
    fontWeight: "bold" ,
    height:55,
    
},
agreeText:{
  fontFamily:'Roboto', 
  fontSize:normalizeFont(16), 
  fontWeight:"700",
 color:'#303030'
  
},
privacyText:{
color:colors.textColor,
fontWeight:"700",
fontFamily:'Roboto'
},

loginButton: { borderRadius: 30, padding: 16, marginTop: WindowHeight/12,width:"95%",alignSelf:'center'},
buttonText: { textAlign: "center", fontSize: 16 , color : "#ffffff"},
footerText:{ flexDirection : 'row',width:'85%',alignItems : 'center',alignSelf:'center',marginTop:-WindowHeight/25},
});