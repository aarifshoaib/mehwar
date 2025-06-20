import { ListRenderItemInfo, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import ProfileItem from './components/profile-item'

const PersonalSegment = ({ navigation }) => {
  const [menu, setMenu] = useState([
    { title: 'Basic Information', key: 1, icon: 'user', url: 'basicInformation' },
    { title: 'Family Details', key: 2, icon: 'user', url: 'familyInformation' },
    { title: 'Skills Bank', key: 8, icon: 'lightbulb-on-outline', type: 'material', url: 'skills' }
    // { title: 'Unified ID\'s', key: 2, icon: 'idcard', url: 'unifiedIds' },
    // { title: 'Work Expereince', key: 3, icon: 'profile', url: 'workExpereince' },
    // { title: 'Housing', key: 4, icon: 'home', url: 'housing' },
    // { title: 'Qualifications', key: 6, icon: 'book-open', type: 'feather', url: 'qualifications' },
    // { title: 'Bank Details', key: 7, icon: 'bank-outline', type: 'material', url: 'bank' },
    // { title: 'Languages', key: 9, icon: 'language', type: 'ionic', url: 'languages' },
  ])
  return (
    <View style={{}}>
      <FlatList scrollEnabled={false} bounces={false} data={menu} renderItem={({ item }) => <ProfileItem navigation={navigation} item={item} />}
      />

      {/* <AccordionItem title={'Basic Information'} number={null} style={{ headerStyle: { borderTopStartRadius: theme.controlBorderRadius, borderTopEndRadius: theme.controlBorderRadius }, contentStyle: {} }}>
        <View style={{ paddingVertical: 10 }}>
          <BasicInformation />
        </View>
      </AccordionItem>
      <AccordionItem title={"Unified ID's"} number={null} style={{ headerStyle: { borderRadius: 0 }, contentStyle: {} }}>
        <View style={{ paddingVertical: 10 }}>
          <EmployeeIDs />
        </View>
      </AccordionItem>
      <AccordionItem title={"Employement Profile"} number={null} style={{ headerStyle: { borderRadius: 0 }, contentStyle: {} }}>
        <View style={{ paddingVertical: 10 }}>
          <EmploymentProfile />
        </View>
      </AccordionItem>
      <AccordionItem title={"Housing"} number={null} style={{ headerStyle: { borderRadius: 0 }, contentStyle: {} }}>
        <View style={{ paddingVertical: 10 }}>
          <HousingProfile />
        </View>
      </AccordionItem>
      <AccordionItem title={"Emergency Contacts"} number={null} style={{ headerStyle: { borderRadius: 0 }, contentStyle: {} }}>
        <View style={{ paddingVertical: 10 }}>
          <EmergencyContacts />
        </View>
      </AccordionItem>
      <AccordionItem title={"Qualifications"} number={null} style={{ headerStyle: { borderRadius: 0 }, contentStyle: {} }}>
        <View style={{ paddingVertical: 10 }}>
          <Qualifications />
        </View>
      </AccordionItem>
      <AccordionItem title={"Bank Details"} number={null} style={{ headerStyle: { borderRadius: 0 }, contentStyle: {} }}>
        <View style={{ paddingVertical: 10 }}>
          <BankDetails />
        </View>
      </AccordionItem>
      <AccordionItem title={"Skills Bank"} number={null} style={{ headerStyle: { borderRadius: 0 }, contentStyle: {} }}>
        <View style={{ paddingVertical: 10 }}>
          <SkillsBank />
        </View>
      </AccordionItem>
      <AccordionItem title={"Languages"} number={null} style={{ headerStyle: { borderRadius: 0 }, contentStyle: {} }}>
        <View style={{ paddingVertical: 10 }}>
          <EmployeeLanguage />
        </View>
      </AccordionItem> */}
    </View>
  )
}

export default PersonalSegment

const styles = StyleSheet.create({})