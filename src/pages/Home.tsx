import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

//apps
import { appAdvice } from "../services/api";

interface IAdvice {
  id: number;
  advice: string;
}

export default function Home() {
  const [Advice, setAdvice] = useState<IAdvice>();
  const [isLoading, setIsLoading] = useState(false);

  const getAdvice = async () => {
    setIsLoading(true);
    try {
      const advice = await appAdvice.get("/advice");
      setAdvice(advice.data.slip);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdvice();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.firstSection}>
        <Text>Take an advice</Text>
        <View style={styles.Advice}>
          <Text>{isLoading ? "Loading..." : Advice?.advice}</Text>
        </View>
        <Button title="Change Advice" onPress={getAdvice} />
      </View>

      <View style={styles.secondSection}>
        <Text>Alo2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9e9e9",
    alignItems: "center",
    padding: 10,
  },

  firstSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    padding: 10,
  },

  Advice: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 35,
    borderRadius: 35,
    padding: 35,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },

  secondSection: {
    flex: 1,
    width: "100%",
  },
});
