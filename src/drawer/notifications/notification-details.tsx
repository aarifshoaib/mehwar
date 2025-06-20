import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../shared/components/screen-wrapper";
import axiosInstance from "../../auth/services/axios.interceptor";
import { env } from "../../../env/env.dev";

const NotificationDetails = ({ route }) => {
    const item = route.params.item;
    console.log(item);

    useEffect(() => {
        const markAsRead = async () => {
            try {
                console.log(`${env.coreServices}/notifications/${item._id}`);
                const response = await axiosInstance.patch(`${env.coreServices}notifications/${item._id}`);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        markAsRead();
    }, [item]);

    return (
        <ScreenWrapper refreshing={undefined} onRefresh={undefined} >
            <View>

            </View>
        </ScreenWrapper>
    );
};

export default NotificationDetails;

const styles = StyleSheet.create({
    title: {

    },
    subTiltle: {

    }
});
