import React from 'react';

// Mock GluestackUIProvider
export const GluestackUIProvider = ({ children }) => children;

// Mock common gluestack-ui components
export const Box = ({ children, testID, ...props }) => React.createElement('View', { testID, ...props }, children);
export const VStack = ({ children, ...props }) => React.createElement('View', props, children);
export const HStack = ({ children, ...props }) => React.createElement('View', props, children);
export const Text = ({ children, ...props }) => React.createElement('Text', props, children);
export const Heading = ({ children, ...props }) => React.createElement('Text', props, children);
export const Button = ({ children, onPress, ...props }) => React.createElement('TouchableOpacity', { onPress, ...props }, children);
export const ButtonText = ({ children, ...props }) => React.createElement('Text', props, children);
export const Input = ({ children, ...props }) => React.createElement('View', props, children);
export const InputField = ({ value, onChangeText, onBlur, placeholder, ...props }) => 
  React.createElement('TextInput', { value, onChangeText, onBlur, placeholder, ...props });
export const FormControl = ({ children, ...props }) => React.createElement('View', props, children);
export const FormControlLabel = ({ children, ...props }) => React.createElement('View', props, children);
export const FormControlLabelText = ({ children, ...props }) => React.createElement('Text', props, children);
export const FormControlError = ({ children, ...props }) => React.createElement('View', props, children);
export const FormControlErrorText = ({ children, ...props }) => React.createElement('Text', props, children);
export const Badge = ({ children, ...props }) => React.createElement('View', props, children);
export const Divider = (props) => React.createElement('View', props);
export const Alert = ({ children, ...props }) => React.createElement('View', props, children);
export const AlertIcon = (props) => React.createElement('View', props);
export const AlertText = ({ children, ...props }) => React.createElement('Text', props, children);
export const Pressable = ({ children, onPress, ...props }) => React.createElement('TouchableOpacity', { onPress, ...props }, typeof children === 'function' ? children({ pressed: false }) : children);

