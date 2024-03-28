import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type PokemonType = {
  name: string;
  url: string;
};

function App() {
  const [pokemon, setPokemon] = useState<PokemonType[]>([]);
  const [defaultPokemon, setDefaultPokemon] = useState<PokemonType[]>([]);
  const [pagination, setPagination] = useState(1);
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setPagination(1);
    setValue(e.target.value);
    const filterPokemon = defaultPokemon.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPokemon(filterPokemon);
  };

  const HighlightText = ({ text }: { text: string }) => {
    const parts = text.split(new RegExp(`(${value})`, "gi"));

    return (
      <span>
        {parts.map((part, index) => (
          <span
            key={index}
            style={
              part?.toLowerCase() === value?.toLowerCase()
                ? { backgroundColor: "yellow" }
                : null
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  useEffect(() => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?offset=${
          (pagination - 1) * 20
        }&limit=20`
      )
      .then((res) => {
        setPokemon(res.data.results);
        setDefaultPokemon(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pagination]);

  return (
    <div className="container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="input"
        placeholder="Tìm kiếm"
      />
      <table className="customers">
        <tr>
          <th>STT</th>
          <th>Tên Pokemon</th>
        </tr>
        {pokemon.map((item) => {
          const index = item.url.split("/")[6];
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>
                <HighlightText text={item.name} />
              </td>
            </tr>
          );
        })}
      </table>
      <div className="pagination">
        <a
          onClick={() =>
            setPagination((prev) => {
              if (prev > 1) {
                return prev - 1;
              } else {
                return prev;
              }
            })
          }
        >
          &laquo;
        </a>
        <a
          onClick={() => setPagination(1)}
          className={`${pagination === 1 ? "active" : ""}`}
        >
          1
        </a>
        <a
          onClick={() => setPagination(2)}
          className={`${pagination === 2 ? "active" : ""}`}
        >
          2
        </a>
        <a
          onClick={() => setPagination(3)}
          className={`${pagination === 3 ? "active" : ""}`}
        >
          3
        </a>
        <a
          onClick={() => setPagination(4)}
          className={`${pagination === 4 ? "active" : ""}`}
        >
          4
        </a>
        <a
          onClick={() => setPagination(5)}
          className={`${pagination === 5 ? "active" : ""}`}
        >
          5
        </a>
        <a
          onClick={() =>
            setPagination((prev) => {
              if (prev < 5) {
                return prev + 1;
              } else {
                return prev;
              }
            })
          }
        >
          &raquo;
        </a>
      </div>
    </div>
  );
}

export default App;
