import { useEffect, useState } from "react";
import { fetchData, searchData } from "./utils";
import { Beer, FavBeer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Checkbox,
  Paper,
  TextField,
  Link,
  FormHelperText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import styles from "./Home.module.css";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [filteredBeerList, setFilteredBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<FavBeer>>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [searchValidation, setSearchValidation] = useState<string>("Filter");

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
      setSearchValidation("Filter");
    } else if (e.target.value.length > 0 && e.target.value.length <= 2) {
      setSearchValidation("Please type Minimum 3 Charecters");
    } else {
      setSearchValidation("Filter");
    }
  };

  const handleAddToFavourite = (id: string, name: string) => {
    const storedFavourites = localStorage.getItem("favouriteBeerData");
    let favourites: FavBeer[] = storedFavourites
      ? JSON.parse(storedFavourites)
      : [];

    if (
      favourites.filter((beerinp: FavBeer) => beerinp.id === id).length === 0
    ) {
      favourites.push({ id, name });
      localStorage.setItem("favouriteBeerData", JSON.stringify(favourites));
      const storedFavourites = localStorage.getItem("favouriteBeerData");
      if (storedFavourites) {
        const favIds: FavBeer[] = JSON.parse(storedFavourites);
        setSavedList(favIds);
      }
    } else {
      const updatedList = favourites.filter(
        (beerinp: FavBeer) => beerinp.id !== id
      );
      localStorage.setItem("favouriteBeerData", JSON.stringify(updatedList));
      const storedFavourites = localStorage.getItem("favouriteBeerData");
      if (storedFavourites) {
        const favIds: FavBeer[] = JSON.parse(storedFavourites);
        setSavedList(favIds);
      }
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
                  label={searchValidation}
                  variant="filled"
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
                        <Checkbox
                          checked={savedList.some((fav) => fav.id === beer.id)}
                          onClick={() =>
                            handleAddToFavourite(beer.id, beer.name)
                          }
                        />
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
                    <Checkbox
                      checked
                      onClick={() => handleAddToFavourite(beer.id, beer.name)}
                    />
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
