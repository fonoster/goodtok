import { HomePage } from "../components/home/HomePage";
import React, { useEffect } from "react";

function HomeContainer() {
  const [name, setName] = React.useState("");

  useEffect(() => {
    setName("John Doe");
  });

  return (
    <HomePage
      isAuthenticated
      onClick={() => {}}
      userName={name}
      workspaces={[]}
    />
  );
}

export default HomeContainer;
