import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import toast from "react-hot-toast";

function CharacterDetail({ selectedId, onAddFavourite, isAddToFavourite }) {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [isCharacterLoading, setIsCharacterLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsCharacterLoading(true);
        // setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodesData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodesData].flat());
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsCharacterLoading(false);
      }
    }
    if (selectedId) {
      fetchData();
    }
  }, [selectedId]);

  if (isCharacterLoading) {
    return (
      <div className="name">
        <Loader />
      </div>
    );
  }

  if (!character || !selectedId) {
    return <div className="name">select a character</div>;
  }

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />
        <div className="character-detail__info">
          <h3 className="name">
            {" "}
            <span>{character.gender === "Male" ? "👨" : "👩"}</span>
            <span> {character.name}</span>
          </h3>
          <div className="info">
            <span
              className={`status ${character.status === "Dead" ? "red" : ""}`}
            ></span>
            <span> {character.status} </span>
            <span>- {character.species}</span>
          </div>
          <div className="location">
            <p>Last known location</p>
            <p>{character.location.name}</p>
          </div>
          <div className="actions">
            {isAddToFavourite ? (
              <p>✅Already added</p>
            ) : (
              <button
                onClick={() => onAddFavourite(character)}
                className="btn btn--primary"
              >
                Add to favorite
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="character-episodes">
        <div className="title">
          <h2>List pf episodes</h2>
          <button className="icon">
            <ArrowUpCircleIcon />
          </button>
        </div>
        <ul>
          {episodes.map((episode, index) => (
            <li key={episode.id}>
              <div>
                {String(index + 1).padStart(2, "0")} - {episode.episode} :
                <strong>{episode.name}</strong>
              </div>
              <div className="badge badge--secondary">{episode.air_date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
