// ** MUI Imports
import React, { useState } from "react";
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
  console.log(percent, "percent", props);
  // setReportValue({ [props.name]: percent });
  if (percent !== 0) {
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
  }
};

const TestPlanReport = (props) => {
  let reportValue = {
    Skipped: `${((props.skipped / props.total_count) * 100).toFixed(0)}%`,
    Pass: `${((props.pass / props.total_count) * 100).toFixed(0)}%`,
    Fail: `${((props.fail / props.total_count) * 100).toFixed(0)}%`,
  };
  console.log(props, "vvvv", reportValue);
  const data = [
    { name: "Fail", value: props.fail, color: "#E8381A" },
    { name: "Pass", value: props.pass, color: "#67C932" },
    {
      name: "Skipped",
      value: props.skipped,
      color: "#03B1D7",
    },
  ];

  return (
    <Card>
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            // mr: 6,
            display: "flex",
            // alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h4">{props.title}</Typography>
        </Box>
        <div style={{ display: "flex" }}>
          <Box sx={{ height: 350, display: "flex", flex: 0.5 }}>
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
              justifyContent: "center",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut{" "}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flex: 1 }}>
                  <Box
                    sx={{
                      margin: 2,
                      display: "flex",
                      alignItems: "center",
                      "& svg": { mr: 1.5, color: "#67C932" },
                    }}
                  >
                    <Icon icon="bxs:circle" fontSize="0.75rem" />
                    <Typography variant="body1">Pass</Typography>
                  </Box>
                </div>
                <div style={{ display: "flex", flex: 2 }}>
                  <Typography variant="body1">{reportValue.Pass}</Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flex: 1 }}>
                  <Box
                    sx={{
                      margin: 2,
                      display: "flex",
                      alignItems: "center",
                      "& svg": { mr: 1.5, color: "#03B1D7" },
                    }}
                  >
                    <Icon icon="bxs:circle" fontSize="0.75rem" />
                    <Typography variant="body1">Skipped</Typography>
                  </Box>
                </div>
                <div style={{ display: "flex", flex: 2 }}>
                  <Typography variant="body1">{reportValue.Skipped}</Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", flex: 1 }}>
                  <Box
                    sx={{
                      margin: 2,
                      display: "flex",
                      alignItems: "center",
                      "& svg": { mr: 1.5, color: "#E8381A" },
                      // justifyContent:"space-between"
                    }}
                  >
                    <Icon icon="bxs:circle" fontSize="0.75rem" />
                    <Typography variant="body1">Fail</Typography>
                  </Box>
                </div>
                <div style={{ display: "flex", flex: 2 }}>
                  <Typography variant="body1">{reportValue.Fail}</Typography>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestPlanReport;
