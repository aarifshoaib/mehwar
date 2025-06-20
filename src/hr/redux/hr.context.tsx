import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import { env } from '../../../env/env.dev';
import URLs from '../../shared/constants/URLs';


const HRContext = createContext({
  reasons: [],
})

function HRContextProvider({ children }) {
  const [reasons, setReasons] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const loadReasons = async () => {
    try {
      //const response = await fetch(`${env.coreServices}lookups?type=LEAVE_REASON`);
      const response = await fetch(`{env.coreServices}${URLs.HR.LOOKUPS('LEAVE_REASON')}`);
      const json = await response.json();
      setReasons(json);
    } catch (error) {
      console.error(error);
    }
  }

 

  return (
    <HRContext.Provider value={{
      reasons: reasons,
    }}>
      {children}
    </HRContext.Provider>
  )
}

export default HRContextProvider
