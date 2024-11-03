import QuestionDetailScreen from "@/screens/questionDetail.screen";
import TestListScreen from "@/screens/testList.screen";
import { useLocalSearchParams } from "expo-router";

export default function Test() {

    const { isList } = useLocalSearchParams();

    if(isList) return (
        <TestListScreen />
    )

    return (
        <QuestionDetailScreen />  
    )
}