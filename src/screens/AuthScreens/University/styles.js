import {StyleSheet} from 'react-native';
import {  Platform ,Dimensions } from "react-native";
import colors from '../../../assets/theme/colors';
//import { primaryColor, secondaryColor, buttonColor } from '../../constants/Colors';
import {normalizeFont} from '../../../helpers/FontSize/';
const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
 // wrapper: { flex: 1,backgroundColor: 'white'},
 // avatarView: { marginTop: Platform.OS === "ios" ? 10 : 10,marginBottom: 5},
 
  form_header: { justifyContent : 'center', flexDirection : 'row', },
  header_text: {fontSize : normalizeFont(30) , fontWeight : 'bold' ,color:'#005D8D',fontFamily:'Roboto',textAlign: 'center',marginTop:WindowHeight/5,marginBottom:WindowHeight/15},
  resetLock:{
    alignSelf:'center',
 },
 resetLockImage:{
    width: WindowWidth/1.8, height:WindowHeight/3.515,
 },
 
loginButton: { borderRadius: 30, padding: 16, marginTop: WindowHeight/3.5,width:"95%",alignSelf:'center'},
buttonText: { textAlign: "center", fontSize: 16 , color : "#ffffff"},


});