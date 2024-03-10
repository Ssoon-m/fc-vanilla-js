import { useEffect, useState } from "@/lib/dom";

const HomePage = () => {
  const [value, setValue] = useState(0);
  console.log("1");
  useEffect(() => {
    setValue(2);
    console.log("2");
  }, [value]);
  return <div>Hello World!</div>;
};

export default HomePage;
