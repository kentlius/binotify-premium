import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateSong } from "../songs";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateSong(params.songId, updates);
  return redirect(`/songs/${params.songId}`);
}

export default function EditSong() {
  const song = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="song-form">
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
        <span>Audio Path</span>
        <input
          placeholder="./audio"
          aria-label="audio Path"
          type="text"
          name="audio_path"
          defaultValue={song.audio_path}
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
