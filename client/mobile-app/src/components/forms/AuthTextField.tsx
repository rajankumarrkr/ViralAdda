import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

export function AuthTextField(props: TextInputProps) {
  return <TextInput {...props} style={[{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 }, props.style]} />;
}
