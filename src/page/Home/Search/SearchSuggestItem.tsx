import { recordIsAlbum, recordIsSong } from "../../../utils";
import "./index.less";

interface IProps {
  title: string;
  options: Song[] | Album[] | Artist[];
}

const SearchSuggestItem = ({ title, options }: IProps) => {
  const checkOptionsIsArtist = (arr: Song[] | Album[] | Artist[]): arr is Artist[] => {
    return arr.length === 0
      ? false
      : !Array.isArray((arr[0] as Song).artists) && typeof (arr[0] as Album).artist === "undefined";
  };

  const optionsIsArtist = checkOptionsIsArtist(options);



  const getRecordValue = (record: Song | Album | Artist): SearchKeywordsObj => {
    if (recordIsSong(record)) {
      return {
        values: [record.name, record.artists[0]?.name],
        type: 1,
      };
    } else if (recordIsAlbum(record)) {
      return {
        values: [record.name, record.artist.name],
        type: 10,
      };
    } else {
      return {
        values: [record.name],
        type: 100,
      };
    }
  };

  return {
    label: <div className={`suggest-category-title`}>{title}</div>,
    options: options.map((record) => ({
      label: (
        <div className="suggest-item">
          <div className="suggest-item-name">{record.name}</div>
          {optionsIsArtist ? null : (
            <div className="suggest-item-artist">
              {(record as Song).artists
                ? (record as Song).artists[0]?.name
                : (record as Album).artist.name}
            </div>
          )}
        </div>
      ),
      key: `${title}-${record.id}`,
      value: JSON.stringify(getRecordValue(record)),
    })),
  };
};

export default SearchSuggestItem;
