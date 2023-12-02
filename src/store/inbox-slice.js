import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
  name: "inbox",
  initialState: { 
   receivedMails:[],
   unreadMessages:0
 },
  reducers: {
     fetchMails(state,action){
        state.receivedMails = action.payload;



      const unreadMessages=  action.payload.filter(mail=>mail.isRead==false)
     
      state.unreadMessages = unreadMessages.length;
   }
  },
});

export const inboxActions = inboxSlice.actions;
export default inboxSlice.reducer;
