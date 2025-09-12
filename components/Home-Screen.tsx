import React, { useState, useEffect } from "react";
import { Text, Pressable, TextInput, View, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Home() {

    const[taskTitles,setTaskTitles] = useState<string[]>([])
    const[newTitles,setNewTitles]=useState("")
    const[doneTask,setDoneTask] = useState<number[]>([])

useEffect(()=> {
    loadsave();
},[])


const loadsave = async() => {
    try {
        const save= await AsyncStorage.getItem("taskTitles");
        if(save) setTaskTitles(JSON.parse(save))
    }
     catch(err)
     {
        console.log(err)
     }
};

const savetitle = async (titles: string[]) => {
    try {
        await AsyncStorage.setItem("taskTitles",JSON.stringify(titles))
    }
    catch (err) {
        console.log(err)
    }
};

const deleteTitle = (indexToDelete: number) => {

    const update = taskTitles.filter((_, index) => index !== indexToDelete);
    const indexupdate = doneTask.filter(doneindex => doneindex !== indexToDelete).map(doneindex =>(doneindex > indexToDelete ? doneindex - 1 :doneindex))
    setDoneTask(indexupdate)
    setTaskTitles(update)
    savetitle(update)

}

const taskdone = (indexdone : number) => {

    if (doneTask.includes(indexdone))
    {
        setDoneTask(doneTask.filter(doneindex => doneindex !== indexdone))
     
            console.log(doneTask)
    }
else {
setDoneTask([ ...doneTask , indexdone])
console.log(doneTask)
}
    



   
}

    const addTitle = () => {
        if(newTitles.trim() === "") return;

        const update = [... taskTitles, newTitles.trim()];

        setTaskTitles(update);
        savetitle(update)
        setNewTitles("")

    }


    return (
    <SafeAreaProvider>
  <SafeAreaView className='bg-black flex-1'>
    <Text className='text-white text-center font-extrabold p-3 text-2xl '>Taskify</Text>
<View>
    <TextInput className="border border-white  bg-white  "
    placeholder="Enter Task Title"
    value={newTitles}
    onChangeText={setNewTitles}></TextInput>
<Pressable className="border border-white px-3 py-1 rounded-full self-end items-center text-center"

onPress={addTitle}>

          <Text className="text-white text-lg p-2">Add</Text>
        </Pressable>

<Pressable
 onPress={()=>console.log(doneTask)}>
    <Text className="text-white">Index</Text>
</Pressable>
</View>


<FlatList data={taskTitles}
keyExtractor={(item,index) => index.toString()}
renderItem={({item, index}) =>(

    <View >
        <Text className={` ${doneTask.includes(index) ?  "text-green-400" : "text-white"}`}>{item}</Text>
        <Pressable>
          <Text className="text-red-600 border border-red-700 self-end "
            onPress={() => deleteTitle(index)}> X </Text>
        </Pressable>
        <Pressable
        onPress={()=> taskdone(index)}>
            <Text className="self-center">✔️</Text>

        </Pressable>
    </View>
)} />


  </SafeAreaView>
  </SafeAreaProvider>

    )
}