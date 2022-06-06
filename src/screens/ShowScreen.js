//Import des modules pour la paage de détails
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold
} from "@expo-google-fonts/nunito";
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";

//Import des modules de Firebase
import { collection, onSnapshot } from "firebase/firestore";

//import InteractiveChart from "./Chart2"
//import Chart from "./Chart"

//Import de la config de la base de données
import { auth, database } from "../firebase/config";

export default function ShowScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold
  });

  //Import des données par route de l'autre page (id du médicament)
  const { id } = route.params;

  const [loading, setLoading] = useState(true);
  const [medWeightDate, setmedWeightDate] = useState([]);
  const [medWeight, setmedWeight] = useState([]);
  const [medQteDate, setmedQteDate] = useState([]);
  const [medQteQte, setmedQteQte] = useState([]);
  const [medName, setMedName] = useState();

  let [posWeight, setPosWeight] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0
  });
  let [posQte, setPosQte] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0
  });

  //Recupérer l'utilisateur
  const uid = auth.currentUser.uid;

  //Lire le nom du médicament
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, uid),
      (querySnapshot) => {
        var medName;
        querySnapshot.forEach(
          (doc) => {
            if (doc.id == id) {
              medName = doc.data().name;
            }
          },
          function (error) {
            console.log(error);
          }
        );
        setLoading(false);
        setMedName(medName);
      }
    );
    return () => unsubscribe();
  }, []);

  //Lire les données de poids
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, uid, id, "weight"),
      (querySnapshot) => {
        const medWeightDate = [];
        const medWeight = [];
        querySnapshot.forEach(
          (doc) => {
            medWeightDate.push(doc.data().date);
            medWeight.push(doc.data().weight);
          },
          function (error) {
            console.log(error);
          }
        );
        setLoading(false);
        setmedWeight(medWeight);
        setmedWeightDate(medWeightDate);
      }
    );
    return () => unsubscribe();
  }, []);

  if (medWeightDate.length >= 2 && medWeight.length >= 2) {
    var weight = {
      labels: medWeightDate,
      datasets: [
        {
          data: medWeight,
          color: (opacity = 1) => `rgba(89, 110, 121, ${opacity})`
        }
      ]
    };
  } else {
    var weight = {
      labels: ["Ajouter", "2", "valeurs"],
      datasets: [
        {
          data: ["1", "2", "3"]
        }
      ]
    };
  }

  //Lire les données de nourriture
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, uid, id, "Qte"),
      (querySnapshot) => {
        const medQteDate = [];
        const medQteQte = [];
        querySnapshot.forEach(
          (doc) => {
            medQteDate.push(doc.data().date);
            medQteQte.push(doc.data().quantity);
          },
          function (error) {
            console.log(error);
          }
        );
        setLoading(false);
        setmedQteDate(medQteDate);
        setmedQteQte(medQteQte);
      }
    );
    return () => unsubscribe();
  }, []);

  if (medQteQte.length >= 2 && medQteDate.length >= 2) {
    var Qte = {
      labels: medQteDate,
      datasets: [
        {
          data: medQteQte,
          color: (opacity = 1) => `rgba(89, 110, 121, ${opacity})`
        }
      ]
    };
  } else {
    var Qte = {
      labels: ["Ajouter", "2", "valeurs"],
      datasets: [
        {
          data: ["1", "2", "3"]
        }
      ]
    };
  }

  //Configuration Affichage graphs
  const chartConfig = {
    backgroundGradientFrom: "#DFD3C3",
    backgroundGradientTo: "#DFD3C3",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  };

  //Affichage des éléments la page
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Détail de {medName}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Modifier", { id })}
        >
          <Text style={styles.buttonTitle}>Modifier</Text>
        </TouchableOpacity>
        <View style={styles.item}>
          <View style={styles.itemTop}>
            <Text style={styles.itemName}>Poids </Text>
            <TouchableOpacity
              style={styles.itemButtonWeight}
              onPress={() =>
                navigation.navigate("Historique", { id, addType: "weight" })
              }
            >
              <Text style={styles.itemButtonTitle}>Ajouter</Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={weight}
            width={280}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={{
              fontFamily: "Nunito_400Regular"
            }}
            yAxisSuffix={" kg"}
            decorator={() => {
              return posWeight.visible ? (
                <View>
                  <Svg>
                    <Rect
                      x={posWeight.x - 18}
                      y={posWeight.y - 18}
                      width="35"
                      height="25"
                      rx={10}
                      fill="#596E79"
                    />
                    <TextSVG
                      x={posWeight.x}
                      y={posWeight.y}
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {posWeight.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
                posWeight.x === data.x && posWeight.y === data.y;

              isSamePoint
                ? setPosWeight((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible
                    };
                  })
                : setPosWeight({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true
                  });
            }}
          />
        </View>
        <View style={styles.item}>
          <View style={styles.itemTop}>
            <Text style={styles.itemName}>Doses </Text>
            <TouchableOpacity
              style={styles.itemButtonQte}
              onPress={() =>
                navigation.navigate("Historique", { id, addType: "Qte" })
              }
            >
              <Text style={styles.itemButtonTitle}>Ajouter</Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={Qte}
            width={280}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={{
              fontFamily: "Nunito_400Regular"
            }}
            yAxisSuffix={" g"}
            decorator={() => {
              return posQte.visible ? (
                <View>
                  <Svg>
                    <Rect
                      x={posQte.x - 18}
                      y={posQte.y - 18}
                      width="35"
                      height="25"
                      rx={10}
                      fill="#596E79"
                    />
                    <TextSVG
                      x={posQte.x}
                      y={posQte.y}
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {posQte.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint = posQte.x === data.x && posQte.y === data.y;

              isSamePoint
                ? setPosQte((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible
                    };
                  })
                : setPosQte({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true
                  });
            }}
          />
        </View>
      </View>
    );
  }
}
