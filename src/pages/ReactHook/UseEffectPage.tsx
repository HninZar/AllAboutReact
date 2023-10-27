import { useEffect, useState } from "react";
import axios from "axios";

// Seperate component
// Use reducer hook for data fetch : (state, action)

interface Hits {
  objectID: string;
  url: string;
  title: string;
}

const useHackerNewsApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //useEffect(setup, dependencies)
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        //Data set
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  console.log("Data", data);
  return [{ data, isLoading, isError }, setUrl];
};

export default function UseEffectPage() {
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, isError }, dofetch] = useHackerNewsApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    { hits: [] }
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          dofetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit"> Submit </button>
      </form>

      {isError && <div>Something went wrong ... </div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item: Hits) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
