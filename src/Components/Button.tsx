import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import clsx from "clsx";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className={clsx(
        "m-1 p-6 flex-1 items-center justify-center bg-gray-900 rounded-full",
        {
          ["bg-purple-900"]: /x|\+|\/|-/.test(title) && title !== "+-",
          ["bg-purple-500"]: title === "=",
        }
      )}
    >
      <Text
        className={clsx("font-regular text-2xl text-gray-100", {
          ["text-purple-500"]: title === "CE",
        })}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
