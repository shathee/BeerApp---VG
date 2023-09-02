import { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import CoffeeIcon from "@mui/icons-material/Coffee";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LiquorIcon from "@mui/icons-material/Liquor";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);
  const geticon = (type: string) => {
    switch (type) {
      case "micro":
        return <EmojiFoodBeverageIcon sx={{ color: "#333333 " }} />;
      case "nano":
        return <CoffeeMakerIcon sx={{ color: "#333333" }} />;
      case "regional":
        return <CoffeeIcon sx={{ color: "#333333" }} />;
      case "brewpub":
        return <SportsBar sx={{ color: "#333333" }} />;
      case "large":
        return <FreeBreakfastIcon sx={{ color: "#333333" }} />;
      case "planning":
        return <EmojiObjectsIcon sx={{ color: "#333333" }} />;
      case "bar":
        return <LocalBarIcon sx={{ color: "#333333" }} />;
      case "contract":
        return <LiquorIcon sx={{ color: "#333333" }} />;
      case "proprietor":
        return <NightlifeIcon sx={{ color: "#333333" }} />;
      case "closed":
        return <DoDisturbIcon sx={{ color: "#333333" }} />;
      default:
        return "";
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "brewery_type",
      headerName: "Type",
      flex: 0.5,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.5,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.5,
    },
  ];

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          {/* <List>
            {beerList.map((beer) => (
              <ListItemButton
                key={beer.id}
                onClick={onBeerClick.bind(this, beer.id)}
              >
                <ListItemAvatar>
                  <Avatar>{geticon(beer.brewery_type)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={beer.name}
                  secondary={beer.brewery_type}
                />
              </ListItemButton>
            ))}
          </List> */}
          <DataGrid
            rows={beerList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            pageSizeOptions={[15]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
