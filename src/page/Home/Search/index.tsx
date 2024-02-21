import { AutoComplete, Empty } from "antd";
import "./index.less";
import React, { useState } from "react";
import { getSearchResult, getSearchSuggest } from "../../../api";
import { useDeepCompareEffect, useRequest } from "ahooks";
import { SearchOutlined } from "@ant-design/icons";
import SearchSuggestItem from "./SearchSuggestItem";
import { isJSON } from "../../../utils";
import SearchContent from "./SearchContent";

const SearchPage: React.FC = () => {
  const [options, setOptions] = useState<SearchSuggestItem[]>([]);
  const [keywords, setKeywords] = useState<SearchKeywordsObj | undefined>(undefined);
  const [searchResult, setSearchResult] = useState<SearchResult | undefined>(undefined);
  const { data, run } = useRequest(getSearchSuggest, {
    debounceWait: 500,
    manual: true,
  });

  const { data: searchResponse, run: searchRequest } = useRequest(getSearchResult, {
    throttleWait: 500,
    manual: true,
  });

  useDeepCompareEffect(() => {
    if (data && data.data.code === 200) {
      const { result } = data.data;
      if(result) {
        const { order } = result;

      if (order && order.length > 0) {
        const categories = order.map((title) => ({
          title,
          options: result[title]!,
        }));

        setOptions(categories);
      } else {
        setOptions([]);
      }
      }
    }
  }, [data]);

  useDeepCompareEffect(() => {
    if (searchResponse && searchResponse.data.code === 200) {
      // debugger;
      setSearchResult(searchResponse.data.result);
    }
  }, [searchResponse]);

  const handleInput = (value: string) => {
    if (!isJSON(value)) {
      run(value);
      setKeywords({
        values: [value],
      });
    } else {
      setKeywords(JSON.parse(value) as SearchKeywordsObj);
    }
  };

  const handleSearch = (value?: string) => {
    const keywordsObj = value ? (JSON.parse(value) as SearchKeywordsObj) : keywords;
    if (keywordsObj) {
      const { type, values } = keywordsObj;
      searchRequest(values.join(" "), type);
    }
  };

  return (
    <div className="search-page">
      <AutoComplete
        size="large"
        className="search-input"
        suffixIcon={<SearchOutlined />}
        options={options.map((option) => SearchSuggestItem(option))}
        onChange={handleInput}
        onKeyDown={(event) => event.code === "Enter" && handleSearch()}
        onSelect={handleSearch}
        // notFoundContent={<Empty />}
        value={keywords?.values.join(" ")}
        // open={true}
      ></AutoComplete>
      {searchResult ? <SearchContent result={searchResult} /> : null}
    </div>
  );
};

export default SearchPage;
