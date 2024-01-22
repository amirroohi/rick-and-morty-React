import { ArrowRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

function CharacterList({
  characters,
  isLoading,
  onSelectCharacter,
  selectedId,
}) {
  if (isLoading) {
    return (
      <div className="characters-list name">
        <Loader />
      </div>
    );
  }
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character
          key={item.id}
          item={item}
          onSelectCharacter={onSelectCharacter}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({ item, onSelectCharacter, selectedId }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />
      <button className="icon red" onClick={() => onSelectCharacter(item.id)}>
        {selectedId === item.id ? <ArrowRightIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👨" : "👩"}</span>
      <span> {item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span> {item.status} </span>
      <span>- {item.species}</span>
    </div>
  );
}
