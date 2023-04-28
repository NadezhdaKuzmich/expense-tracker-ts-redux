import React from "react";
import { Grid, Box } from "@mui/material";
import Card from "antd/es/card/Card";

interface myPropsI {
  expense: any;
}

const TableItem: React.FC<myPropsI> = ({ expense }) => {
  const { description, category, price, date } = expense;

  const title = (
    <h3 className="list-expenses-title description" style={{ color: "grey" }}>
      {description}
    </h3>
  );

  return (
    <Card title={title} className="expense-box">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={0}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item md={3} xs={3}>
            <h3 className={`price ${price > 0 ? "add" : "withdraw"}`}>
              {price}грн
            </h3>
          </Grid>
          <Grid item md={4} xs={4}>
            <p className="category">{category}</p>
          </Grid>
          <Grid item md={3} xs={3} container justifyContent="flex-end">
            <span className="date">{date}</span>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default TableItem;
