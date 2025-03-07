import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TriangleAlert as AlertTriangle, Clock, Filter } from 'lucide-react-native';

export default function AnomaliesScreen() {
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const anomalies = [
    {
      id: 1,
      machine: 'Industrial Robot B2',
      severity: 'high',
      score: 0.89,
      timestamp: '2024-02-20T14:30:00Z',
      description: 'Abnormal temperature spike detected',
      reading: '82°C',
      threshold: '65°C',
    },
    {
      id: 2,
      machine: 'CNC Machine A1',
      severity: 'medium',
      score: 0.65,
      timestamp: '2024-02-20T13:15:00Z',
      description: 'Unusual vibration pattern',
      reading: '4.7 Hz',
      threshold: '3.5 Hz',
    },
    {
      id: 3,
      machine: 'Assembly Line C3',
      severity: 'low',
      score: 0.45,
      timestamp: '2024-02-20T12:00:00Z',
      description: 'Minor pressure fluctuation',
      reading: '2.8 bar',
      threshold: '2.5 bar',
    },
  ].filter(anomaly => selectedSeverity === 'all' || anomaly.severity === selectedSeverity);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return '#666';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Anomalies</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterTabs}>
        {(['all', 'high', 'medium', 'low'] as const).map((severity) => (
          <TouchableOpacity
            key={severity}
            style={[
              styles.filterTab,
              selectedSeverity === severity && styles.filterTabActive,
              selectedSeverity === severity && { borderColor: getSeverityColor(severity) }
            ]}
            onPress={() => setSelectedSeverity(severity)}
          >
            <Text style={[
              styles.filterTabText,
              selectedSeverity === severity && { color: getSeverityColor(severity) }
            ]}>
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {anomalies.map((anomaly) => (
          <TouchableOpacity key={anomaly.id} style={styles.anomalyCard}>
            <View style={styles.cardHeader}>
              <View style={styles.severityContainer}>
                <AlertTriangle size={20} color={getSeverityColor(anomaly.severity)} />
                <Text style={[styles.severityText, { color: getSeverityColor(anomaly.severity) }]}>
                  {anomaly.severity.charAt(0).toUpperCase() + anomaly.severity.slice(1)} Severity
                </Text>
              </View>
              <View style={styles.timeContainer}>
                <Clock size={16} color="#666" />
                <Text style={styles.timestamp}>{formatTimestamp(anomaly.timestamp)}</Text>
              </View>
            </View>

            <Text style={styles.machineName}>{anomaly.machine}</Text>
            <Text style={styles.description}>{anomaly.description}</Text>

            <View style={styles.readings}>
              <View style={styles.reading}>
                <Text style={styles.readingLabel}>Current</Text>
                <Text style={styles.readingValue}>{anomaly.reading}</Text>
              </View>
              <View style={styles.reading}>
                <Text style={styles.readingLabel}>Threshold</Text>
                <Text style={styles.readingValue}>{anomaly.threshold}</Text>
              </View>
              <View style={styles.reading}>
                <Text style={styles.readingLabel}>Score</Text>
                <Text style={styles.readingValue}>{(anomaly.score * 100).toFixed(0)}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1a1a1a',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  filterTabText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  anomalyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  severityText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  machineName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  readings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  reading: {
    flex: 1,
  },
  readingLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  readingValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
  },
});