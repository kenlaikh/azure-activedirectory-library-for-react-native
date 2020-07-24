/**
 * Created by durgaprasad on 7/4/17.
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
    const PERMISSION_DENIED_ERROR_CODE = "PERMISSION_DENIED";
    try {
	    if (useBroker) {
	      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.GET_ACCOUNTS);
	      if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === true) {
	        await RNAzureAdal.configure(authority, validateAuthority, clientId, redirectUrl, useBroker);
	        return true;
	      } else {
	        return Promise.reject(PERMISSION_DENIED_ERROR_CODE);
	      }
	    }
	    else {
	      await RNAzureAdal.configure(authority, validateAuthority, clientId, redirectUrl, useBroker);
	      return true;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  
  /**
   * Prompt the modal to let the user signin with azure ad credentials into your application
   * @param resourceUrl
   * @param loginHint
   * @param extraQueryParameters
   * @returns Promise
   */
  loginWithPromptInteractive (resourceUrl: String, loginHint: String, extraQueryParameters: String) {
    return RNAzureAdal.acquireInteractiveTokenAsync(resourceUrl, loginHint, extraQueryParameters, true);
  }
}

