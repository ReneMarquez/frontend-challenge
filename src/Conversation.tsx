import React from 'react';
import {Image, Text, FlatList, View, Dimensions, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux'
var { height, width } = Dimensions.get('window');
import { sendMessage, yanaMessage } from './redux/slices/messages'
import Ionicons from '@expo/vector-icons/Ionicons';

function Comment(item, user){
  return(
    <Bubble me={item.user.id === user.id}>
      <BubbleText me={item.user.id === user.id}>{item.text}</BubbleText>
    </Bubble>
  )
}

const Bubble = styled.View`
  background-color: ${props => props.me ? "#3c9391" : "#f0f6fb"};
  padding:15px;
  border-radius:25px;
  color: ${props => props.me ? "white" : "#4b5959"};
  align-self: ${props => props.me ? "flex-end" : "flex-start"};
`;
const BubbleText = styled.Text`
  font-size:15px;
  color: ${props => props.me ? "white" : "#4b5959"};
`;

interface User {
  name: string,
  email: string,
  password:string,
  id: string
}

interface Message {
  text: string,
  user: User,
  sentAt: number
}

interface Chat {
  messages: Message[]
}

function Conversation(Props) {
  let [message, onChangeMessage] = React.useState("");
  let chat = useSelector(state => state.messages);
  let user = useSelector(state => state.data.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(yanaMessage()); //yana sends first message on opening chat component
  },[]);

  const sendMessageAction = () => {
    let messageObj = {
      text:message,
      user: user,
      sentAt: new Date().getTime()
    };
    dispatch(sendMessage(messageObj));
    onChangeMessage("");
    setTimeout(() => {
      dispatch(yanaMessage());
    }, 100);
  }

  const getDateString = (timestamp) =>{
    let date = new Date(timestamp);
    return date.toDateString() + " - " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  return (
    <Container>
    <KeyboardAvoid
      behavior={'padding'}
      keyboardVerticalOffset={90}>
      <ListContainer>
          <List
            inverted={chat.messages.length > 0}
            data={chat.messages}
            ListEmptyComponent={() =>
              <EmptyListView>
                  <EmptyListViewMessage>Manda un mensaje!</EmptyListViewMessage>
              </EmptyListView>
            }
            ListFooterComponent={() =>
              chat.messages.length > 0 ?
              <DateMessage>{getDateString(chat.messages[0].sentAt)}</DateMessage>
              :
              null
            }
            renderItem={(i) => Comment(i.item, user)}
          />
      </ListContainer>
      <SubmitContainer>
        <TxtContainer>
          <Input value={message} onChangeText={onChangeMessage} placeholder="Ingresa aquí tu mensaje"/>
        </TxtContainer>
        <SendBtnContainer>
          <SendButton message={message} disabled={message == null || message == ""} onPress={() => sendMessageAction()}>
            <Ionicons name="send" size={32} color="white" style={{textAlign:'center'}} />
          </SendButton>
        </SendBtnContainer>
      </SubmitContainer>
      </KeyboardAvoid>
    </Container>
  );
};

export default Conversation;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color:white;
`;
const KeyboardAvoid = styled.KeyboardAvoidingView`
  flex: 1;
  backgroundColor: 'white';
`;
const ListContainer = styled.View`
  flex:.85;
  background-color:white;
`;
const List = styled.FlatList`
  backgroundColor:white;
  flex:1;
  paddingLeft:20px;
  paddingRight:20px;
`;
const EmptyListView = styled.View`
  height: ${height - (height*.26)}px;
  justify-content:center;
  background-color:white;
`;
const EmptyListViewMessage = styled.Text`
  textAlign:center;
  padding:40px;
  fontSize:17px;
  paddingTop:20px;
  paddingBottom:0px;
  fontWeight:bold;
  color:lightgray;
`;
const DateMessage = styled.Text`
  textAlign:center;
  fontSize:12px;
  paddingTop:10px;
  paddingBottom:10px;
  color:gray;
  letterSpacing:-1px;
`;
const SubmitContainer = styled.View`
  flex:.15;
  flex-direction:row;
`;
const TxtContainer = styled.View`
  background-color:white;
  justify-content:center;
  flex:.80;
`;
const SendBtnContainer = styled.View`
  background-color:white;
  float:right;
  flex:.20;
  justify-content:center;
`;
const Input = styled.TextInput`
  height: 60px;
  color: black;
  border-radius: 40px;
  margin-vertical: 5px;
  margin-horizontal: 10px;
  padding-vertical: 10px;
  padding-horizontal: 25px;
  background-color: #fffffe;
  fontSize: 16px;
  fontWeight:300;
  placeholderTextColor:#797b7d;
  shadow-color: #000;
  shadow-offset:1px 1px;
  shadow-opacity: 0.4;
  shadow-radius: 2px;
`;
const SendButton = styled.TouchableOpacity`
  background-color:${props => props.message != null && props.message != "" ? "#f68855" : "#c4c4c5"};
  height:60px;
  width:60px;
  border-radius:30px;
  align-self:center;
  justify-content:center;
`;
