import { redirect } from "react-router-dom";
import { deleteSong } from "../func/songs";

export async function action({ params }) {
  // throw new Error("oh dang!");
  await deleteSong(params.songId);
  return redirect("/");
}
