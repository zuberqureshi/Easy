import { View, Text,TouchableOpacity,ImageBackground,TextInput, Pressable, KeyboardAvoidingView,ScrollView,SafeAreaView,ToastAndroid,Keyboard } from 'react-native'
import React from 'react'
import { useLayoutEffect,useState,useEffect,useRef } from "react";

import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import { Formik,Field } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';
import Loader from '../../components/common/loader/Loader';
import CallApi, { setToken, CallApiJson, getToken } from '../../utiles/network';
import  FormSchema from '../../utiles/ContactUsSchema';

const Contact = () => {


    const [isOpen, setIsOpen] = useState(false)
    const [currentValue, setCurrentValue] = useState(null)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [userProfileData, setuserProfileData] = useState({});
    
    const dropdownOptions=[
        {label:'Payment not received',value:'payment not received'},
        {label:'Not able to play qaiz',value:'not able to play qaiz'},
        {label:'Not able to make widraw request',value:'not able to make widraw request'},
        {label:'Other',value:'other'},
    ]


    const navigation = useNavigation();



    const loadUserInfo = async () => {
      setLoadingStatus(true);

      // const data = await JSON.parse(seting)
      const userdata = await getToken();
      const userdataParsed = await JSON.parse(userdata)
      const body = {
          user_id: userdataParsed.id,
      };

      const profileData = await CallApiJson('getprofile', 'POST', body);
      setuserProfileData(profileData);
      // setFormikValues({name:'hhhg'})
      setLoadingStatus(false);

      console.log('EditProfileScreenData', profileData);
  }

  useEffect(() => {
      console.log('insideeditprofile', userProfileData)

      loadUserInfo();
      return () => {
          console.log('return')
      }
  }, [])











    //  Header start
  useLayoutEffect(() => {
  
    navigation.setOptions({
      
      headerLeft: () => (
        
        <TouchableOpacity onPress={() => {navigation.openDrawer()
           Keyboard.dismiss() }}>

          <Icon name="menu" size={responsiveWidth(7)} color="#fff" />
        </TouchableOpacity>
      ),
     
      headerTitle: "    Contact Us",
      headerTintColor:'#fff',
      headerStyle: {
        backgroundColor: '#1f4c86'

      },
      headerRight: () =>
        (
           
          <View style={{ flexDirection: 'row' }}>
            <Icon onPress={()=>{navigation.navigate('Wallet')}} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5)}} />
            <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
            <Icon  name="person" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(3) }} />
            </TouchableOpacity>
          </View>
        
      ),
     


    });
  }, []);

  //toast
  const showToast = (msg) => {
    ToastAndroid.show(`${msg}`, ToastAndroid.LONG);
  };

      //Contact Us

      const contactUs = async(name,mobile,email,heading,description) =>{
        console.log('insideed contct USSS', userProfileData)
        const body = {
          user_id: userProfileData?.data?.id,
          email: email,
          mobile: mobile,
          name:name,
          heading : heading,
          description:description
        };

        const contactUsData = await CallApiJson('contactusrequest', 'POST', body);

        console.log("updae Profile Success",contactUsData.msg)

        showToast(contactUsData.msg)
        

    }


  return (
  
  
    <SafeAreaView style={{ flex: 1 }}>
     
  
     <Loader loadingStatus={loadingStatus} />
 
      <View style={{margin:responsiveWidth(10)}}>
       
      
             
      <Formik
                    initialValues={{ name: '',mobile: '', email: '',description:'',}}
                    validationSchema={FormSchema}
                    onSubmit={(values,action) => {
                    console.warn(values,currentValue);
                     contactUs(values.name,values.mobile,values.email,currentValue,values.description)
                      action.resetForm( setCurrentValue(null) )}
                    }
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (


                        <View>

                        <View style={styles.action}>
                                <FontAwesome name="user-o" size={responsiveWidth(5)} />
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    placeholder="Name"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
                               { (errors.name && touched.name) ? <Text style={{color:'red'}}>{errors.name}</Text>:null}
                            </View>
                            <View style={styles.action}>
                            <Feather name="phone" size={responsiveWidth(5)} />
                                <TextInput
                                 onChangeText={handleChange('mobile')}
                                    onBlur={handleBlur('mobile')}
                                    value={values.mobile}
                                    placeholder="Phone"
                                    placeholderTextColor="#666666"
                                    keyboardType="number-pad"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
                                { (errors.mobile && touched.mobile) ? <Text style={{color:'red'}}>{errors.mobile}</Text>:null}
                          </View>

                          <View style={styles.action}>
                                <FontAwesome name="envelope-o" size={responsiveWidth(5)} />
                                <TextInput
                                 onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder="Email"
                                    placeholderTextColor="#666666"
                                    keyboardType="email-address"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput

                                    ]}
                                />
                                { (errors.email && touched.email) ? <Text style={{color:'red'}}>{errors.email}</Text>:null}
                            </View>


                            <View style={[styles.action,{alignItems:'center'}]}>
                           

                            <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dropdownOptions}
        // search
        maxHeight={responsiveHeight(25)}
        labelField="label"
        valueField="value"
        placeholder="Select subject"
        // searchPlaceholder="Search..."
        value={currentValue}
        onChange={item => {
          setCurrentValue(item.value);
        //   console.warn(currentValue)
     
        }}
        onChangeText={handleChange('subject')}
       
      
      />

    


                            </View>

                            <View style={[styles.action,{alignItems:'center'}]}>
                                <FontAwesome name="file-text-o" size={responsiveWidth(5)} />
                                <TextInput
                                    multiline
                                    numberOfLines={4}
                                    maxLength={40}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    placeholder="Description"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,{marginTop:responsiveWidth(0.2)}
                                    ]}
                                />
                             
                            </View>

                            <TouchableOpacity  style={styles.commandButton} disabled={!isValid} onPress={handleSubmit}>
                                <Text style={styles.panelButtonTitle}>Submit</Text>
                            </TouchableOpacity>
 
                        </View>

                        

                        )}
                </Formik>


      </View>

    </SafeAreaView>

 


  
  )
}

export default Contact