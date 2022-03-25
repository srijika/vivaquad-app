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
 resetLock:{
    alignSelf:'center',
 },
 resetLockImage:{
    width: WindowWidth/1.8, height:WindowHeight/3.515,marginTop:WindowHeight/20
 },
 form_header: { justifyContent : 'center', flexDirection : 'row', },
  header_text: {fontSize : normalizeFont(25) , fontWeight : 'bold' },
  underline: { borderBottomWidth :3, borderBottomColor: '#3A3B3C',color:"#1182BC"},
 formView: {  marginTop: WindowHeight/9 },
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



loginButton: { borderRadius: 30, padding: 16, marginTop: WindowHeight/7,width:"95%",alignSelf:'center'},
buttonText: { textAlign: "center", fontSize: 16 , color : "#ffffff"},
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
});