import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from './screens/HomeScreen'
import { PraiseScreen } from './screens/PraiseScreen'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: '',
                    }}
                />
                <Stack.Screen
                    name="PraiseScreen"
                    component={PraiseScreen}
                    options={{ title: 'Louvor' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
