import FullSunIcon from "@/public/Icons/sun-fill.svg";
import Overcast from "@/public/Icons/cloudy-fill.svg";
import HighWaterdropIcon from "@/public/Icons/drop-fill.svg";
import RainIcon from "@/public/Icons/rain-icon.svg";
import Fog from "@/public/Icons/foggy-line.svg";
import Partlycloudy from "@/public/Icons/sun-foggy-line.svg";
import SnowIcon from "@/public/Icons/snowflake-line.svg";
import ThunderIcon from "@/public/Icons/thunderstorms-line.svg";
import { Player } from "@lottiefiles/react-lottie-player";
const weatherAnimation = "/animation/weather.json";

export default WeatherIcon;
const iconMapping = {
  0: <FullSunIcon />,
  1: <FullSunIcon />,
  2: <Partlycloudy />,
  3: (
    <Player
      autoplay
      loop
      src={weatherAnimation}
      aria-hidden="true"
      style={{ height: "150px", width: "150px" }}
    />
  ),
  45: <Fog />,
  51: <RainIcon />,
  53: <RainIcon />,
  55: <RainIcon />,
  56: <RainIcon />,
  57: <RainIcon />,
  61: <RainIcon />,
  63: <RainIcon />,
  65: <RainIcon />,
  66: <SnowIcon />,
  67: <SnowIcon />,
  71: <SnowIcon />,
  73: <SnowIcon />,
  75: <SnowIcon />,
  77: <SnowIcon />,
  80: <RainIcon />,
  81: <RainIcon />,
  82: <RainIcon />,
  85: <SnowIcon />,
  86: <SnowIcon />,
  95: <HighWaterdropIcon />,
  96: <ThunderIcon />,
  99: <ThunderIcon />,
};

function WeatherIcon({ weatherData }) {
  const icon = iconMapping[weatherData] || null;

  return icon ? <div>{icon}</div> : null;
}
