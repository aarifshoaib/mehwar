import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SectionTitle } from '../../shared/ui/typography';
import { theme } from '../../shared/theme';
import { AuthContext } from '../../auth/redux/auth.context';
import { appImages } from '../../shared/constants/images';
import { env } from '../../../env/env.dev';

const MyRequests = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const fetchRActions = async (lusr: string) => {
    try {
      const response = await fetch(`${env.coreServices}myrequests`, {
        method: 'GET',
        headers: new Headers({ filter: lusr }),
      }).then((response) =>
        response.json()
      );
      setRequests(response);
      setLoading(true);
    } catch (error) {
      console.log(error, 'Required Actions Error');
      setRequests([]);
    }
  };

  useEffect(() => {
    setUser(authContext.user.mail);
    if (user != null) {
      fetchRActions(user.toString().toLowerCase());
    }
  }, [user]);

  const getFiltered = (filter: string) => {
    let counts = [];
    if (requests && requests.length > 0) {
      counts = requests.filter((x) => x._id === filter);
    }
    if (counts.length == 0) {
      return 0;
    }
    return counts[0].count;
  };

  const renderItem = (key: number, image: string, status: string) => {
    return (
      <>
        <TouchableOpacity
          style={styles.gridItemWrapper}
          key={key}
          onPress={() => null}
        >
          <View style={styles.gridItem}>
            <Image
              style={styles.serviceImage}
              source={appImages[image]}
              resizeMode={'stretch'}
            />
            <Text style={styles.actionTitle}>{getFiltered(status)}</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>{status} Requests</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <>
          <View>
            <SectionTitle style={styles.p10} text='My Requests' />
          </View>
          <View style={styles.gridInnerWrapper}>
            {renderItem(1, 'draft', 'Draft')}
            {renderItem(2, 'pendingRequest', 'In Progress')}
            {renderItem(3, 'completedRequest', 'Completed')}
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default MyRequests;

const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    // flexDirection: 'row'
  },
  myRequestsActionWrapper: {},

  p10: {
    padding: 10,
  },
  scrollView: {
    // flex: 1,
  },
  subtitle: {
    fontWeight: 'bold',
    color: theme.primary,
    flex: 1,
    textAlign: 'center',
  },
  itemListContent: {},
  actionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#888',
  },
  gridItemWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  gridInnerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  gridItem: {
    backgroundColor: theme.tint,
    borderColor: theme.controlBorderColor,
    borderRadius: theme.controlBorderRadius,
    height: 40,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  serviceImage: {
    maxHeight: 35,
    marginRight: 10,
    maxWidth: 35,
  },
});
