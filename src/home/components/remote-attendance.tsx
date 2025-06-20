import { FloatingAction } from "react-native-floating-action";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { theme } from "../../shared/theme";
import { color } from "@rneui/base";
const actions = [
  {
    text: "Punch In",
    icon: require("../../../assets/images/icons/employee.png"),
    name: "bt_in",
    position: 1,
    color: theme.secondaryDark
  },
  {
    text: "Punch Out",
    icon: require("../../../assets/images/icons/employee.png"),
    name: "bt_out",
    position: 2,
    color: theme.secondaryDark
  }
];

export const RemoteAttendance = () => {
  return (
    <FloatingAction
      color={theme.primary}
      actions={actions}
      onPressItem={name => {
        console.log(`selected button: ${name}`);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f4",
    justifyContent: "center",
    alignItems: "center"
  },
  example: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  }
});