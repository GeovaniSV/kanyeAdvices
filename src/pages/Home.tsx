import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
  Image,
} from "react-native";

//apps
import { appAdvice, kanyeApp } from "../services/api";

//photos
import Kanye1 from "../../assets/kanye1.jpeg";
import Kanye2 from "../../assets/kanye2.jpeg";
import Kanye3 from "../../assets/kanye3.jpeg";
import Kanye4 from "../../assets/kanye4.jpeg";
import Kanye5 from "../../assets/kanye5.jpeg";
import Kanye6 from "../../assets/kanye6.jpeg";
import Kanye7 from "../../assets/kanye7.jpeg";
import axios from "axios";

const kanyeMap = [
  {
    id: 1,
    photo: Kanye1,
  },
  {
    id: 2,
    photo: Kanye2,
  },
  {
    id: 3,
    photo: Kanye3,
  },
  {
    id: 4,
    photo: Kanye4,
  },
  {
    id: 5,
    photo: Kanye5,
  },
  {
    id: 6,
    photo: Kanye6,
  },
  {
    id: 7,
    photo: Kanye7,
  },
];

interface IAdvice {
  id: number;
  advice: string;
}

interface IKanye {
  quote: string;
}

export default function Home() {
  const [IsAdviceLoading, setIsAdviceLoading] = useState(false);
  const [IsKanyeLoading, setIsKanyeLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Advice, setAdvice] = useState<IAdvice>();
  const [KanyeQuotes, setKanyeQuotes] = useState<IKanye>();
  const [kanyePhoto, setKanyePhoto] = useState();

  const getAdvice = async () => {
    setIsAdviceLoading(true);
    try {
      const advice = await appAdvice.get(`/advice?${Date.now()}`);
      setAdvice(advice.data.slip);
      setIsAdviceLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getKanyeQuotes = async () => {
    setIsKanyeLoading(true);
    try {
      const quotes = await kanyeApp.get("/");
      setKanyeQuotes(quotes.data);
      setIsKanyeLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActiveModal = () => {
    setVisible(true);
    getKanyeQuotes();
    randomizeKanyeWest();
  };

  const randomizeKanyeWest = () => {
    const random = Math.floor(Math.random() * 7) + 1;
    console.log(random);
    const findKanye = kanyeMap.find((kanye) => {
      if (kanye.id == random) return kanye;
    });

    setKanyePhoto(findKanye?.photo);
  };

  useEffect(() => {
    getAdvice();
    randomizeKanyeWest();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Kanye thougth's</Text>
            {IsKanyeLoading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.txt}>{KanyeQuotes?.quote}</Text>
            )}

            <Button title="Close" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
      <View style={styles.firstSection}>
        <Text style={styles.title}>Take an advice</Text>
        <View style={styles.Advice}>
          <Text style={styles.txt}>
            {IsAdviceLoading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.txt}>{Advice?.advice}</Text>
            )}
          </Text>
        </View>
        <Button title="Change Advice" onPress={getAdvice} />

        <Text style={styles.title}>What Kanye West think about it?</Text>
        <Button
          title="MKTA: Make Kanye Thing Again"
          onPress={handleActiveModal}
        />
        <Image source={kanyePhoto} />
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
    gap: 35,
    width: "100%",
    padding: 10,
  },

  Advice: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    minHeight: 70,
    borderRadius: 35,
    padding: 10,
    elevation: 4, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  txt: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },

  closeButton: {
    marginTop: 10,
    backgroundColor: "#f44336",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
});
