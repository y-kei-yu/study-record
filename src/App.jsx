import { useEffect, useState } from "react";
import {
  addRecord,
  deleteRecord,
  getAllRecords,
} from "../utils/supabaseFunction";

export default function App() {
  const [records, setRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeTime = (event) => setTime(Number(event.target.value));

  //データ取得
  const getRecords = async () => {
    try {
      setIsLoading(true);
      const allRecords = await getAllRecords();
      //console.log("supabase", allRecords);
      setRecords(allRecords);

      const initialTotalTime = allRecords.reduce(
        (accumulator, currentValue) => accumulator + currentValue.time,
        0
      );
      setTotalTime(initialTotalTime);
    } catch (error) {
      console.log("エラー", error);
      setError("エラー発生");
    } finally {
      setIsLoading(false);
    }
  };

  //画面初期表示
  useEffect(() => {
    getRecords();
  }, []);

  const onClickAdd = async () => {
    if (title.trim() === "" || time <= 0 || time === "") {
      setError("入力されていない項目があります");
      return;
    }
    //登録データを追加
    await addRecord(title, time);

    //データ取得
    getRecords();

    //初期化
    setTitle("");
    setTime("");
    setError("");
  };

  const onClickDelete = async (id) => {
    await deleteRecord(id);
    getRecords();
  };

  return (
    <>
      {isLoading ? (
        <h1>ロード中</h1>
      ) : (
        <div className="App">
          <h1 data-testid="title">学習記録一覧アプリ</h1>
          <div>
            学習内容
            <input
              data-testid="studyContent"
              type="text"
              value={title}
              onChange={onChangeTitle}
            />
          </div>
          <div>
            学習時間
            <input
              data-testid="studyTime"
              type="number"
              value={time}
              onChange={onChangeTime}
            />
            時間
          </div>
          <div>入力されている学習内容：{title}</div>
          <div>入力されている時間：{time}時間</div>
          <button onClick={onClickAdd}>登録</button>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <div>
            {records.map((record, index) => (
              <div key={index} data-testid="list">
                {record.title} {record.time}時間
                <button onClick={() => onClickDelete(record.id)}>削除</button>
              </div>
            ))}
          </div>
          <div>合計時間：{totalTime}/1000(h)</div>
        </div>
      )}
    </>
  );
}
