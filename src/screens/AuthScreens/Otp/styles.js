import {StyleSheet} from 'react-native';
import {  Platform ,Dimensions } from "react-native";
import colors from '../../../assets/theme/colors';
//import { primaryColor, secondaryColor, buttonColor } from '../../constants/Colors';
import {normalizeFont} from '../../../helpers/FontSize/';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  wrapper: { flex: 1,backgroundColor: 'white'},
 // avatarView: { marginTop: Platform.OS === "ios" ? 10 : 10,marginBottom: 5},
 
  form_header: { justifyContent : 'center',alignItems: 'center'},
  header_text: {fontSize : normalizeFont(26) , fontWeight : '900' },
  underline: { borderBottomWidth :3, borderBottomColor: '#3A3B3C',color:"#1182BC"},
  alignText:{ width:'60%',justifyContent:'center',alignItems: 'center'},
  formView: {  marginTop: WindowHeight/20 },
 
accoutText:{fontSize : normalizeFont(16) , fontWeight : '700' ,textAlign: 'center',paddingTop: 10,fontFamily:'Roboto'},

loginButton: { borderRadius: 30, padding: 16, marginTop: WindowHeight/80,width:"95%",alignSelf:'center'},
buttonText: { textAlign: "center", fontSize:normalizeFont(17) , color : "#ffffff"},
alertModel: {
  borderRadius: 45,
  backgroundColor: 'white',
  padding: 20,
  marginHorizontal: 10
},

modalAlertText: {
  marginTop: 20,
  textAlign: 'center',
  paddingHorizontal: 15,
  fontSize: 16,
  fontWeight: 'bold'
},
textBoxDesign: {
  backgroundColor: '#E5E5E5' ,
  height: WindowHeight/12,
  width: WindowWidth/5.5,
  borderRadius: 8,
  borderColor: '#e5e5e5',
  color: '#919191',
  fontSize: normalizeFont(35),
},
inputView: {
  width: '100%',
  height: 100,
},
instruction: {
  fontSize: normalizeFont(18), color: "black",textAlign: "center",paddingBottom:20,fontWeight: '700'
},
completeText:{
  color:'#33AC08',
  textAlign: 'center',
  fontWeight:'700'
},
secondsAlign:{marginTop:WindowHeight/4,alignSelf:'center'},
receivedText:{
  color: 'black',paddingTop:1,fontWeight:'700',paddingBottom:20
},
resendCodeText:{ color: '#1182BC',fontWeight: 'bold',fontSize:normalizeFont(18), paddingBottom:20
},
  

});