import "./Navigation.modules.css";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";

function Navigation() {
  const navigate = useNavigate();

  return (
    <ul className="navigation">
      <li>
        <div className="btn-nav">
          <IconButton onClick={() => navigate("bilings", { replace: false })}>
            <ArrowCircleDownIcon sx={{ fontSize: 70, color: "#2ec82387" }} />
          </IconButton>
          <span className="btn-text">Додати на рахунок</span>
        </div>
      </li>
      <li className="btn-nav">
        <div className="btn-nav">
          <IconButton onClick={() => navigate("withdraw", { replace: false })}>
            <ArrowCircleUpIcon sx={{ fontSize: 70, color: "#e7505382" }} />
          </IconButton>
          <span className="btn-text">Додати витрати</span>
        </div>
      </li>
      <li className="btn-nav">
        <div className="btn-nav">
          <IconButton onClick={() => navigate("history", { replace: false })}>
            <HistoryToggleOffIcon sx={{ fontSize: 70, color: "#7e45bda3" }} />
          </IconButton>
          <span className="btn-text">Історія витрат:</span>
        </div>
      </li>
    </ul>
  );
}

export default Navigation;