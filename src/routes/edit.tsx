import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateSong, sendAudioFile } from "../songs";

export async function action({ request, params }) {
  const formData = await request.formData();
  await sendAudioFile(formData);
  formData.set("audio_path", `uploads/audio/${formData.get("audio_path").name}`);
  let updates = Object.fromEntries(formData);
  await updateSong(params.songId, updates);
  return redirect(`/songs/${params.songId}`);
}

export default function EditSong() {
  const song = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="song-form" encType="multipart/form-data">
      <label>
        <span>Judul</span>
        <input
          type="text"
          name="judul"
          placeholder="Judul Lagu"
          defaultValue={song.judul}
        />
      </label>
      <label>
        <span>Audio File</span>
        <input
          placeholder="./audio"
          aria-label="audio file"
          type="file"
          name="audio_path"
          accept="audio/*"
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
