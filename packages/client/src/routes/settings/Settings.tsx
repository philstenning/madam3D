import React from "react";
import Toggle from "../../components/toggle/toggle";
import Stack from "../../components/stack/Stack";
import "./settings.css";
const Settings = () => {
  return (
    <div className="settings">
      <h2 className="settings__header">Settings</h2>
      <Stack heading="Scan local filesystem for:">
        <Toggle label=".stl" isChecked={true} disabled={false} />
        <Toggle label=".m3f" isChecked={false} />
        <Toggle label=".gcode" isChecked={false} disabled={true} />
      </Stack>
    </div>
  );
};

export default Settings;
