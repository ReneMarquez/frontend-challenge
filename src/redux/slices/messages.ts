import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string,
  email: string,
  password:string,
  id: string,
  defaultmsg: string
}

interface Message {
  text: string,
  user: User,
  sentAt: number
}

interface Chat {
  messages: Message[]
}

const initialState = { messages: []} as Chat
const yanaBot = { name: "Yana", email: "yana@yana.com", id:"yanabot", password:"test", defaultmsg:"Hola, soy Yana"} as User;

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    yanaMessage:(state) => {
      state.messages.push({text:yanaBot.defaultmsg, user:yanaBot, sentAt:new Date().getTime()});
      state.messages.sort((a, b) => { return b.sentAt - a.sentAt})
    },
    sendMessage: (state, action) => {
      state.messages.push({text:action.payload.text,user:action.payload.user, sentAt:action.payload.sentAt});
      state.messages.sort((a, b) => { return b.sentAt - a.sentAt})
    },
    clearChat: (state) => {
      state.messages = [];
    }
  }
})

export const {clearChat, sendMessage, yanaMessage} = messagesSlice.actions
export default messagesSlice.reducer
