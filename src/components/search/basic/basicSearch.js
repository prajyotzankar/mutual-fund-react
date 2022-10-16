import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import "./basicSearchStyle.css";

const basicSearch = ({ fundCode, setFundCode }) => {
  const [inputFundName, setInputFundName] = useState();

  const showAutocompleteResults = async (queryString) => {
    try {
      // getting all required elements
      const searchInput = document.querySelector(".searchInput");
      const input = document.getElementById("inputFundName");
      const resultBox = document.querySelector(".resultBox");

      let autocompleteResults = [];

      if (queryString.length >= 3) {
        const results = await axios.get(
          `http://localhost:5000/search/allFunds?term=${queryString}`
        );
        console.log(results.data);
        let allList = resultBox.querySelectorAll("li");

        autocompleteResults = Object.keys(results.data).map((key) => {
            console.log(results.data[key]["schemeCode"], results.data[key]["schemeName"]);
            return "<li>" + results.data[key]["schemeName"] + "</li>";
        });

        searchInput.classList.add("active"); //show autocomplete box
        showSuggestions(autocompleteResults);

        for (let i = 0; i < allList.length; i++) {
          //adding onclick attribute in all li tag
          allList[i].setAttribute("onclick", "select(this)");
        }
        
      } else {
        searchInput.classList.remove("active"); //hide autocomplete box
      }

      function showSuggestions(list) {
        let listData;
        if (!list.length) {
          var userValue = input.value;
          listData = "<li>" + userValue + "</li>";
        } else {
          listData = list.join("");
        }
        resultBox.innerHTML = listData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //trick from Stack Overflow flow to wait after typing to execute the
  //showAutocompleteResults func
  const delayInMilliseconds = 1000; // 1 sec
  const debounce = (func) => {
    let timer;
    return function(...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delayInMilliseconds);
    };
  };

  const optimizedFn = useCallback(debounce(showAutocompleteResults), []);


  const onChangeInputFundName = (e) => {
    setInputFundName(e.target.value);
    optimizedFn(e.target.value);
    
  };

  return (
    <div class="searchInput">
      <div className="input_container">
        <label className="label filled" htmlFor="inputFundName">
          Search
        </label>
        <input
          type="text"
          className="text_input"
          autoComplete="off"
          name="inputFundName"
          id="inputFundName"
          required
          placeholder=" Search Mutual Funds"
          value={inputFundName}
          onChange={onChangeInputFundName}
        />
      </div>
      <div class="resultBox">
        {/* here list are inserted from javascript */}
      </div>
      <div class="icon">
        <i class="fas fa-search"></i>
      </div>
    </div>
  );
};

export default basicSearch;
