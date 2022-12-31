import React from 'react';
import {Image, Text, TextInput, SafeAreaView, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from './redux/slices/user'
import { clearChat } from './redux/slices/messages'

function Register(props) {
  let user = useSelector(state => state.data.user)
  const [name, onChangeName] = React.useState("");
  const [email, onChangeMail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const dispatch = useDispatch();

  const signInAction = () => {
    if(name == null || name == "" || email == null || email == "" || password == null || password == ""){
      alert("Completa la informacion requerida.");
      return false;
    }
    let userObject = {
      name: name,
      email: email,
      password: password,
      id:'randomid'
    };
    dispatch(signIn(userObject));
    dispatch(clearChat());
    props.navigation.navigate("Welcome");
    setTimeout(() =>{
      clearTxtBoxes();
    },400);
  }

  const clearTxtBoxes = () => {
    onChangeName("");onChangeMail("");onChangePassword("");
  }

  return (
    <Container>
      <FormContainer>
      <Title>Regístrate</Title>
      <Input value={name} onChangeText={onChangeName} placeholder="Nombre de usuario"/>
      <Input value={email} onChangeText={onChangeMail} placeholder="Correo electrónico" keyboardType='email-address' />
      <Input value={password} onChangeText={onChangePassword} placeholder="Contraseña" secureTextEntry={true}/>
      </FormContainer>
      <SubmitContainer>
        <CreateAccountButton onPress={() => signInAction(props, name, email, password)}>
          <CreateAccountButtonLabel>Crear cuenta</CreateAccountButtonLabel>
        </CreateAccountButton>
      </SubmitContainer>
    </Container>
  );
};

export default Register;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color:white;
`;
const FormContainer = styled.View`
  flex:.75;
  padding-top:50px;
`;
const SubmitContainer = styled.View`
  flex:.25;
  background-color:white;
  justify-content:flex-end;
`;
const Title = styled.Text`
  font-size:20px;
  font-weight:600;
  text-align:center;
  margin-bottom:50px;
`;
const Input = styled.TextInput`
  height: 60px;
  color: black;
  border-radius: 40px;
  margin-vertical: 5px;
  margin-horizontal: 20px;
  padding-vertical: 10px;
  padding-horizontal: 25px;
  background-color: #f0f6fb;
  fontSize: 16px;
  fontWeight:300;
  placeholderTextColor:#797b7d;
`;
const CreateAccountButton = styled.TouchableOpacity`
  height: 60px;
  border-radius: 30px;
  margin-horizontal: 20px;
  margin-vertical: 10px;
  align-items: center;
  justify-content: center;
  background-color: #ff8755;
`;
const CreateAccountButtonLabel = styled.Text`
  color: #662b11;
  fontSize: 15px;
  fontWeight: 500;
`;
