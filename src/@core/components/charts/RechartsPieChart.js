// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Third Party Imports
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// ** Icon Imports
import Icon from "@core/components/icon";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (props) => {
  // ** Props
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RechartsPieChart = (props) => {
  console.log(props, "vvvv");
  const data = [
    { name: "Pass", value: 78, color: "#67C932" },
    { name: "Skipped", value: 45, color: "#03B1D7" },
    { name: "Fail", value:80, color: "#E8381A" },
  ];

  return (
    <Card>
      {/* <CardHeader
        title="Expense Ratio"
        subheader="Spending on various categories"
        subheaderTypographyProps={{
          sx: { color: (theme) => `${theme.palette.text.disabled} !important` },
        }}
      /> */}
      <CardContent style={{display:"flex"}}>
        <Box sx={{ height: 350,width:"50%" }}>
          <ResponsiveContainer>
            <PieChart height={300} style={{ direction: "ltr" }}>
              <Pie
                data={data}
                innerRadius={80}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mb: 4,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              mr: 6,
              display: "flex",
              alignItems: "center",
              "& svg": { mr: 1.5, color: "#67C932" },
            }}
          >
            <Icon icon="bxs:circle" fontSize="0.75rem" />
            <Typography variant="body2">Pass</Typography>
          </Box>
          <Box
            sx={{
              mr: 6,
              display: "flex",
              alignItems: "center",
              "& svg": { mr: 1.5, color: "#03B1D7" },
            }}
          >
            <Icon icon="bxs:circle" fontSize="0.75rem" />
            <Typography variant="body2">Skipped</Typography>
          </Box>
          <Box
            sx={{
              mr: 6,
              display: "flex",
              alignItems: "center",
              "& svg": { mr: 1.5, color: "#E8381A" },
            }}
          >
            <Icon icon="bxs:circle" fontSize="0.75rem" />
            <Typography variant="body2">Fail</Typography>
          </Box>
        </Box>
        <Typography style={{ fontSize: "1rem", fontWeight: 600 }}>
          {/* {props.data.title} */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RechartsPieChart;
