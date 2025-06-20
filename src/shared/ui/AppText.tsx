import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface AppTextProps extends RNTextProps {
  thin?: boolean;
  light?: boolean;
  medium?: boolean;
  semibold?: boolean;
  bold?: boolean;
}

const AppText: React.FC<AppTextProps> = ({
  style,
  thin,
  light,
  medium,
  semibold,
  bold,
  children,
  ...props
}) => {
  let fontFamily = 'Poppins';
  
  if (thin) fontFamily = 'Poppins-Thin';
  else if (light) fontFamily = 'Poppins-Light';
  else if (medium) fontFamily = 'Poppins-Medium';
  else if (semibold) fontFamily = 'Poppins-SemiBold';
  else if (bold) fontFamily = 'Poppins-Bold';
  
  return (
    <RNText 
      style={[{ fontFamily }, style]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default AppText;
