import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import RoomIcon from "@mui/icons-material/Room";
import WebIcon from "@mui/icons-material/Web";
import { Beer as IBeer, FavBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams } from "react-router-dom";
import styles from "./Beer.module.css";
import { red } from "@mui/material/colors";
import GoogleMapReact from "google-map-react";
import { API_KEY } from "../../api/config";

interface TextMarkerProps {
  text: string;
  lat: number;
  lng: number;
}

const Beer: React.FC = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const [isInFavourite, setIsInFavourite] = useState<boolean>(false);

  const TextMarker: React.FC<TextMarkerProps> = ({ text }) => <div>{text}</div>;

  useEffect(fetchData.bind(this, setBeer, id), [id]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favouriteBeerData");

    if (storedFavourites && beer) {
      const favourites: FavBeer[] = JSON.parse(storedFavourites);

      setIsInFavourite(
        favourites.filter((favourite) => favourite.id === beer.id).length > 0
      );
    }
  }, [beer]);

  const handleAddToFavourite = () => {
    if (beer) {
      const storedFavourites = localStorage.getItem("favouriteBeerData");
      let favourites: FavBeer[] = storedFavourites
        ? JSON.parse(storedFavourites)
        : [];

      if (isInFavourite) {
        favourites = favourites.filter(
          (beerinp: FavBeer) => beerinp.id !== beer?.id
        );
      } else {
        favourites.push({ id: beer.id, name: beer.name });
      }

      localStorage.setItem("favouriteBeerData", JSON.stringify(favourites));
      setIsInFavourite(!isInFavourite);
    }
  };

  const AddToFavourite = (
    <Tooltip
      title={isInFavourite ? "Remove from favourites" : "Add to favourites"}
    >
      <IconButton
        aria-label="add to favorite"
        onClick={() => handleAddToFavourite()}
        color="success"
      >
        {isInFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );

  return (
    <Paper
      sx={{ display: "flex", justifyContent: "space-between" }}
      elevation={16}
    >
      <Card sx={{ width: "50%", boxShadow: "none" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="beer">
              R
            </Avatar>
          }
          action={AddToFavourite}
          title={beer?.name}
          subheader={beer?.brewery_type}
        />

        <CardContent>
          <Stack direction="row" spacing={2}>
            <LocationOnIcon />
            <Typography variant="body1" color="text.secondary">
              {beer?.address_1}, {beer?.address_2}, {beer?.address_3}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <LocationCityIcon />
            <Typography variant="body1" color="text.secondary">
              {beer?.city}
              {beer?.state_province} {beer?.postal_code},{beer?.country},
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <SmartphoneIcon />{" "}
            <Typography variant="body1" color="text.secondary">
              {beer?.phone}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <WebIcon />{" "}
            <Typography variant="body2" color="text.secondary">
              {beer?.website_url}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ width: "50%", boxShadow: "none" }}>
        <CardContent sx={{ height: "50vh", width: "100%" }}>
          {beer?.latitude && beer?.longitude && API_KEY && (
            <GoogleMapReact
              bootstrapURLKeys={{
                key: API_KEY,
              }}
              defaultCenter={{
                lat: parseFloat(beer.latitude),
                lng: parseFloat(beer.longitude),
              }}
              defaultZoom={9}
            >
              <TextMarker
                lat={parseFloat(beer.latitude)}
                lng={parseFloat(beer.longitude)}
                text={beer?.street}
              />
            </GoogleMapReact>
          )}
        </CardContent>
      </Card>
    </Paper>
  );
};

export default Beer;
