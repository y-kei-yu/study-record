import { useState } from "react";

export default function App() {
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeTime = (event) => setTime(Number(event.target.value));

  const onClickAdd = () => {
    if (title.trim() === "" || time <= 0 || time === "") {
      setError("入力されていない項目があります");
      return;
    }
    const newRecords = [...records, { title, time }];
    setRecords(newRecords);

    const newTotalTime = newRecords.reduce(
      (accumulator, currentValue) => accumulator + currentValue.time,
      0
    );
    setTotalTime(newTotalTime);

    setTitle("");
    setTime("");
    setError("");
  };

  return (
    <div className="App">
      <h1>学習記録一覧</h1>
      <div>
        学習内容
        <input type="text" value={title} onChange={onChangeTitle} />
      </div>
      <div>
        学習時間
        <input type="number" value={time} onChange={onChangeTime} />
        時間
      </div>
      <div>入力されている学習内容：{title}</div>
      <div>入力されている時間：{time}時間</div>
      <button onClick={onClickAdd}>登録</button>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div>
        {records.map((record, index) => (
          <div key={index}>
            {record.title} {record.time}時間
          </div>
        ))}
      </div>
      <div>合計時間：{totalTime}/1000(h)</div>
    </div>
  );
}
