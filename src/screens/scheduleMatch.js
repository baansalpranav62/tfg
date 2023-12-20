import React, { useState } from 'react';
import { StyleSheet, Text, View  , TouchableOpacity} from 'react-native';
import { Calendar } from 'react-native-calendars';
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import DatePicker from 'react-native-date-picker';
import { getMatchSchedule } from './Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ScheduleMatch = () => {
    const navigation = useNavigation();

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const logSelectedData = async () => {
        let dates = [];
      
        if (selectedStartDate && selectedEndDate) {
          const currentDate = new Date(selectedStartDate);
          const endDate = new Date(selectedEndDate);
      
          while (currentDate <= endDate) {
            dates.push(format(currentDate, 'yyyy-MM-dd'));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        } else if (selectedStartDate && !selectedEndDate) {
          dates.push(selectedStartDate);
        } else {
          console.log('Please select a date range.');
          return;
        }
      
        try {
          const selectedData = {
            dates,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
          };
          await AsyncStorage.setItem('selectedData', JSON.stringify(selectedData));
          console.log('Data saved to AsyncStorage:', selectedData);
          navigation.navigate('Home');
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };
      
      
  const onDayPress = (day) => {
    const selectedDate = format(new Date(day.timestamp), 'yyyy-MM-dd');

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(selectedDate);
      setSelectedEndDate(null);
    } else if (selectedStartDate && !selectedEndDate) {
      if (isBefore(new Date(selectedStartDate), new Date(selectedDate))) {
        setSelectedEndDate(selectedDate);
      } else {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(selectedDate);
      }
    }
  };

  const markedDates = {};

  if (selectedStartDate) {
    markedDates[selectedStartDate] = { selected: true, startingDay: true, color: 'blue' };
  }
  if (selectedEndDate) {
    markedDates[selectedEndDate] = { selected: true, endingDay: true, color: 'blue' };

    let currentDate = new Date(selectedStartDate);
    while (isBefore(currentDate, new Date(selectedEndDate))) {
      currentDate = addDays(currentDate, 1);
      const date = format(currentDate, 'yyyy-MM-dd');
      if (!markedDates[date]) {
        markedDates[date] = { selected: true, color: 'blue' };
      }
    }
  }
  const handleStartTimeChange = (time) => {
    setStartTime(time);
    setShowStartTimePicker(false);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    setShowEndTimePicker(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Date Range</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={{
          calendarBackground: '#ffffff',
          selectedDayBackgroundColor: '#166088',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#166088',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#166088',
          arrowColor: '#166088',
        }}
      />
       <TouchableOpacity style={styles.button} onPress={() => setShowStartTimePicker(true)}>
        <Text style={styles.buttonText}>Select Start Time</Text>
      </TouchableOpacity>

      {showStartTimePicker && (
        <DatePicker
          date={startTime}
          mode="time"
          onDateChange={handleStartTimeChange}
          style={styles.datePicker}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => setShowEndTimePicker(true)}>
        <Text style={styles.buttonText}>Select End Time</Text>
      </TouchableOpacity>

      {showEndTimePicker && (
        <DatePicker
          date={endTime}
          mode="time"
          onDateChange={handleEndTimeChange}
          style={styles.datePicker}
        />
      )}
<TouchableOpacity style={styles.button} onPress={logSelectedData}>
        <Text style={styles.buttonText}>Log Selected Data</Text>
      </TouchableOpacity>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ScheduleMatch;
