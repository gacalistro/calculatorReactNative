import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Equals } from "phosphor-react-native";
import { Button } from "../Components/Button";

export function Home() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(0);

  const [firstValue, setFirstValue] = useState<number | string>("");
  const [secondValue, setSecondValue] = useState<number | string>("");
  const [operator, setOperator] = useState("");

  const buttonValues = [
    ["CE", "C", "%", "/"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    ["+-", 0, ",", "="],
  ];

  const operationsRegex = /\+|\-|\/|x/;

  function action(value: string | number) {
    const lastElement = expression.slice(-1);
    const isLastElementAnOperator = operationsRegex.test(lastElement);

    if (typeof value === "number") {
      return addNumber(value);
    }

    if (
      operationsRegex.test(value) &&
      value !== "+-" &&
      (firstValue !== "" || result !== 0)
    ) {
      if (isLastElementAnOperator) {
        if (lastElement !== value) {
          clearLastElement();
        } else {
          return;
        }
      }

      addOperator(value);
    }

    switch (value) {
      case "CE": {
        if (isLastElementAnOperator) {
          setOperator("");
        }
        clearLastElement();
        break;
      }
      case "C": {
        clearAll();
        break;
      }
      case "%": {
        percent();
        break;
      }
      case "=": {
        equals();
        break;
      }
      case ",": {
        addDecimal();
        break;
      }
      case "+-": {
        invertValue();
        break;
      }
    }
  }

  function calculateExpression() {
    if (operator === "/" && secondValue === 0) {
      return 0;
    }

    return Math.round(eval(expression.trim().replace("x", "*")) * 100) / 100;
  }

  function addNumber(value: number) {
    if (result !== 0 && firstValue === "") {
      setResult(0);
    }

    const lastElement = expression.slice(-1);
    const zeroAfterOperator =
      operationsRegex.test(expression.slice(-2, -1)) && lastElement === "0";

    if (lastElement === "0" && value === 0) {
      return;
    }

    if (!expression || zeroAfterOperator) {
      clearLastElement();
    }

    !operator
      ? setFirstValue((prevState) =>
          !prevState ? value : Number(`${prevState}${value}`)
        )
      : setSecondValue((prevState) =>
          !prevState ? value : Number(`${prevState}${value}`)
        );
  }

  function addOperator(value: string) {
    if (firstValue === ".") {
      setFirstValue(0);
    }

    if (operator && secondValue) {
      setFirstValue(calculateExpression());
      setSecondValue("");
      setResult(calculateExpression());
    }

    setOperator(value);

    if (result !== 0 && !firstValue) {
      setFirstValue(result);
    }
  }

  function clearAll() {
    setFirstValue("");
    setSecondValue("");
    setOperator("");
    setResult(0);
  }

  function clearLastElement() {
    const negativeNumber =
      expression.trim().length === 2 && expression[0] === "-";

    if (!secondValue) {
      setOperator("");
    }

    if (operator) {
      setSecondValue((prevState) =>
        prevState.toString().length > 1
          ? Number(prevState.toString().slice(0, -1))
          : ""
      );
    } else {
      setFirstValue((prevState) =>
        prevState.toString().length > 1
          ? Number(prevState.toString().slice(0, -1))
          : ""
      );
    }

    if (expression.trim().length - 1 === 0 || negativeNumber) {
      setResult(0);
      setFirstValue("");
    }
  }

  function equals() {
    if (secondValue === "") {
      setResult(0);
    } else {
      setResult(calculateExpression());
    }

    setOperator("");
    setFirstValue("");
    setSecondValue("");
  }

  function invertValue() {
    if (!firstValue && result) {
      setFirstValue(result * -1);
      setResult(0);
      return;
    }

    if (!operator) {
      if (firstValue === 0 || firstValue === "") {
        return;
      }

      setFirstValue((prevState) => +prevState * -1);
    } else {
      if (secondValue === 0 || secondValue === "") {
        return;
      }

      setSecondValue((prevState) => +prevState * -1);
    }
  }

  function percent() {
    if (secondValue === "") {
      return;
    }
    setSecondValue((+firstValue * +secondValue) / 100);
  }

  function addDecimal() {
    if (secondValue === "") {
      if (!firstValue.toString().includes(".")) {
        setFirstValue((prevState) => `${prevState}.`);
      }
    } else {
      if (!secondValue.toString().includes(".")) {
        setSecondValue((prevState) => `${prevState}.`);
      }
    }
  }

  useEffect(() => {
    setExpression(
      `${firstValue !== "" ? firstValue : ""} ${operator} ${
        operator ? secondValue : ""
      }`
    );
  }, [firstValue, operator, secondValue]);

  return (
    <View className="flex-1 items-center justify-center bg-background px-8">
      <View className="flex-row pl-4 pr-5">
        <Text className="flex-1 font-regular text-xl text-right text-gray-500">
          {expression}
        </Text>
      </View>

      <View className="mt-2 pl-4 pr-5 flex-row items-center justify-center">
        <Equals size={26} color="#6B6B6B" />
        <Text className="flex-1 font-regular text-4xl text-right text-gray-100">
          {result}
        </Text>
      </View>

      <View className="w-screen mt-7 px-6">
        <FlatList
          data={buttonValues.flat()}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <Button title={item.toString()} onPress={() => action(item)} />
          )}
          numColumns={4}
        />
      </View>
    </View>
  );
}
