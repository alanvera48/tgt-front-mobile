import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  LocaleConfig,
  WeekCalendar,
} from 'react-native-calendars';

import {getMarkedDates} from './mock';
import testiDs from '../../components/AgendaItem/testiDs';
import AgendaItem from '../../components/AgendaItem/AgendaItem';
import {COLORS} from '../../style/style';
import {useGetRoutineHistory} from '../../hooks/rutines/queries';
import isEmpty from 'lodash/isEmpty';
import {formatInTimeZone} from 'date-fns-tz';
import {es} from 'date-fns/locale';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dic.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

// Función para transformar la respuesta del API al formato esperado por AgendaList
const transformRoutineHistoryToAgendaItems = routineHistory => {
  if (!routineHistory || routineHistory.length === 0) {
    return [];
  }

  // Agrupar por fecha (YYYY-MM-DD)
  const groupedByDate = {};

  routineHistory.forEach(item => {
    const date = new Date(item.date);
    const dateString = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    if (!groupedByDate[dateString]) {
      groupedByDate[dateString] = [];
    }

    // Formatear la hora a partir de la fecha
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const formattedHour = `${hour}:${minutes < 10 ? '0' + minutes : minutes}`;

    groupedByDate[dateString].push({
      hour: formattedHour,
      duration: `${Math.round(item.timeSpent / 60)}h`, // Convertir segundos a horas
      title: item.routineName,
      notes: item.notes,
      caloriesBurned: item.caloriesBurned,
      id: item.id,
      originalItem: item, // Mantener el objeto original para referencia
    });
  });

  // Transformar al formato esperado por AgendaList
  return Object.keys(groupedByDate).map(date => ({
    title: date,
    data: groupedByDate[date],
  }));
};

// Función para generar los días marcados en el calendario
const generateMarkedDates = agendaItems => {
  const marked = {};

  agendaItems.forEach(item => {
    // Marcar fechas que tienen datos
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = {marked: true, dotColor: COLORS.dark.primary};
    }
  });

  return marked;
};

const CalendarChamp = props => {
  const {weekView} = props;
  const today = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // getMonth() devuelve 0-11
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const {data: routineHistory, isLoading} = useGetRoutineHistory(
    currentMonth,
    currentYear,
  );

  const [agendaItems, setAgendaItems] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    if (routineHistory) {
      const transformedItems =
        transformRoutineHistoryToAgendaItems(routineHistory);
      setAgendaItems(transformedItems);
      setMarkedDates(generateMarkedDates(transformedItems));
    }
  }, [routineHistory]);

  const onDateChanged = useCallback(
    date => {
      setCurrentDate(date);
      const selectedDate = new Date(date);
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();

      if (month !== currentMonth || year !== currentYear) {
        setCurrentMonth(month);
        setCurrentYear(year);
      }
    },
    [currentMonth, currentYear],
  );

  const renderItem = useCallback(({item}) => {
    return <AgendaItem item={item} />;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.dark.primary} />
        <Text style={styles.loadingText}>Cargando tu historial...</Text>
      </View>
    );
  }

  return (
    <CalendarProvider
      style={{height: '100%'}}
      date={currentDate}
      showTodayButton
      todayButtonStyle={{
        backgroundColor: COLORS.dark.primary,
      }}
      onDateChanged={onDateChanged}>
      {weekView ? (
        <WeekCalendar
          testID={testiDs.weekCalendar.CONTAINER}
          theme={{
            monthTextColor: '#fff',
            calendarBackground: COLORS.dark.background,
            selectedDayBackgroundColor: COLORS.dark.primary,
            todayTextColor: '#fff',
            selectedDotColor: COLORS.dark.primary,
            textDisabledColor: COLORS.dark.textWhite,
          }}
          firstDay={1}
          markedDates={markedDates}
        />
      ) : (
        <ExpandableCalendar
          testID={testiDs.expandableCalendar.CONTAINER}
          firstDay={1}
          markedDates={markedDates}
          theme={{
            monthTextColor: '#fff',
            arrowColor: '#fff',
            textMonthFontSize: 16,
            calendarBackground: COLORS.dark.background,
            selectedDayBackgroundColor: COLORS.dark.primary,
            todayTextColor: '#fff',
            selectedDotColor: COLORS.dark.primary,
            textDisabledColor: COLORS.dark.textWhite,
          }}
        />
      )}
      {agendaItems.length > 0 ? (
        <AgendaList
          sections={agendaItems}
          renderItem={renderItem}
          sectionStyle={styles.section}
          contentContainerStyle={{
            backgroundColor: COLORS.dark.background,
            marginTop: 20,
            marginBottom: 180,
          }}
          dayFormat="yyyy/MM/d"
          renderSectionHeader={(day, item) => {
            return (
              <View
                style={{
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: COLORS.dark.textPrimary,
                    fontWeight: 500,
                    fontSize: 16,
                    textTransform: 'capitalize',
                  }}>
                  {formatInTimeZone(
                    day,
                    'America/Argentina/Buenos_Aires',
                    'EEEE dd MMMM',
                    {
                      locale: es,
                    },
                  )}
                </Text>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No hay rutinas completadas en este mes
          </Text>
        </View>
      )}
    </CalendarProvider>
  );
};

export default CalendarChamp;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: 'lightgrey',
  },
  section: {
    color: 'grey',
    textTransform: 'capitalize',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark.background,
  },
  loadingText: {
    color: COLORS.dark.textWhite,
    marginTop: 10,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark.background,
    paddingVertical: 50,
  },
  emptyText: {
    color: COLORS.dark.textWhite,
    fontSize: 16,
    textAlign: 'center',
  },
});
