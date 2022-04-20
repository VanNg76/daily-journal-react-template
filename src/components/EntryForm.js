import React, { useState, useEffect } from "react"
// import { updateEntry } from "./EntryManager"

export const EntryForm = ({ entry, moods, tags, onFormSubmit }) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedEntry, setUpdatedEntry] = useState(entry)
    const [selectedTags, addSelectedTags] = useState([])

    useEffect(() => {
        setUpdatedEntry(entry)
        if ('id' in entry) {
            setEditMode(true)
        }
        else {
            setEditMode(false)
        }
    }, [entry])

    // useEffect((t) => {
    //     addSelectedTags(t)
    // }, [])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = Object.assign({}, updatedEntry)
        if (event.target.name === "mood_id") {
            newEntry[event.target.name] = parseInt(event.target.value)
        } else {
            newEntry[event.target.name] = event.target.value
        }
        setUpdatedEntry(newEntry)
    }



    const constructNewEntry = () => {
        const copyEntry = { ...updatedEntry }
        // copyEntry.mood_id = parseInt(copyEntry.mood_id)
        if (!copyEntry.date) {
            copyEntry.date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        }
        const copySelectedTags = [...selectedTags]
        onFormSubmit(copyEntry, copySelectedTags)
        addSelectedTags([])
    }

    return (
        <article className="panel is-info">
            <h2 className="panel-heading">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <div className="panel-block">
                <form style={{ width: "100%" }}>
                    <div className="field">
                        <label htmlFor="concept" className="label">Concept: </label>
                        <div className="control">
                            <input type="text" name="concept" required autoFocus className="input"
                                proptype="varchar"
                                placeholder="Concept"
                                value={updatedEntry.concept}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="entry" className="label">Entry: </label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="entry"
                                value={updatedEntry.entry}
                                onChange={handleControlledInputChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="mood_id" className="label">Mood: </label>
                        <div className="control">
                            <div className="select">
                                <select name="mood_id"
                                    proptype="int"
                                    value={updatedEntry.mood_id}
                                    onChange={handleControlledInputChange}
                                >
                                    <option value="0">Select a mood</option>
                                    {moods?.map(m => (
                                        <option
                                            selected = {updatedEntry.mood_id === m.id ? true : false}
                                            key={m.id}
                                            value={m.id} /* if 'value' on select equal to 'value' on an option, it will be selected*/
                                        >{m.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="tag" className="label">Tag: </label>
                            {tags?.map(t => (
                                <div key={t.id}>
                                    <input type="checkbox" value={t.id}
                                        onChange={
                                            (evt) => {
                                                if (evt.target.checked) {
                                                    let copy = [...selectedTags]
                                                    copy.push(t.id)
                                                    addSelectedTags(copy)
                                                } else {
                                                    let copy = [...selectedTags]
                                                    copy.splice(selectedTags?.indexOf(t.id), 1)
                                                    addSelectedTags(copy)
                                                }

                                            }
                                        } />{t.name}
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <div className="field">
                        <div className="control">
                            <button type="submit"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewEntry()
                                }}
                                className="button is-link">
                                {editMode ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </article>
    )
}
