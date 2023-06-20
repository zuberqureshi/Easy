import { View, Text,TouchableOpacity,ImageBackground,TextInput, Pressable, KeyboardAvoidingView,ScrollView,SafeAreaView } from 'react-native'
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


const Contact = () => {


    const [isOpen, setIsOpen] = useState(false)
    const [currentValue, setCurrentValue] = useState(null)
    // console.warn(currentValue)
    
    const dropdownOptions=[
        {label:'Payment not received',value:'payment not received'},
        {label:'Not able to play qaiz',value:'not able to play qaiz'},
        {label:'Not able to make widraw request',value:'not able to make widraw request'},
        {label:'Other',value:'other'},
    ]


    const navigation = useNavigation();

    //  Header start
  useLayoutEffect(() => {
  
    navigation.setOptions({
      
      headerLeft: () => (
        
        <TouchableOpacity onPress={() => navigation.openDrawer()}>

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



  return (
  
  
    <SafeAreaView style={{ flex: 1 }}>
     
  
        
 
      <View style={{margin:responsiveWidth(10)}}>
       
      
             
      <Formik
                    initialValues={{ name: '',phone: '', email: '',description:'',subject:''}}
                    // validationSchema={FormSchema}
                    onSubmit={(values,action) => {
                    console.warn(values,currentValue);
                    
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
                                {/* { errors.firstname && touched.firstname ? <Text style={{color:'red'}}>{errors.firstname}</Text>:null} */}
                            </View>
                            <View style={styles.action}>
                            <Feather name="phone" size={responsiveWidth(5)} />
                                <TextInput
                                 onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    placeholder="Phone"
                                    placeholderTextColor="#666666"
                                    keyboardType="number-pad"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
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
                                {/* { errors.firstname && touched.firstname ? <Text style={{color:'red'}}>{errors.firstname}</Text>:null} */}
                            </View>

                            <TouchableOpacity  style={styles.commandButton} onPress={ handleSubmit}>
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

