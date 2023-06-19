import React, { useState, useLayoutEffect } from 'react';
import {View,Text,TouchableOpacity,ImageBackground,TextInput, Pressable, KeyboardAvoidingView,ScrollView,SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';

import { FormSchema } from '../../utiles/FormSchema';
import styles from './style'



const EditProfileScreen = () => {


    const navigation = useNavigation();


    const [image, setImage] = useState('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
   


    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable onPress={() => navigation.openDrawer()}>

                    <Ionicons style={{ marginLeft: responsiveWidth(3.8) }} name="menu" size={responsiveWidth(7)} color="#fff" />
                </Pressable>
            ),

            headerTitle: "",
            headerStyle: {
                backgroundColor: '#1f4c86'

            },
            headerRight: () =>
            (

                <View style={{ flexDirection: 'row' }}>
                    <Ionicons onPress={()=>{navigation.navigate('Wallet')}} name="wallet" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(5)}} />
                    {/* <IconFeather onPress={()=>{navigation.navigate('EditProfile')}} name="edit" size={responsiveWidth(6)} color="#fff" style={{ marginRight: responsiveWidth(7) }} /> */}
                </View>

            ),

        });
    }, []);




  

    return (
         <SafeAreaView style={styles.container}>
 
        <KeyboardAvoidingView  behavior='height'>
  <ScrollView>

        <View style={styles.container}>
          
            <View style={{
                margin: responsiveWidth(7.3),
             
            }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                        <View
                            style={{
                                height: responsiveHeight(11.85),
                                width: responsiveWidth(24),      //problem
                                borderRadius: responsiveWidth(3.5),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ImageBackground
                                source={require('../../assets/man.png')}
                                style={{ height: responsiveHeight(11.85), width: responsiveWidth(24.5) }}
                                imageStyle={{ borderRadius: responsiveWidth(3.5) }}>
                               
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: responsiveWidth(2.5), fontSize: responsiveFontSize(2.15), fontWeight: 'bold' }}>
                        Profile Details
                    </Text>
                </View>

                {/* use formik   */}
                <Formik
                    initialValues={{ firstname: '', lastname: '',age:'' ,phone: '', email: '', country: '', city: ''}}
                    // validationSchema={FormSchema}
                    onSubmit={(values,action) => {
                    console.warn(values);
                      action.resetForm()}
                    }
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (


                        <View>
                            <View style={styles.action}>
                                <FontAwesome name="user-o" size={responsiveWidth(5)} />
                                <TextInput
                                    onChangeText={handleChange('firstname')}
                                    onBlur={handleBlur('firstname')}
                                    value={values.firstname}
                                    placeholder="First Name"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
                                {/* { errors.firstname && touched.firstname ? <Text style={{color:'red'}}>{errors.firstname}</Text>:null} */}
                            </View>


                            
                            <View style={styles.action}>
                                <FontAwesome name="user-o" size={responsiveWidth(5)} />
                                <TextInput
                                 onChangeText={handleChange('lastname')}
                                    onBlur={handleBlur('lastname')}
                                    value={values.lastname}
                                    placeholder="Last Name"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
                            </View>


                            <View style={styles.action}>
                                <FontAwesome name="user-o" size={responsiveWidth(5)} />
                                <TextInput
                                 onChangeText={handleChange('age')}
                                    onBlur={handleBlur('age')}
                                    value={values.age}
                                    placeholder="Age"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
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


                            <View style={styles.action}>
                                <Icon name="map-marker-outline" size={responsiveWidth(5)} />
                                <TextInput
                                 onChangeText={handleChange('city')}
                                    onBlur={handleBlur('city')}
                                    value={values.city}
                                    placeholder="City"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput
                                    ]}
                                />
                            </View>


                            <View style={styles.action}>
                                <FontAwesome name="globe" size={responsiveWidth(5)} />
                                <TextInput
                                   onChangeText={handleChange('country')}
                                    onBlur={handleBlur('country')}
                                    value={values.country}
                                    placeholder="Country"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput

                                    ]}
                                />
                            </View>
                           
                            <TouchableOpacity  style={styles.commandButton} onPress={ handleSubmit}>
                                <Text style={styles.panelButtonTitle}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>

                
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>

      
        </SafeAreaView>
    );
};

export default EditProfileScreen;
