import { StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect, useState, useMemo } from 'react'
import AzureAuth from 'react-native-azure-auth';
import { env } from '../../../env/env.dev';
import { AuthContext } from '../../auth/redux/auth.context';
import { base64User } from '../../../assets/data/base64userImage';

const UserImage = ({ email, width = 50, style = {} }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);

    const azureAuth = useMemo(() => new AzureAuth({
        clientId: env.azureAppId,
        tenant: env.azureTenantId,
    }), []);



    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    useEffect(() => {
        try {
            const fetchUserImage = async () => {
                const _token = await authCtx.userToken;
                if (!_token) return;
                const url = `users/${email}/photo/$value`;
                try {
                    const response = await azureAuth.auth.msGraphRequest({ token: _token, path: url });
                    const base64String = await blobToBase64(response);
                    setImage(base64String);
                } catch (error) {
                    setImage(base64User);
                    setError(error);
                }
            }
            fetchUserImage();
        }
        catch (error) {
            setImage(base64User);
            setError(error);
        }
    }, [email, authCtx.userToken, azureAuth]);

    // if (error) {
    //     return (
    //         <Image 
    //             style={{ ...styles.image, width: width, height: width }} 
    //             source={require('path/to/default/image.png')} 
    //         />
    //     );
    // }

    return ( image &&
        <Image
            style={{ ...styles.image, width: width, height: width, ...style }}
            source={{ uri: image }}
        />
    );
}

export default UserImage;

const styles = StyleSheet.create({
    image: {
        borderRadius: 1000,
        zIndex: 1000,
        borderWidth: 4,
        borderColor: '#CAD8E5',
        alignSelf: 'flex-end',
    }
});