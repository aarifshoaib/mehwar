import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AppServicesContext } from '../../home/redux/appServices.context';
import { ScrollView } from 'react-native-gesture-handler';
import { SectionTitle } from '../ui/typography';
import { theme } from '../theme';

const ServiceDescription = ({ navigation, route }) => {
  const { type, screen } = route.params;
  const appServiceContext = useContext(AppServicesContext);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState([]);

  const getDescription = () => {
    if (appServiceContext.appServices.length > 0) {
      const sdesc = appServiceContext.appServices.filter((x) => x.url === type);
      // if (sdesc.length > 0) {
      setDescription(sdesc);
      // }
    }
    setLoading(true);
  };

  useEffect(() => {
    getDescription();

    return () => {
      setDescription([]);
    };
  }, []);
  return (
    <>
      {description.length > 0 && loading ? (
        <View>
          <SectionTitle style={{ padding: 10 }} text={description[0].name} />
          <ScrollView style={styles.wrapper}>
            <View style={styles.textWrapper}>
              <View style={styles.primaryElementsWrapper}>
                <View style={styles.primaryElements}>
                  <Text style={{ width: 100 }}> SLA : </Text>
                  <Text style={[styles.textcls, styles.bld]}>
                    {description[0].sla}
                  </Text>
                </View>
                <View style={styles.primaryElements}>
                  <Text style={{ width: 100 }}> Eligibility : </Text>
                  <Text style={[styles.textcls, styles.bld]}>
                    All Employees
                  </Text>
                </View>
                <View style={styles.primaryElements}>
                  <Text style={{ width: 100 }}> Contacts : </Text>
                  <Text style={[styles.textcls, styles.bld]}>
                    {description[0].contacts?.length > 0
                      ? description[0].contacts.map((x: any, index: number) => {
                        return (
                          <Text key={index} style={[styles.pr10]}>
                            {x.name},
                          </Text>
                        );
                      })
                      : 'N/A'}
                  </Text>
                </View>
              </View>
              <Text style={styles.textcls}>{description[0].description}</Text>
            </View>
          </ScrollView>
          <Button
            title='Start Service'
            onPress={() => {
              navigation.navigate(`${screen}`);
            }}
          />
        </View>
      ) : (
        <Text>Loading..</Text>
      )}
    </>
  );
};

export default ServiceDescription;

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    height: '80%',
    marginTop: 10,
    marginBottom: 10,
  },
  textWrapper: {
    marginBottom: 20,
  },
  textcls: {
    textAlign: 'justify',
    fontSize: 13,
    color: theme.primary,
  },
  primaryElements: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  pr10: {
    marginRight: 10,
    position: 'absolute',
  },
  primaryElementsWrapper: {
    borderStyle: 'solid',
    borderColor: theme.controlBorderColor,
    borderRadius: theme.controlBorderRadius,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.tint,
  },
  bld: {
    fontWeight: 'bold',
  },
});
