import {
  getByLabelText,
  getByRole,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "../App";
import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Title Test", () => {
  it("タイトルが学習記録アプリであること", async () => {
    //testId(title)を指定して取得
    render(<App />);
    const title = await screen.findByTestId("title");
    expect(title).toHaveTextContent("学習記録アプリ");
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
    await user.type(screen.getByTestId("studyContent"), "自動テスト");

    //学習時間入力
    await user.type(screen.getByTestId("studyTime"), "5");

    //登録ボタン押下
    const registerButton = screen.getByRole("button", { name: "登録" });
    await user.click(registerButton);

    //リストが更新されるのを待つ
    await waitFor(
      () => {
        const afterList = screen.getAllByTestId("list");
        const afterListCount = afterList.length;
        expect(afterListCount).toBe(beforeListCount + 1);
      },
      { timeout: 2000 }
    );
  });
});

describe("データ削除テスト", () => {
  it("削除ボタンを押すと学習記録が削除されて数が1つ減っていること", async () => {
    render(<App />);

    //useEventをセットアップ
    const user = userEvent.setup();

    //初期表示データのデータ件数
    const beforeList = await screen.findAllByTestId("list");
    const beforeListCount = beforeList.length;

    //最後のリスト項目を取得し、その中から削除ボタンを見つける
    const lastListItem = beforeList[beforeList.length - 1];
    const deleteButton = within(lastListItem).getByRole("button", {
      name: "削除",
    });
    await user.click(deleteButton);

    //リストが更新されるのを待つ
    await waitFor(
      () => {
        const afterList = screen.getAllByTestId("list");
        const afterListCount = afterList.length;
        expect(afterListCount).toBe(beforeListCount - 1);
      },
      { timeout: 2000 }
    );
  });
});

describe("未入力テスト", () => {
  it("入力をしないで登録を押すとエラーが表示されること", async () => {
    render(<App />);

    //useEventをセットアップ
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.queryByText("ロード中")).not.toBeInTheDocument();
    });

    //学習内容入力
    await user.clear(screen.getByTestId("studyContent"));

    //学習時間入力
    await user.clear(screen.getByTestId("studyTime"));

    //登録ボタン押下
    const registerButton = screen.getByRole("button", { name: "登録" });
    await user.click(registerButton);

    await waitFor(() => {
      const error = screen.getByTestId("errorMessage");
      expect(error).toBeInTheDocument();
    });
  });
});
