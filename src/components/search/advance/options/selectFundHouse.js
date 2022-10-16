import React, { useEffect, useState } from "react";
import axios from "axios";
import "../advanceSearchStyle.css";

const selectFundHouse = ({ fundHouse, setFundHouse }) => {
  const fundHouseOptions = [
    "Aditya Birla Sun Life Mutual Fund",
    "AEGON Mutual Fund",
    "Alliance Capital Mutual Fund",
    "Axis Mutual Fund",
    "Bank of India Mutual Fund",
    "Baroda BNP Paribas Mutual Fund",
    "Benchmark Mutual Fund",
    "BNP Paribas Mutual Fund",
    "Canara Robeco Mutual Fund",
    "Daiwa Mutual Fund",
    "DBS Chola Mutual Fund",
    "Deutsche Mutual Fund",
    "DSP Mutual Fund",
    "Edelweiss Mutual Fund",
    "Fidelity Mutual Fund",
    "Fortis Mutual Fund",
    "Franklin Templeton Mutual Fund",
    "GIC Mutual Fund",
    "Goldman Sachs Mutual Fund",
    "HDFC Mutual Fund",
    "HSBC Mutual Fund",
    "ICICI Prudential Mutual Fund",
    "IDBI Mutual Fund",
    "IDFC Mutual Fund",
    "IIFCL Mutual Fund (IDF)",
    "IIFL Mutual Fund",
    "IL&F S Mutual Fund",
    "IL&FS Mutual Fund (IDF)",
    "Indiabulls Mutual Fund",
    "ING Mutual Fund",
    "Invesco Mutual Fund",
    "ITI Mutual Fund",
    "JM Financial Mutual Fund",
    "JPMorgan Mutual Fund",
    "Kotak Mahindra Mutual Fund",
    "L&T Mutual Fund",
    "LIC Mutual Fund",
    "Mahindra Manulife Mutual Fund",
    "Mirae Asset Mutual Fund",
    "Morgan Stanley Mutual Fund",
    "Motilal Oswal Mutual Fund",
    "Navi Mutual Fund",
    "Nippon India Mutual Fund",
    "NJ Mutual Fund",
    "PGIM India Mutual Fund",
    "PineBridge Mutual Fund",
    "PNB Mutual Fund",
    "PPFAS Mutual Fund",
    "Principal Mutual Fund",
    "quant Mutual Fund",
    "Quantum Mutual Fund",
    "Samco Mutual Fund",
    "SBI Mutual Fund",
    "Shinsei Mutual Fund",
    "Shriram Mutual Fund",
    "Standard Chartered Mutual Fund",
    "SUN F&C Mutual Fund",
    "Sundaram Mutual Fund",
    "Tata Mutual Fund",
    "Taurus Mutual Fund",
    "Trust Mutual Fund",
    "Union Mutual Fund",
    "UTI Mutual Fund",
    "WhiteOak Capital Mutual Fund",
    "Zurich India Mutual Fund",
  ];

  const onChangeFundHouse = (e) => {
    setFundHouse(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="input-container">
      <label className="label filled"> Mutual Fund House </label>
      <select
        className="form-select text-input"
        id="selectFundHouse"
        name="fundHouse"
        required
        onChange={onChangeFundHouse}
        value={fundHouse}
      >
        <input type="text" />
        <option value="no_pref">--Select Mutual Funds House--</option>

        {fundHouseOptions.map((fund_house) => {
          return (
            <option value={fund_house} key={fund_house}>
              {fund_house}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default selectFundHouse;
