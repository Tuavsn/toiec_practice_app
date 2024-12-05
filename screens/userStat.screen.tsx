import React from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

// Định nghĩa kiểu dữ liệu cho props và state
type TopicStat = {
  topic: {
    name: string;
  };
  totalCorrect: number;
  totalIncorrect: number;
};

type SkillStat = {
  skill: string;
  totalCorrect: number;
  totalIncorrect: number;
};

type StatScreenProps = {
  data: {
    topicStats: TopicStat[];
    skillStats: SkillStat[];
  };
};

const StatScreen: React.FC<StatScreenProps> = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;

  // Data for charts
  const topicData = data.topicStats.slice(0, 5).map((topicStat) => ({
    name: topicStat.topic.name,
    correct: topicStat.totalCorrect,
    incorrect: topicStat.totalIncorrect,
  }));

  const skillData = data.skillStats.map((skillStat) => ({
    skill: skillStat.skill,
    correct: skillStat.totalCorrect,
    incorrect: skillStat.totalIncorrect,
  }));

  // Prepare PieChart data
  const pieChartData = skillData.map((skill) => ({
    name: skill.skill,
    population: skill.correct + skill.incorrect,
    color: skill.skill === 'listening' ? '#4CAF50' : '#FFC107',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  // Prepare LineChart data
  const lineChartData = {
    labels: topicData.map((t) => t.name),
    datasets: topicData.map((topic) => ({
      data: [topic.correct, topic.incorrect], // Correct and Incorrect answers
      color: (opacity = 1) => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${opacity})`,
      strokeWidth: 3,
    })),
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f9', paddingHorizontal: 16, paddingTop: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 32, color: '#333' }}>
        Performance Statistics
      </Text>

      {/* Pie Chart */}
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          padding: 16,
          marginBottom: 32,
          elevation: 4,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16, textAlign: 'center', color: '#444' }}>
          Skill Performance
        </Text>
        <PieChart
          data={pieChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#f3f3f3',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Line Chart for Topics */}
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          padding: 16,
          elevation: 4,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16, textAlign: 'center', color: '#444' }}>
          Topic Performance
        </Text>
        <LineChart
          data={lineChartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#f3f3f3',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          withDots={true}
          withInnerLines={false}
          withOuterLines={false}
          withShadow={false}
        />

        {/* Chú thích cho từng đường biểu đồ */}
        <View style={styles.legendContainer}>
          {topicData.map((topic, index) => (
            <View key={index} style={styles.legendItem}>
              <Text style={{ ...styles.legendText, backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)` }}>
                {topic.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    margin: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  legendText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default StatScreen;
