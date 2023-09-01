import { useEffect, useState } from "react";
import { fetchData, searchData } from "./utils";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import styles from "./Home.module.css";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filteredBeerList, setFilteredBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);
  const [filterText, setFilterText] = useState<string>("");

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  useEffect(() => {
    searchData(setFilteredBeerList, filterText);
  }, [filterText]);

  // useEffect(() => {
  //   // console.log(filterText);
  //   // const filteredBeers = beerList.filter((beer) =>
  //   //   beer.name.toLowerCase().includes(filterText)
  //   // );
  //   // setFilteredBeerList(filteredBeers);
  //   searchData.bind(this, setFilteredBeerList, filterText);
  // }, [beerList, filterText]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favouriteBeerData");
    if (storedFavourites) {
      const favIds: Beer[] = JSON.parse(storedFavourites);
      setSavedList(favIds);
    }
  }, []);

  const filterBeers = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 3) {
      setFilterText(e.target.value.toLowerCase());
    }
  };

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField
                  onChange={filterBeers}
                  label="Filter..."
                  variant="outlined"
                />
                <Button
                  onClick={() => window.location.reload()}
                  variant="contained"
                >
                  Reload list
                </Button>
              </div>
              <ul className={styles.list}>
                {filteredBeerList.length
                  ? filteredBeerList.map((beer, index) => (
                      <li key={index.toString()}>
                        <Checkbox />
                        <Link component={RouterLink} to={`/beer/${beer.id}`}>
                          {beer.name}
                        </Link>
                      </li>
                    ))
                  : beerList.map((beer, index) => (
                      <li key={index.toString()}>
                        <Checkbox />
                        <Link component={RouterLink} to={`/beer/${beer.id}`}>
                          {beer.name}
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    localStorage.removeItem("favouriteBeerData");
                    setSavedList([]);
                  }}
                >
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
