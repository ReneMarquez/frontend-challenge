import React from 'react';
import {Image, Text, TextInput, SafeAreaView, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from './redux/slices/user'
import { clearChat } from './redux/slices/messages'

function Account(props) {
  let user = useSelector(state => state.data.user)
  const dispatch = useDispatch();

  const signOutAction = () => {
    dispatch(signOut());
    dispatch(clearChat());
    props.navigation.navigate("Register");
  }

  return (
    <Container>
      <FormContainer>
        <PicContainer/>
        <TitleLabel>Nombre de usuario</TitleLabel>
        <TitleContent>{user.name}</TitleContent>
        <TitleLabel>Correo electrónico</TitleLabel>
        <TitleContent>{user.email}</TitleContent>
      </FormContainer>
      <SubmitContainer>
        <SignOutButton onPress={() => signOutAction()}>
          <SignOutButtonLabel>Cerrar Sesión</SignOutButtonLabel>
        </SignOutButton>
      </SubmitContainer>
    </Container>
  );
};

export default Account;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color:white;
`;
const FormContainer = styled.View`
  flex:.75;
  padding-top:30px;
`;
const PicContainer = styled.View`
  height:100px;
  width:100px;
  border-radius:50px;
  align-self:center;
  margin:25px;
  background-color:#c4c4c4;
  margin-bottom:50px;
`;
const TitleLabel = styled.Text`
  text-align:center;
  font-weight:800;
  font-size:15px;
  color:#808080;
  letterSpacing:0px;
  margin:5px;
`;
const TitleContent = styled.Text`
  text-align:center;
  font-weight:700;
  font-size:17px;
  color:black;
  letterSpacing:0px;
  margin:5px;
`;
const SubmitContainer = styled.View`
  flex:.25;
  background-color:white;
  justify-content:flex-end;
`;
const SignOutButton = styled.TouchableOpacity`
  height: 60px;
  border-radius: 30px;
  margin-horizontal: 20px;
  margin-vertical: 10px;
  align-items: center;
  justify-content: center;
  background-color: #fac5c6;
`;
const SignOutButtonLabel = styled.Text`
  color: black;
  fontSize: 15px;
  fontWeight: 500;
`;
