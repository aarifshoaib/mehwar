
import React, { useEffect } from "react";
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { theme } from "../../../shared/theme";

const fcontact = [
    {
        PersonNumber: "02142_524929",
        PersonId: "300000006724039",
        FirstName: "Pillai",
        LastName: "Raza",
        ContactType: "Child",
    },
    {
        PersonNumber: "02142_524928",
        PersonId: "300000006728520",
        FirstName: "Mirza Faraz",
        LastName: "Gabriel",
        PhoneNumber: "2818933816",
        ContactType: "Spouse",
    },
    {
        PersonNumber: "02142_678497",
        PersonId: "300000006769957",
        FirstName: "Mirza Faraz",
        LastName: "Muhammad Nawaz",
        PhoneNumber: "3344818344",
        ContactType: "Emergency",
    },
];

const ContactItem = ({ item }) => (
    <View style={styles.contactContainer}>
        <View style={styles.iconContainer}>

        </View>
        <View style={styles.contactDetails}>
            <Text style={styles.contactName}>{`${item.FirstName} ${item.LastName}`.trim()}</Text>
            <Text style={styles.contactType}>{item.ContactType}</Text>
            {item.PhoneNumber && <Text style={styles.contactPhone}>{item.PhoneNumber}</Text>}
        </View>
    </View>
);


const FamilyInfo = () => {
    const [contacts, setContacts] = React.useState([]);
    useEffect(() => {
        setContacts(fcontact);
    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.PersonId}
                renderItem={({ item }) => <ContactItem item={item} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

export default FamilyInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8', // Subtle background color for better readability
        padding: 10,
    },
    contactContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 12, // Softer rounded corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e7ff', // Light blue background for icon
        borderRadius: 20,
        padding: 5,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'contain',
    },
    contactDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    contactName: {
        fontSize: 18, // Slightly larger font for name
        fontWeight: '600',
        color: '#1a202c', // Darker color for better contrast
    },
    contactType: {
        fontSize: 14,
        color: '#718096', // Muted color for contact type
        marginTop: 2,
    },
    contactPhone: {
        fontSize: 14,
        color: '#3182ce', // Blue color for phone number to indicate interactivity
        marginTop: 4,
    },
    separator: {
        height: 15, // More spacing between items
    },

});

