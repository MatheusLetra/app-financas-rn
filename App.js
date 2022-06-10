import * as React from 'react';
import { StatusBar } from 'expo-status-bar'

import Home from './src/Screens/Home';

export default function App() {
  return (
    <>
      <StatusBar style="light" hidden />
      <Home />
    </>
  )
}
