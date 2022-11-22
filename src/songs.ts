import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getSongs(query) {
  await fakeNetwork(`getSongs:${query}`);
  let songs = await fetch("http://localhost:3000/songs").then((response) =>
    response.json()
  );
  if (!songs) songs = [];
  if (query) {
    songs = matchSorter(songs, query, { keys: ["judul"] });
  }
  return songs.sort(sortBy("judul"));
}

export async function createSong() {
  await fakeNetwork();
  let song = await fetch("http://localhost:3000/songs", {
    method: "POST",
    body: JSON.stringify({
      judul: "Sample Song",
      penyanyi_id: 2,
      audio_path: "./audio/sample_song.mp3",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
  return song;
}

export async function getSong(id) {
  await fakeNetwork(`song:${id}`);
  let song = await fetch(`http://localhost:3000/songs/${id}`).then((response) =>
    response.json()
  );
  return song ?? null;
}

export async function updateSong(id, updates) {
  await fakeNetwork();
  await fetch(`http://localhost:3000/songs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
}

export async function deleteSong(id) {
  await fetch(`http://localhost:3000/songs/${id}`, {
    method: "DELETE",
  });
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
