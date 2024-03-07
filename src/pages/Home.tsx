import { useState } from "@/lib/dom";

const HomePage = () => {
  const [count, setCount] = useState(1);
  const handleIncreaseClick = () => {
    setCount(count + 1);
    console.log("count : ", count); // count : 0
  };
  return (
    <div>
      <span>{count}</span>
      <button onclick={handleIncreaseClick}>클릭</button>
    </div>
  );
};

export default HomePage;
