/**
 * Created by durgaprasad on 7/17/17.
 */
import {
    NativeModules,
    PermissionsAndroid
} from 'react-native';

const {
    RNAzureAdal
} = NativeModules;

import BaseAzureAdal from './BaseAzureAdal';

export default class AzureAdal extends BaseAzureAdal {
    /**
     *
     * @param authority
     * @param validateAuthority
     * @param clientId
     * @param redirectUrl
     * @param useBroker if true, it will try to use broker based authentication only if broker is present
     */
    async configure (authority: String, validateAuthority: Boolean, clientId: String,
            redirectUrl: String, useBroker: Boolean) {
        try {
            await RNAzureAdal.configure(authority, validateAuthority, clientId, redirectUrl, useBroker);
            return true;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

