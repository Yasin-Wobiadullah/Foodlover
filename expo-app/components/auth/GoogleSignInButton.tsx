import React from 'react';
import { Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/button';
import {
  GoogleSignin,
  statusCodes,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';

export default function GoogleSignInButton() {
  async function signInWithGoogle() {
    try {
      GoogleSignin.configure({
        webClientId: '169669624492-rbkvebmg8lbf7h66ig61e8j9iiab6qal.apps.googleusercontent.com',
        iosClientId: '169669624492-r4tfj3ep2tkg1kkvppspgk0vctavt5l9.apps.googleusercontent.com',
      });

      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const { idToken } = response.data;
        if (idToken) {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: idToken,
          });
          if (error) {
            Alert.alert('Supabase error:', error.message);
          }
        }
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        Alert.alert('Google Sign-In Error', error.message);
      }
    }
  }

  return <Button title="Sign in with Google" onPress={signInWithGoogle} />;
}
