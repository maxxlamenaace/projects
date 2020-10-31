import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import CartItem from "./CartItem";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>
          ${props.orderItem.totalAmount.toFixed(2)}
        </Text>
        <Text style={styles.date}>{props.orderItem.readableDate}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.orderItem.items.map((cartItem) => (
            <CartItem key={cartItem.productId} item={cartItem} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
