import { ScrollView, StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image, } from 'react-native';
import { theme } from '../shared/theme';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { appImages } from '../shared/constants/images';
import ScreenWrapper from '../shared/components/screen-wrapper';
import { AppServicesContext } from './redux/appServices.context';
import PunchingWrapper from './components/punching';
import { env } from '../../env/env.dev';
import axiosInstance from '../auth/services/axios.interceptor';
import AttendanceHistoryContextProvider, { AttendanceListsContext } from '../hr-attendance/redux/attendance-list.context';
import PunchingModalWrapper from './components/punching-modal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AppSharedContext } from '../shared/redux/app-shared.context';
import PunchingContextProvider, { PunchingContext } from './redux/punching.context';


const HomeScreenWrapper = ({ navigation }) => {
  return (
    <AttendanceHistoryContextProvider>
      <PunchingContextProvider>
        <HomeScreen navigation={navigation} />
      </PunchingContextProvider>
    </AttendanceHistoryContextProvider>
  );
}

const HomeScreen = ({ navigation }) => {
  const homeContext = useContext(AppServicesContext);
  const appSharedCtx = useContext(AppSharedContext);
  const [openPunching, setOpenPunching] = useState(false);
  const punchingCtx = useContext(PunchingContext);
  const attendanceCtx = useContext(AttendanceListsContext);
  const [rrefreshing, setrRefreshing] = React.useState(false);
  const [lBalance, setLBalance] = React.useState(0);

  const onRefresh = () => {
    homeContext.setRefreshing(homeContext.refresh + 1);
    attendanceCtx.loadUnauthorizedAttendanceList({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
    //appSharedCtx.loadAbsences();
    //loadLeaveBalance();
    punchingCtx.allowRemoteCheckin();
  };

  useEffect(() => {
    punchingCtx.allowRemoteCheckin();
    //attendanceCtx.loadUnauthorizedAttendanceList({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
    //appSharedCtx.loadAbsences();
  }, [])

  // useEffect(() => {
  //   if (homeContext.appServices.length > 0 && homeContext.servicesType === 'Favorite') {
  //     favoriteService.fetchFavoriteService();
  //   }
  // }, [homeContext.appServices]);

  // useEffect(() => {
  //   loadLeaveBalance();
  // }, [lBalance]);



  const loadLeaveBalance = async () => {
    try {
      const response = await axiosInstance.get(`${env.coreServices}leaves/balance`).then((result) => {
        let json = result.data;
        const filtered = json.item.filter(itm => {
          return itm.leaveType === 'Annual Leave';
        });
        setLBalance(filtered[0].leaveBalance);
        return json;
      }
      );

    } catch (ex) {
      console.log(ex);
    }
  };

  const changeTabs = (type) => {
    homeContext.changeTab(type);
  }

  const openSheet = () => {
    inpref.current?.present();
    setOpenPunching(true);
  }

  const favoriteRoute = () => {
    navigation.navigate('FavoriteScreen');
  }

  const navigateToHistory = (screen, data = '') => {
    navigation.navigate(screen, { data });
  }

  const closeModal = () => {
    //setOpenPunching(false);
    punchingCtx.allowRemoteCheckin();
  };

  useEffect(() => {
  }, [punchingCtx.punchinTime])

  const inpref = useRef<BottomSheetModal>(null);


  return (

    <ScreenWrapper refreshing={rrefreshing} onRefresh={onRefresh}>
      <View style={{ flex: 1, }}>
        <ImageBackground source={appImages.illustration} style={{ width: '100%', height: 180, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', flex: 1 }} >
            <PunchingWrapper navigation={navigation} />
            <TouchableOpacity onPress={() => navigateToHistory('AttendanceReportNavigation', 'unAuth')} style={styles.tileContainer}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={appImages.absense} style={{ width: 30, height: 30, marginRight: -5, tintColor: '#ffffffdd' }} />
                <Text style={[styles.tileNumber]}>{attendanceCtx.unaluthrizedAttendanceList.length}</Text>
                <Text style={[styles.tileTitle]}>{'Unauthorized Absence'}</Text>
              </View>
            </TouchableOpacity>
            {/* <View style={styles.tileContainer}>
              <TouchableOpacity onPress={() => navigateToHistory('LeaveHistoryScreen')}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={appImages.vacation} style={{ width: 27, height: 27, marginRight: -5, tintColor: '#ffffffdd' }} />
                  <Text style={[styles.tileNumber]}>{lBalance.toFixed(1)}</Text>
                  <Text style={[styles.tileTitle]}>{'Leave\nBalance'}</Text>
                </View>
              </TouchableOpacity>
            </View> */}
          </View>
        </ImageBackground>
        <PunchingModalWrapper />
      </View>
      {/* <View style={{ flex: 1, backgroundColor: '#EDF2F6', }}>

        <View style={{ flexDirection: 'row', paddingLeft: 10, marginStart: 10, position: 'relative', top: -20, justifyContent: 'space-between' }}>

          <View style={{ flexDirection: 'row' }}>

            <TabButton style={{ ...(homeContext.servicesType === 'Favorite') ? styles.activeTab : styles.unactiveTab }} onPress={() => changeTabs('Favorite')} icon={'star'} />
            <TabButton style={{ ...(homeContext.servicesType === 'Employee') ? styles.activeTab : styles.unactiveTab }} onPress={() => changeTabs('Employee')} icon={'user'} />
            <TabButton style={{ ...(homeContext.servicesType === 'Manager') ? styles.activeTab : styles.unactiveTab }} onPress={() => changeTabs('Manager')} icon={'users'} />
            <TabButton style={{ ...(homeContext.servicesType === 'Clock') ? styles.activeTab : styles.unactiveTab }} onPress={openSheet} icon={'clock'} />
          </View>
          <View style={{ marginTop: 0 }}>
            {homeContext.servicesType === 'Favorite' && <TabButton style={styles.unactiveTab} iconSize={17} size={35} onPress={favoriteRoute} icon={'edit'} />}
          </View>
        </View>
        {homeContext.loader && <HomeLoader />}
        {!homeContext.loader &&
          <TabContent navigation={navigation} />
        }
        {
          <ModalSheet onDismiss={closeModal} enablePanDownToClose={true} snap={['85%']} ref={inpref} >
            <PunchingModalWrapper />
          </ModalSheet>
        }
         

      </View> */}


    </ScreenWrapper>
  );
};

export default HomeScreenWrapper;

const styles = StyleSheet.create({
  quickActionWrapper: {
    flex: 1,
  },
  homeServiceWrapper: {
    flex: 1,
  },
  requiredActionWrapper: {
    flex: 1,
    backgroundColor: theme.primary,
  },
  tileContainer: {
    paddingTop: 10,
    flex: 1,
    width: 60,
    borderRadius: 20,
    height: 130,
    backgroundColor: theme.primary,//'rgba(57,115,168,.66)',
    margin: 5,
    borderWidth: 4,
    borderColor: '#DDECF8',
    alignItems: 'center',
    shadowColor: '#000',
    justifyContent: 'center',
    flexDirection: 'column'
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius:1,
    // shadowOpacity: 0.50,
  },
  tileNumber: {
    fontSize: 25,
    color: '#fff',
    fontFamily: theme.fontFamily,
    textShadowColor: 'rgba(255,255,255,.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    marginVertical: 5
    // backgroundColor: 'pink'
  },
  tileFontStyle: {
    color: '#e5f2fc',
    textShadowColor: 'rgba(255,255,255,.5)',
    fontFamily: theme.fontFamily,
    fontSize: 20
    // textShadowOffset: { width: 0, height: 1 },
    // textShadowRadius: 1,
  },

  tileValues: {
    fontSize: 20,
  },
  subTitleTile: {
    fontSize: 12,
    color: '#333'
  },
  tileTitle: {
    fontFamily: theme.fontFamily,
    fontSize: 12,
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 15,
  },
  activeTab: {
    backgroundColor: theme.primary,
    color: theme.tint,
    borderColor: '#fff',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
  },
  mainBox: {

  },
  unactiveTab: {
    backgroundColor: '#fff',
    color: theme.primary,
    borderColor: '#A9BED3',
    borderWidth: 1,
  }
});
