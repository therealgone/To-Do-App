import React, { useState, useEffect } from "react";
import { Text, Pressable, TextInput, View, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
import { DotGothic16_400Regular,useFonts } from "@expo-google-fonts/dotgothic16";



export default function Home() {
    const [taskTitles, setTaskTitles] = useState<string[]>([])
    const [newTitles, setNewTitles] = useState("")
    const [doneTask, setDoneTask] = useState<number[]>([])
      const [fontsLoaded] = useFonts({
    DotGothic16_400Regular,
  });



    useEffect(() => {
        loadsave();
        loadsavedonetask();
    }, [])

    useEffect(() => {
        savedonetask(doneTask)
    }, [doneTask])

    const loadsavedonetask = async () => {
        try {
            const save = await AsyncStorage.getItem("doneTask");
            if (save) setDoneTask(JSON.parse(save))
        }
        catch (err) {
            console.log(err)
        }
    }

    const savedonetask = async (donetaskinedex: number[]) => {
        try {
            await AsyncStorage.setItem("doneTask", JSON.stringify(donetaskinedex))
        }
        catch (err) {
            console.log(err)
        }
    }

    const loadsave = async () => {
        try {
            const save = await AsyncStorage.getItem("taskTitles");
            if (save) setTaskTitles(JSON.parse(save))
        }
        catch (err) {
            console.log(err)
        }
    };

    const savetitle = async (titles: string[]) => {
        try {
            await AsyncStorage.setItem("taskTitles", JSON.stringify(titles))
        }
        catch (err) {
            console.log(err)
        }
    };
      {/*Task Delete */ }
    const deleteTitle = (indexToDelete: number) => {
        const update = taskTitles.filter((_, index) => index !== indexToDelete);
        const indexupdate = doneTask.filter(doneindex => doneindex !== indexToDelete).map(doneindex => (doneindex > indexToDelete ? doneindex - 1 : doneindex))
        setDoneTask(indexupdate)
        setTaskTitles(update)
        savetitle(update)
    }

    {/*Task Done */ }

    const taskdone = (indexdone: number) => {
        if (doneTask.includes(indexdone)) {
            setDoneTask(doneTask.filter(doneindex => doneindex !== indexdone))

        }
        else {
            setDoneTask([...doneTask, indexdone])

        }
    }
    {/*Adds the tasks*/ }
    const addTitle = () => {
        if (newTitles.trim() === "") return;
        const update = [...taskTitles, newTitles.trim()];
        setTaskTitles(update);
        savetitle(update)
        setNewTitles("")
    }
    {/* Removes all the task from save / task*/ }
    const deletealltask = () => {
        setTaskTitles([])
        savetitle([])
        setDoneTask([])
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-darkN">

                {/*Dark-Mode in Status Bar Icons */}
                <StatusBar barStyle="light-content" backgroundColor="black" />

                {/* Header Section */}
                <View className="px-6 py-8">



                    <Text className="text-3xl text-whiteN text-center font-dotgothic  tracking-tight">
                        Taskly
                    </Text>
                    <Text className="text-text-secondary text-sm text-center font-dotgothic mt-2">
                        {taskTitles.length} tasks • {doneTask.length} completed
                    </Text>

                </View>

                {/* Input Section */}
                <View className="px-6 mb-6  ">
                    <View className="bg-card rounded-lg border border-neutral-border p-7 shadow-md ">
                        <TextInput
                            className="bg-transparent  placeholder:text-whiteN text-white text-base font-dotgothic mb-4"
                            placeholder="What needs to be done?"
                            placeholderTextColor="#6E6E6E"
                            value={newTitles}
                            onChangeText={setNewTitles}
                        />

                        <Pressable
                            className={`rounded-full px-6 py-3 items-center shadow-md  ${newTitles.trim() === ""
                                ? "bg-neutral-border opacity-50"
                                : "bg-yellowN"
                                }`}
                            onPress={addTitle}
                            disabled={newTitles.trim() === ""}
                        >
                            <Text allowFontScaling={false} className={` font-dotgothic  ${newTitles.trim() === "" ? "text-text-secondary" : "text-darkN"
                                }`}>
                                Add Task
                            </Text>
                        </Pressable>

                        {taskTitles.length > 0 && (
                            <Pressable
                                onPress={deletealltask}
                                className="border bg-redN/50 border-redN/90 rounded-full px-6 py-3 mt-3  "
                            >
                                <Text className="text-white  text-center font-dotgothic ">Delete All Task</Text>
                            </Pressable>
                        )


                        }

                    </View>


                </View>

                {/* Task List */}
                <View className="flex-1 px-6">
                    {taskTitles.length === 0 ? (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-whiteN text-lg font-dotgothic text-center">
                                No Tasks Added
                            </Text>
                            <Text className="text-whiteN/90 text-sm font-dotgothic text-center mt-2 opacity-70">
                                Add your first task above
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={taskTitles}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <View>
                                    <Pressable className=""
                                        onPress={() => taskdone(index)}
                                    >
                                        <View className={` rounded-lg border border-neutral-border p-4 mb-3 shadow-sm ${doneTask.includes(index)
                                            ? "bg-greenN "
                                            : "bg-card"
                                            }`}>

                                            <View className="flex-row items-center justify-between">

                                                <Text className={`text-base font-dotgothic flex-1 mr-4 ${doneTask.includes(index)
                                            ? "text-darkN "
                                            : "text-white"
                                            }`}>
                                                    {item}
                                                </Text>


                                                <View className="flex-row items-center space-x-2">


                                                    <Pressable
                                                        onPress={() => deleteTitle(index)}
                                                        className={`p-2 px-4  rounded-full  border  ${doneTask.includes(index)
                                            ? "border-redN bg-redN "
                                            : "border-redN/90 bg-redN/70 "
                                            }`    }                                                >
                                                        <Text className="text-whiteN    text-sm ">×</Text>
                                                    </Pressable>
                                                </View>
                                            </View>

                                        </View>

                                    </Pressable>

                                </View>
                            )}
                        />
                    )}
                </View>



            </SafeAreaView>
        </SafeAreaProvider>
    )
}