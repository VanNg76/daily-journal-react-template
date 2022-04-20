import React, { useEffect, useState } from "react";
import { Entry } from "./Entry";
import { searchEntries } from "./EntryManager";

export const EntryList = ({ moods, entries, tags, onEditButtonClick, onDeleteButtonClick }) => {

  const [filteredEntries, setEntries] = useState([]);
  const [searchedTerm, setTerm] = useState("");
  const [moodSelected, setMoodSelected] = useState(0);

  useEffect(() => {
    if (searchedTerm !== "") {
      searchEntries(searchedTerm).then(entriesData => setEntries(entriesData))
    } else {
      setEntries(entries)
    }
  }, [searchedTerm, entries])

  useEffect(() => {
    const filteredEntriesByMood = entries.filter(entry => entry.mood_id === moodSelected)
    setEntries(filteredEntriesByMood)
  }, [moodSelected])
  
  const filterAllEntries = (moodId) => {
    setMoodSelected(moodId)
  }


  return (
    <article className="panel is-primary">
      <h1 className="panel-heading">Entries</h1>
      <p className="panel-tabs">
        <a href="http://localhost:3000/entries" className={moodSelected === "" ? "is-active" : ""} onClick={(evt) => {
          evt.preventDefault()
          setEntries(entries)
          setMoodSelected("")
        }}>All</a>
        {
          moods.map(mood => {
            return <a href={`http://localhost:3000/entries?mood_id=${mood.id}`} key={mood.id}
              onClick={(evt) => {
                evt.preventDefault()
                filterAllEntries(mood.id)}
              }
              className={moodSelected === mood.id ? "is-active" : ""}
            >{mood.label}</a>
          })
        }
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input is-primary" type="text" placeholder="Search" onKeyUp={
            (event) => {
              const searchTerm = event.target.value
              setTerm(searchTerm)
            }
          } />
        </p>
      </div>



      {/*
            Pseudo Code
            .filter(happyEntries => happyEntries.mood.label === "Happy")
        */}
      {filteredEntries.map(entry => {
        return <div key={entry.id} className="panel-block">
          <Entry
            key={entry.id}
            entry={entry}
            mood={moods.find(m => m.id === entry.mood_id)}
            tags={tags}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </div>
      })}
    </article>
  );
};
