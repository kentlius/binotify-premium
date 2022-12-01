import { Form, useLoaderData } from "react-router-dom";
import { getSong } from "../func/songs";

export async function loader({ params }) {
  const song = await getSong(params.songId);
  if (!song) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return song;
}

export default function Song() {
  const song = useLoaderData();

  return (
    <div id="song">
      <div>
        <h1>{song.judul ? <>{song.judul}</> : <i>No Name</i>}</h1>
        {song.audio_path && <p>{song.audio_path}</p>}
        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this song.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
