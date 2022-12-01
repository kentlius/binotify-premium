import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getSongs, createSong } from "../songs";
import { useEffect } from "react";
import { getUser, logout } from "../users";
import { useState } from "react";
export async function action() {
  const song = await createSong();
  return redirect(`/songs/${song.song_id}/edit`);
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const user = await getUser();
  const q = url.searchParams.get("q");
  const songs = await getSongs(q);
  return { songs, q, user};
}

export default function Root() {
  const { songs, q, user } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <NavLink to="/" id="header">
          Binotify Premium
        </NavLink>
        <nav>
          {songs.length ? (
            <ul>
              {songs.map((song) => (
                <li key={song.song_id}>
                  <NavLink
                    to={`songs/${song.song_id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {song.judul ? <>{song.judul}</> : <i>No Name</i>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No songs</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
      <div className="navbar">
        <div className="left">
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search songs"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <div style={{ marginLeft: "10px" }}>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
        </div>
        <div className="rightSide">
          <p> Hi {user}!</p>
          <NavLink style={{ marginLeft: "10px", marginRight:"10px" }} to="/login" onClick={logout}>
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
}
