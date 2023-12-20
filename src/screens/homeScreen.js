import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('selectedData');
        if (storedData !== null) {
          setSelectedData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    retrieveData();
  }, []);

  const goToMatchSchedule = () => {
    navigation.navigate('ScheduleMatch', { selectedData });
  };

  const goToEditSchedule = () => {
    navigation.navigate('ScheduleMatch', { selectedData, isEdit: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.label}>List of Selected Data:</Text>
        {selectedData ? (
          <View>
            <Text>Selected Dates: {selectedData.dates}</Text>
            <Text>Start Time: {selectedData.startTime}</Text>
            <Text>End Time: {selectedData.endTime}</Text>
          </View>
        ) : (
          <Text>No data available</Text>
        )}
      </View>
      <Button title="Match Schedule" onPress={goToMatchSchedule} />
      <Button title="Edit Schedule" onPress={goToEditSchedule} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dataContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
