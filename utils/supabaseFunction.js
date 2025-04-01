import { supabase } from "./supabase";

export const getAllRecords = async () => {
  const records = await supabase.from("study-record").select("*");
  return records.data;
};

export const addRecord = async (title, time) => {
  await supabase
    .from("study-record")
    .insert({ title, time })
    .select()
}

export const deleteRecord = async (id) => {
  await supabase.from("study-record").delete().eq("id", id)
}