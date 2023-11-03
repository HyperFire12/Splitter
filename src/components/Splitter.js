import * as React from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const Splitter = () => {
  const [numofPpl, setNumofPpl] = useState(1);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [tips, setTips] = useState(0);
  const [coupon, setCoupon] = useState(0);
  const [listOfPeople, setListOfPeople] = useState([]);
  const [showPeople, setShowPeople] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [numOfItems, setNumOfItems] = useState(0);

  const textfields = [
    {
      name: "Number of People",
      setValue: setNumofPpl,
    },
    {
      name: "Discount Percentage",
      setValue: setDiscountPercentage,
    },
    {
      name: "Delivery Fee",
      setValue: setDeliveryFee,
    },
    {
      name: "Service Fee",
      setValue: setServiceFee,
    },
    {
      name: "Tips",
      setValue: setTips,
    },
    {
      name: "Coupon",
      setValue: setCoupon,
    },
  ];

  const textfieldItems = textfields.map((item, index) => (
    <Box
      key={item.name}
      sx={{
        width: "500px",
        display: "flex",
        justifyContent: "space-between",
        mb: "10px",
      }}
    >
      <Typography>{item.name}</Typography>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{
            fontSize: "32px",
            mr: "5px",
            color: index === 0 || index === 1 ? "transparent" : "black",
          }}
        >
          $
        </Typography>
        <TextField
          onChange={(e) => {
            setShowPeople(false);
            let val;
            if (e.target.value === "") {
              val = 0;
            } else {
              val = parseFloat(e.target.value);
            }
            if ((val <= 0 || isNaN(val)) && index === 0) {
              item.setValue(1);
            } else {
              if (!isNaN(val)) {
                item.setValue(val);
              }
            }
          }}
        />
        <Typography
          sx={{
            fontSize: "32px",
            ml: "5px",
            color: index === 1 ? "black" : "transparent",
          }}
        >
          %
        </Typography>
      </Box>
    </Box>
  ));

  const people = () => {
    const handlePersonChange = (index, field, value, field2, value2) => {
      const updatedPeople = [...listOfPeople];
      updatedPeople[index] = {
        ...updatedPeople[index],
        [field]: value,
        [field2]: value2,
      };
      setListOfPeople(updatedPeople);
    };
    const rows = [];
    if (numofPpl < 11) {
      for (let i = 0; i < numofPpl; i++) {
        rows.push(
          <Box
            key={i}
            sx={{
              width: "500px",
              display: "flex",
              justifyContent: "space-between",
              mb: "10px",
            }}
          >
            <TextField
              label="Name"
              onChange={(e) => {
                setShowPeople(false);
                handlePersonChange(i, "name", e.target.value);
              }}
            />
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ fontSize: "32px", mr: "5px" }}>$</Typography>
              <TextField
                label="Ordered Items"
                onChange={(e) => {
                  setShowPeople(false);
                  let val = e.target.value.split(",");
                  let x = 0;
                  let items = 0;
                  for (let i = 0; i < val.length; i++) {
                    let vals = parseFloat(val[i]);
                    if (!isNaN(vals)) {
                      x += parseFloat(val[i]);
                      items++;
                    }
                  }
                  x *= 1.13;
                  handlePersonChange(i, "subtotal", x, "items", items);
                }}
              />
            </Box>
          </Box>
        );
      }
    } else {
      for (let i = 0; i < 11; i++) {
        rows.push(
          <Box
            key={i}
            sx={{
              width: "500px",
              display: "flex",
              justifyContent: "space-between",
              mb: "10px",
            }}
          >
            <TextField
              label="Name"
              onChange={(e) => {
                setShowPeople(false);
                handlePersonChange(i, "name", e.target.value);
              }}
            />
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ fontSize: "32px", mr: "5px" }}>$</Typography>
              <TextField
                label="Ordered Items"
                onChange={(e) => {
                  setShowPeople(false);
                  let val = e.target.value.split(",");
                  let x = 0;
                  let items = 0;
                  for (let i = 0; i < val.length; i++) {
                    let vals = parseFloat(val[i]);
                    if (!isNaN(vals)) {
                      x += parseFloat(val[i]);
                      items++;
                    }
                  }
                  x *= 1.13;
                  handlePersonChange(i, "subtotal", x, "items", items);
                }}
              />
            </Box>
          </Box>
        );
      }
    }
    return rows;
  };

  const submitHandler = () => {
    const updatedPeople = [...listOfPeople];
    const handleTotalChange = (index, field, value) => {
      updatedPeople[index] = { ...updatedPeople[index], [field]: value };
    };
    let amt = 0;
    let items = 0;
    for (let i = 0; i < listOfPeople.length; i++) {
      amt +=
        (deliveryFee + serviceFee + tips - coupon) / numofPpl +
        listOfPeople[i].subtotal * (1 - discountPercentage / 100);
      items += listOfPeople[i].items;
      handleTotalChange(
        i,
        "total",
        (
          (deliveryFee + serviceFee + tips - coupon) / numofPpl +
          listOfPeople[i].subtotal * (1 - discountPercentage / 100)
        ).toFixed(2)
      );
    }
    setTotalAmount(amt.toFixed(2));
    setNumOfItems(items);
    setListOfPeople(updatedPeople);
    setShowPeople(true);
  };

  const result = () => {
    const rows = [];
    for (let i = 0; i < listOfPeople.length; i++) {
      rows.push(
        <Box
          key={i}
          sx={{
            width: "500px",
            display: "flex",
            justifyContent: "space-between",
            mb: "10px",
          }}
        >
          <Typography>{listOfPeople[i].name}</Typography>
          <Typography>${listOfPeople[i].total}</Typography>
        </Box>
      );
    }

    return rows;
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", m: "20px", p: "20px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>{textfieldItems}</Box>
        <Box>{people()}</Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={submitHandler} variant="outlined">
          Submit
        </Button>
      </Box>
      {showPeople ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {result()}
          <Typography>Number of Items: {numOfItems}</Typography>
          <Typography>Total Amount: ${totalAmount}</Typography>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default Splitter;
