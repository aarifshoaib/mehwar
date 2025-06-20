import { Dimensions, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AuthContext } from '../../auth/redux/auth.context';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { theme } from '../../shared/theme';
import ProfileHeader from './profile-header';
import { appImages } from '../../shared/constants/images';
import PersonalSegment from './personal-segement';
import FamilySegment from './family-segment';
import { ScrollView } from 'react-native-gesture-handler';
import UserImage from '../../shared/components/user-image';

const ProfileScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [enableBounce, setEnableBounce] = useState(true);
  const [profileInfo, setProfileInfo] = useState({});
  const screenHeight = Dimensions.get('window').height;
  const lastScrollY = useRef(0);

  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    // Check if at the bottom and determine scroll direction
    const isAtBottom = y >= contentHeight - scrollViewHeight;
    const isScrollingUp = y < lastScrollY.current;

    // Update bounce based on conditions
    if (isAtBottom && !isScrollingUp) {
      if (enableBounce) {
        setEnableBounce(false);  // Disabling bounce when at the bottom and not scrolling up
      }
    } else {
      setEnableBounce(true);   // Always enable bounce when not at the bottom
    }

    lastScrollY.current = y;
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ProfileHeader navigation={navigation} ></ProfileHeader>,
    });
  }, [])

  useEffect(() => {
    if (authContext && authContext.user) {
      setProfileInfo(authContext.user);
    }
  }, [authContext.user])

  return (
    <ScrollView

      bounces={enableBounce}  // Control bouncing dynamically
      alwaysBounceVertical={Platform.OS === 'ios' ? enableBounce : false} // Specific handling for iOS
      onScroll={handleScroll}
      scrollEventThrottle={16}  // Balance responsiveness and performance
      scrollEnabled={true}      // Ensure scrolling is enabled
      style={{ backgroundColor: theme.primary, flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ ...styles.container, height: screenHeight * 1.05, }}>
        <View style={{ alignItems: 'flex-start', justifyContent: 'center', }}>
          <ImageBackground source={appImages.illustrationbg} style={{ width: '100%', height: 180, justifyContent: 'center', alignItems: 'center' }}>
            {authContext && authContext.user && authContext.user.mail && <View><UserImage width={90} email={authContext?.user?.mail}></UserImage></View>}
            <Text style={styles.title}>{authContext?.user.displayName}</Text>
            <Text style={styles.subtitle}>{authContext?.user?.mail}</Text>
          </ImageBackground>
        </View>
        {/* <View style={styles.contentContainer}>
          <View style={styles.segmentWrapper}>
            <SegmentedControl
              values={['My Self', 'Family']}
              tintColor={theme.primary}
              fontStyle={{ color: theme.primaryDark }}
              activeFontStyle={{ color: theme.tint }}
              style={{ height: 40, borderRadius: 18, backgroundColor: theme.tint, }}
              selectedIndex={selectedIndex}
              onChange={(event) => {
                setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
              }}
            />
          </View>
        </View> */}
        <View style={styles.segementWrapper}>
          {selectedIndex == 0 && <PersonalSegment navigation={navigation}></PersonalSegment>}
          {selectedIndex == 1 && <FamilySegment></FamilySegment>}
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
    justifyContent: 'flex-start',
    flex: 1,
    flexGrow: 1
  },
  segementWrapper: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    padding: 20,
    height: 70,
  },
  curveHeader: {
    backgroundColor: '#fff',
    height: 30,
    borderRadius: 50
  },
  segmentWrapper: {
    width: '80%',
    alignSelf: 'center',
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
    flex: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 70,
    backgroundColor: 'white',
    marginTop: 15
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10
  }
})