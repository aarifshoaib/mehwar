const colors = {
    primary: '#668CB0',
    secondary: '#3B5998',
    danger: '#FC1010',
    success: '#2E9311',
    warning: '#F5A40B',
    tint: '#EDF2F6',
    light: '#fff',
}
export const theme = {
    primaryLight: lightenColor(colors.primary, 0.3),
    primary: colors.primary,
    primaryDark: darkenColor(colors.primary, 0.3),
    secondaryLight: lightenColor(colors.secondary, 0.3),
    secondary: colors.secondary,
    secondaryDark: darkenColor(colors.secondary, 0.3),
    tintLight: lightenColor(colors.tint, 0.3),
    tint: colors.tint,
    tintDark: darkenColor(colors.tint, 0.3),
    danger: colors.danger,
    dangerBG: '#F8DFDF',
    dangerBgTint: '#A83F3F',
    dangerBorder: darkenColor('#F8DFDF', 0.1),
    warningBG: '#F0E8D1',
    warningBgTint: '#BEAC7C',
    warningBorder: darkenColor('#F8EEDF', 0.1),
    dangerDark: darkenColor(colors.danger, 0.3),
    success: colors.success,
    successDark: darkenColor(colors.success, 0.3),
    warning: colors.warning,
    warningDark: darkenColor(colors.warning, 0.3),
    background: colors.light,
    default: '#aaa',
    fontAdportsRegular: 'ADPortsGroup-Regular',
    fontAdportsLight: 'ADPortsGroup-Light',
    fontFamilyThin: 'Poppins-Thin',
    fontFamilyLight: 'Poppins-Light',
    fontFamily: 'Poppins-Regular',
    fontFamilyBold: 'Poppins-Bold',
    fontSemiBold: 'Poppins-SemiBold',
    fontFamilyRegular:'Poppins-Regular',
    fontFamilyMedium:'Poppins-Medium',
    pageRadius: 50,
    pageBackground: colors.light,
    pageFontSize: 15,
    pageTitleFontSize: 17,


    controlBorderColor: '#B6CFE7', /* '#DADBDF', */
    controlBackgroundColor: '#fff',
    controlLabelColor: darkenColor(colors.primary, 0.3),
    controlLabelFontFamily: 'Poppins-Regular',
    controlBorderRadius: 12,
    controlSpacing: 0,
    controlLabelFontSize: 16,
    controlPlaceholderColor: '#848484',

    controlPlaceholderFontSize: 15,
    controlFontSize : 15,
    controlColor: '#777777',
    controlHeight: 50,

    controlIconColor: '#848484',

    controlAttachmentColor: '#125DB1',

    labelSpacing: 17,
}

export function darkenColor(hex, percentage) {
    // Convert hex to RGB
    let r: any = parseInt(hex.slice(1, 3), 16);
    let g: any = parseInt(hex.slice(3, 5), 16);
    let b: any = parseInt(hex.slice(5, 7), 16);

    // Apply the darkening formula
    r = Math.floor(r * (1 - percentage));
    g = Math.floor(g * (1 - percentage));
    b = Math.floor(b * (1 - percentage));

    // Convert back to hex
    r = r.toString(16).padStart(2, '0');
    g = g.toString(16).padStart(2, '0');
    b = b.toString(16).padStart(2, '0');

    // Return the darkened color in hex format
    return `#${r}${g}${b}`;
    // return '#2b2a2a';
}

export function lightenColor(hex, percentage) {
    // Convert hex to RGB
    let r: any = parseInt(hex.slice(1, 3), 16);
    let g: any = parseInt(hex.slice(3, 5), 16);
    let b: any = parseInt(hex.slice(5, 7), 16);

    // Apply the lightening formula
    r = Math.floor(Math.min(255, r + (255 - r) * percentage));
    g = Math.floor(Math.min(255, g + (255 - g) * percentage));
    b = Math.floor(Math.min(255, b + (255 - b) * percentage));

    // Convert back to hex
    r = r.toString(16).padStart(2, '0');
    g = g.toString(16).padStart(2, '0');
    b = b.toString(16).padStart(2, '0');

    // Return the lightened color in hex format
    return `#${r}${g}${b}`;
   
}
