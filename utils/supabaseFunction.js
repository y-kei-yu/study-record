import { supabase } from "./supabase";

//取得
export const getAllRecords = async () => {
  const records = await supabase.from("study-record").select("*");
  return records.data;
};

//追加
export const addRecord = async (title, time) => {
  await supabase
    .from("study-record")
    .insert({ title, time })
    .select()
}

//削除
export const deleteRecord = async (id) => {
  await supabase.from("study-record").delete().eq("id", id)
}