/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from './screens/HomeScreen'
import { PraiseScreen } from './screens/PraiseScreen'

import { startUpdateJson } from './source/updateJson.ts'
import { ConfigurationScreen } from './screens/ConfigurationScreen'

const Stack = createNativeStackNavigator()

export default function App() {
    useEffect(() => {
        try {
            startUpdateJson().then((param) => {
                console.log('get success')
            }) // update the praises
        } catch (err) {
            console.log(`Update error: ${err}`)
        }
    }, [])

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
                <Stack.Screen
                    name="ConfigurationScreen"
                    component={ConfigurationScreen}
                    options={{
                        title: 'Configurações',
                        headerTitleStyle: {
                            fontSize: 20,
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
