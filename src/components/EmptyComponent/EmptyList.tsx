import { Typography } from "@mui/material";

export const EmptyList = () => {
  return (
    <div className="empty-list">
      <Typography variant="h2" fontWeight={600} fontSize={22}>
        Немає жодної транзакції!
      </Typography>
    </div>
  );
};