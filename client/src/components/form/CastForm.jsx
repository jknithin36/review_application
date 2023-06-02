import React, { useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "../LiveSearch";
import { results } from "../admin/MovieForm";
import { useNotification, useSearch } from "../../hooks";
import { renderItem } from "../../utils/helper";
import { searchActor } from "../../api/actor";
// const cast = [{ actor: id, roleAs: "", leadActor: true }];
const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};
export default function CastForm({ onSubmit }) {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [profiles, setProfiles] = useState([]);

  const { updateNotification } = useNotification();
  const { handleSearch, resetSearch } = useSearch();

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;

    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });

    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };

  const handleSubmit = () => {
    const { profile, roleAs } = castInfo;
    if (!profile.name)
      return updateNotification("error", "Cast profile is missing!");
    if (!roleAs.trim())
      return updateNotification("error", "Cast role is missing!");

    onSubmit(castInfo);
    setCastInfo({ ...defaultCastInfo, profile: { name: "" } });
    resetSearch();
  };

  const handleProfileChange = ({ target }) => {
    const { value } = target;
    const { profile } = castInfo;
    profile.name = value;
    setCastInfo({ ...castInfo, ...profile });
    handleSearch(searchActor, value, setProfiles);
  };

  const { leadActor, profile, roleAs } = castInfo;
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        className="w-4 h-4"
        checked={leadActor}
        onChange={handleOnChange}
        title="Set as lead actor"
      />
      <LiveSearch
        placeholder="Search profile"
        value={profile.name}
        results={profiles}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
        onChange={handleProfileChange}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>

      <div className="flex-grow">
        <input
          type="text"
          className={commonInputClasses + " rounded p-1 text-lg border-2"}
          placeholder="Role as"
          name="roleAs"
          value={roleAs}
          onChange={handleOnChange}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-secondary dark:bg-white dark:text-primary text-white px-1 rounded"
      >
        Add
      </button>
    </div>
  );
}
