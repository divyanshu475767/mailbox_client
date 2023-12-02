import { useState } from 'react';
import axios from 'axios';

const useMailAPI = () => {
  const [error, setError] = useState(null);

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        email,
        password,
      });
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  const getSentMails = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/sentMails', {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  const updateReadStatus = async (mailId, token) => {
    try {
      await axios.put(
        'http://localhost:5000/updateReadStatus',
        { mailId },
        { headers: { Authorization: token } }
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteMail = async (mailId, token) => {
    try {
      await axios.delete('http://localhost:5000/deleteMail', {
        data: { mailId },
        headers: { Authorization: token },
      });
    } catch (err) {
      setError(err);
    }
  };

  const getReceivedMails = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/receivedMails', {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  
  return {
    error,
    signup,
    getSentMails,
    updateReadStatus,
    deleteMail,
    getReceivedMails,
  };
};

export default useMailAPI;
