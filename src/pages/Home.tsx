import { useState } from "@/lib/dom";

const HomePage = () => {
  const [firstCount, setFirstCount] = useState(0);
  const [secondCount, setSecondCount] = useState(1);
  const handleIncreaseClick = () => {
    setFirstCount(firstCount + 1);
  };
  const handleIncreaseClick2 = () => {
    setSecondCount(secondCount + 1);
  };

  return (
    <div>
      <span>
        {firstCount}/{secondCount}
      </span>
      <button onclick={handleIncreaseClick}>클릭</button>
      <button onclick={handleIncreaseClick2}>클릭</button>
    </div>
  );
};

export default HomePage;
