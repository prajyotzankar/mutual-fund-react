import React, { useEffect, useState } from "react";
import axios from "axios";
import "./advanceSearchStyle.css";
//import components
import SelectFundHouse from "./options/selectFundHouse";
import SelectSchemeCategory from "./options/selectSchemeCategory";

const advanceSearch = () => {
  const [fundHouse, setFundHouse] = useState();
  const [schemeCategory, setSchemeCategory] = useState();
  const [schemeSubCategory, setSchemeSubCategory] = useState();
  const [vendor, setVendor] = useState({
    selected: "",
    options: ["Direct", "Regular"],
  });
  const [returnChannel, setReturnChannel] = useState({
    selected: "",
    options: ["Growth", "Dividend"],
  });

  return (
    <main>
      <div className="flex-container-main">
        <SelectFundHouse fundHouse={fundHouse} setFundHouse={setFundHouse} />
        <SelectSchemeCategory schemeCategory setSchemeCategory />
      </div>
      <div className="flex-container-main"></div>
      <div className="flex-container-main"></div>
    </main>
  );
};
// const meta = {"fund_house":"SBI Mutual Fund","scheme_type":"Open Ended Schemes","scheme_category":"Equity Scheme - Small Cap Fund","scheme_code":125497,"scheme_name":"SBI Small Cap Fund - Direct Plan - Growth"}
export default advanceSearch;
