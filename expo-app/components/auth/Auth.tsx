import React, { useState } from 'react';
import { Alert, View, TouchableOpacity, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/button';
import Input from '../ui/input';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });
        console.log(JSON.stringify({ error, user }, null, 2));
        if (!error) {
          if (credential.fullName) {
            const nameParts = [];
            if (credential.fullName.givenName)
              nameParts.push(credential.fullName.givenName);
            if (credential.fullName.middleName)
              nameParts.push(credential.fullName.middleName);
            if (credential.fullName.familyName)
              nameParts.push(credential.fullName.familyName);
            const fullName = nameParts.join(' ');
            await supabase.auth.updateUser({
              data: {
                full_name: fullName,
                given_name: credential.fullName.givenName,
                family_name: credential.fullName.familyName,
              },
            });
          }
        }
      } else {
        throw new Error('No identityToken.');
      }
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }

  const GoogleSignInButton =
    Constants.appOwnership !== 'expo'
      ? require('./GoogleSignInButton').default
      : () => null;

  return (
    <View className="flex-1 justify-center p-5 bg-background">
      <View className="mb-5">
        <GoogleSignInButton />
        {Platform.OS === 'ios' && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={{ width: 200, height: 64, alignSelf: 'center' }}
            onPress={signInWithApple}
          />
        )}
      </View>

      <TouchableOpacity onPress={() => setShowEmailForm(!showEmailForm)}>
        <Text className="text-center text-primary mb-5">
          {showEmailForm ? 'Hide Email Sign In' : 'Sign in with email'}
        </Text>
      </TouchableOpacity>

      {showEmailForm && (
        <>
          <View className="py-1 self-stretch">
            <Input
              onChangeText={(text: string) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>
          <View className="py-1 self-stretch">
            <Input
              onChangeText={(text: string) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
            />
          </View>
          <View className="py-1 self-stretch mt-5">
            <Button title="Sign in" onPress={() => signInWithEmail()} />
          </View>
          <View className="py-1 self-stretch">
            <Button title="Sign up" variant="filter" onPress={() => signUpWithEmail()} />
          </View>
        </>
      )}
    </View>
  );
}
