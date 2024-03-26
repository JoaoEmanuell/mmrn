import { Text } from 'react-native'

export function PraiseScreen({ navigation, route }) {
    console.log(navigation)
    console.log(route)
    return <Text>This is {route.params.praiseNumber}'s profile</Text>
}
