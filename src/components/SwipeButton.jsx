import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, PanResponder } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const SwipeButton = ({ buttonText, onRelease, invertColors })=> {
  const [backgroundColor, setBackgroundColor] = useState("#2B3074");
  const [textColor, setTextColor] = useState("white");
  const [position, setPosition] = useState(10);
  const [maxSwipeWidth, setMaxSwipeWidth] = useState(11);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setMaxSwipeWidth(width * 3.8); 
      });
    }
  }, [buttonRef.current]);

  const handleSwipe = (gestureState) => {
    if (gestureState.dx > 0) {
      let newPosition = Math.min(
        maxSwipeWidth,
        Math.max(10, position + (gestureState.dx || 0))
      );
      const newColor = `rgb(0, ${
        111 + 0 * (newPosition / maxSwipeWidth)
      }, 115),`;

      setBackgroundColor(newColor);
      setPosition(newPosition);

      if (buttonRef.current) {
        buttonRef.current.setNativeProps({
          style: { left: position },
        });
      }

      const newTextColor = gestureState.dx > 0 ? "#006F73" : "white";
      setTextColor(newTextColor);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      handleSwipe(gestureState);
    },
    onPanResponderRelease: async () => {
      if (onRelease) {
        onRelease();
      }
      reloadScreen();
    },
  });

  const reloadScreen = () => {
    setTimeout(() => {
      setBackgroundColor("#2B3074");
      setTextColor("white");
      setPosition(10);
    }, 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor, borderColor: invertColors ? 'white' : 'black' }]}>
      <Text style={{ ...styles.placeholderText, color: textColor }}>
        {buttonText || "Arraste para a direita!"}
      </Text>
      <View
        style={{
          backgroundColor: invertColors ? 'black' : 'white',
          width: "20%",
          height: "75%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
          flexDirection: "row",
          position: "absolute",
          left: position,
          borderColor: invertColors ? 'white' : 'black',
        }}
        {...panResponder.panHandlers}
        ref={buttonRef}>
        <Text style={{ color: textColor }}>
          {position >= maxSwipeWidth ? (
            <MaterialIcons name="verified" size={24} color={invertColors ? '#006F73' : '#2B3074'} />
          ) : (
            <AntDesign name="right" size={24} color={invertColors ? '#fff' : '#000'} />
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    marginLeft: "10%",
    margin: "10%",
    width: "80%",
    height: "10%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  placeholderText: {
    marginLeft: "25%",
    marginRight: "4%",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SwipeButton;
