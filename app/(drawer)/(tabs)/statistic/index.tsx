import StatScreen from "@/screens/userStat.screen"
import { SafeAreaView } from "react-native-safe-area-context"

const mockData = {
    topicStats: [
      {
        topic: { name: 'Tranh tả cả người và vật' },
        totalCorrect: 0,
        totalIncorrect: 1,
      },
      {
        topic: { name: 'Tranh tả người' },
        totalCorrect: 1,
        totalIncorrect: 2,
      },
      {
        topic: { name: 'Tranh tả vật' },
        totalCorrect: 1,
        totalIncorrect: 1,
      },
    ],
    skillStats: [
      { skill: 'listening', totalCorrect: 6, totalIncorrect: 7 },
      { skill: 'reading', totalCorrect: 0, totalIncorrect: 0 },
    ],
};

export default function StatisticTabItem() {
    return (
        <SafeAreaView className="flex-1">
            <StatScreen data={mockData}/>
        </SafeAreaView>
    )
}