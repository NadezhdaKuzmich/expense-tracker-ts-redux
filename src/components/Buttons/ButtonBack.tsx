import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const ButtonBack = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} className="form-btn">
      Повернутись
    </Button>
  );
};