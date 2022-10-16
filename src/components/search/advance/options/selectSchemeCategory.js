import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../advanceSearchStyle.css"
const selectSchemeCategory = ({schemeCategory, setSchemeCategory}) => {
    return (
      <div className="input-container">
        <label className="label filled"> Mutual Fund House </label>
        <select
          className="form-select text-input"
          id="selectFundHouse"
          name="fundHouse"
          required
          onChange={schemeCategory}
          value={setSchemeCategory}
        >
          <option value="">--Select Scheme Category--</option>

          {/* {(() => {
            if (typeof stateOptions !== "undefined") {
              return [stateOptions].map((stateOption, index) => {
                if (typeof stateOption !== "undefined")
                  return Object.keys(stateOption).map((key) => {
                    return (
                      <option
                        style={{ color: "white" }}
                        key={key + index}
                        value={stateOption[key].stateName}
                      >
                        {stateOption[key].stateName}
                      </option>
                    );
                  });
                return stateOption;
              });
            }
          })()} */}
        </select>
      </div>
    );
}

export default selectSchemeCategory