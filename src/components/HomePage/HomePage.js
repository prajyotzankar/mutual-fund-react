import React, { useState, useEffect } from "react";

//import components
import BasicSearch from "../search/basic/basicSearch";
import NAVgraph from "../Graph/mainGraph/navGraph"

//CSS
import "./HomePageStyle.css"

const HomePage = () => {
  const [fundCode, setFundCode] = useState();
  const [fundInfo, setFundInfo] = useState();

  return (
    <main>
      <div className="search">
        <div className="basicSearch">
          <BasicSearch fundCode={fundCode} setFundCode={setFundCode} />
        </div>
      </div>
      <div className="fundInfo"></div>
      <div className="mainGraph">
        <NAVgraph />
      </div>
    </main>
  );
};

export default HomePage;
