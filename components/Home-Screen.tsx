import { Text, TouchableOpacity ,Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function Home() {


    return (
    <SafeAreaProvider>
  <SafeAreaView className='bg-black flex-1'>
    <Text className='text-white text-center font-extrabold p-3 text-2xl '>Taskify</Text>

<Pressable className="border border-white px-3 py-1 rounded-full self-end items-center text-center"

onPress={()=> console.log("Button Pressed")}>

          <Text className="text-white text-lg p-2">Add</Text>
        </Pressable>
    
  </SafeAreaView>
  </SafeAreaProvider>

    )
}