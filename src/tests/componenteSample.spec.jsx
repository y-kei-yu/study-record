import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Title Test", () => {
  it("タイトルが学習記録一覧アプリであること", async () => {
    //testId(title)を指定して取得
    render(<App />);
    const title = await screen.findByTestId("title");
    expect(title).toHaveTextContent("学習記録一覧アプリ");
  });
});

describe("データ追加テスト", () => {
  it("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている数が1つ増えていること", async () => {
    render(<App />);

    // userEventをセットアップ
    const user = userEvent.setup();

    //初期表示のデータ件数
    const beforeList = await screen.findAllByTestId("list");
    const beforeListCount = beforeList.length;

    //学習内容入力
    await user.type(screen.getByTestId("studyContent"), "test99");

    //学習時間入力
    await user.type(screen.getByTestId("studyTime"), "5");

    //登録ボタン入力
    const registerButton = screen.getByRole("button", { name: "登録" });
    await user.click(registerButton);

    //リストが更新されるのを待つ
    await waitFor(() => {
      const afterList = screen.getAllByTestId("list");
      const afterListCount = afterList.length;
      expect(afterListCount).toBe(beforeListCount + 1);
    });
  });
});
