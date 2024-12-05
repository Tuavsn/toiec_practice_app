import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';

type Item = {
  id: string;
  title: string;
};

type Category = 'question' | 'course' | 'user';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('question');

  const data: Record<Category, Item[]> = {
    question: [
      { id: 'q1', title: 'What is React Native?' },
      { id: 'q2', title: 'How to use hooks in React?' },
    ],
    course: [
      { id: 'c1', title: 'React Native Course' },
      { id: 'c2', title: 'JavaScript Basics' },
    ],
    user: [
      { id: 'u1', title: 'User John Doe' },
      { id: 'u2', title: 'User Jane Smith' },
    ],
  };

  const handleSearch = () => {
    const filteredData = data[selectedCategory].filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredData);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity className="p-4 border-b border-gray-300">
      <Text className="text-lg">{item.title}</Text>
    </TouchableOpacity>
  );

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setResults(data[category].filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    ));
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="flex-row items-center mb-4">
        <TextInput
          className="flex-1 h-12 border border-gray-300 rounded-lg px-4 text-base"
          placeholder="Tìm kiếm..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          className="ml-2 px-4 py-2 bg-[#004B8D] rounded-lg"
          onPress={handleSearch}
        >
          <Text className="text-white text-base">Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-5 mb-4">
        <TouchableOpacity
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === 'question' ? 'bg-[#004B8D]' : 'bg-gray-300'
          }`}
          onPress={() => handleCategoryChange('question')}
        >
          <Text className="text-white text-base">Câu hỏi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === 'course' ? 'bg-[#004B8D]' : 'bg-gray-300'
          }`}
          onPress={() => handleCategoryChange('course')}
        >
          <Text className="text-white text-base">Lý thuyết</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === 'user' ? 'bg-[#004B8D]' : 'bg-gray-300'
          }`}
          onPress={() => handleCategoryChange('user')}
        >
          <Text className="text-white text-base">Tài khoản</Text>
        </TouchableOpacity>
      </View>

      <Text className="font-bold text-lg">Kết quả tìm kiếm:</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text className="text-center mt-4 text-gray-500">No results found</Text>
        )}
      />
    </View>
  );
};

export default SearchScreen;
