import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
  name: "inbox",
  initialState: { 
   receivedMails:[],
   sentMails:[],
   unreadMessages:0
 },
  reducers: {
     fetchMails(state,action){
        state.receivedMails = action.payload;
      const unreadMessages=  action.payload.filter(mail=>mail.isRead==false)
     
      state.unreadMessages = unreadMessages.length;
   },

   deleteMail(state,action){
      state.receivedMails = state.receivedMails.filter(mail=>mail.id!==action.payload);
   },

   sentMails(state,action){
      state.sentMails = action.payload;
   }
  },
});

export const inboxActions = inboxSlice.actions;
export default inboxSlice.reducer;
