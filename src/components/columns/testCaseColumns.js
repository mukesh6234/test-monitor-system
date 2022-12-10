import Typography from "@mui/material/Typography";
import Icon from "@core/components/icon";
import CustomAvatar from "@core/components/mui/avatar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { getInitials } from "@core/utils/get-initials";
import { IconButton } from "@mui/material";
import { Tooltip, Zoom } from "@mui/material";
import { SliceName, titleize } from "components/helper";

const renderCreate = (row) => {
  //   if (row.image .length) {
  //     return (
  //       <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 32, height: 32 }} />
  //     );
  //   } else {
  return (
    <CustomAvatar
      skin="light"
      color={row.avatarColor || "primary"}
      sx={{ mr: 2, width: 32, height: 32, fontSize: "1rem" }}
    >
      {getInitials(row.created_by.name ? row.created_by.name : "Katomaran")}
    </CustomAvatar>
  );
};

const renderUpdate = (row) => {
  //   if (row.image .length) {
  //     return (
  //       <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 32, height: 32 }} />
  //     );
  //   } else {
  return (
    <CustomAvatar
      skin="light"
      color={row.avatarColor || "primary"}
      sx={{ mr: 2, width: 32, height: 32, fontSize: "1rem" }}
    >
      {getInitials(row.updated_by.name ? row.updated_by.name : "Katomaran")}
    </CustomAvatar>
  );
};

const StyledLink = styled("a")(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1rem",

  textDecoration: "none",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const testCaseColumns = (testcase, router, handleView) => {
  return [
    {
      flex: 0.25,
      headerName: "Title",
      headerAlign: "center",
      align: "center",
      sortable: false,
      field: "title",
      renderCell: ({ row }) => {
        return (
          <Tooltip
            arrow
            title={row.title}
            placement="top"
            TransitionComponent={Zoom}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                textTransform: "capitalize",
              }}
            >
              {SliceName(titleize(row.title))}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      flex: 0.25,
      field: "created_by",
      headerAlign: "center",
      minWidth: 250,
      align: "center",
      sortable: false,
      headerName: "Created By",
      renderCell: ({ row }) => {
        const { created_by } = row;

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {created_by ? (
              <>
                {renderCreate(row)}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <StyledLink>{created_by.name}</StyledLink>
                  <Typography
                    noWrap
                    variant="caption"
                    sx={{ color: "text.disabled" }}
                  >
                    {created_by.email}
                  </Typography>
                </Box>
              </>
            ) : (
              "-"
            )}
          </Box>
        );
      },
    },
    {
      flex: 0.25,
      field: "updated_by",
      headerAlign: "center",
      minWidth: 250,
      align: "center",
      sortable: false,
      headerName: "Last Updated By",
      renderCell: ({ row }) => {
        const { updated_by } = row;

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {updated_by ? (
              <>
                {" "}
                {renderUpdate(row)}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <StyledLink>
                    {updated_by.name ? updated_by.name : "-"}
                  </StyledLink>
                  <Typography
                    noWrap
                    variant="caption"
                    sx={{ color: "text.disabled" }}
                  >
                    {updated_by.email ? updated_by.email : "-"}
                  </Typography>
                </Box>
              </>
            ) : (
              "-"
            )}
          </Box>
        );
      },
    },
    {
      flex: 0.25,
      field: "module",
      headerAlign: "center",
      align: "center",
      sortable: false,
      headerName: "Module",
      renderCell: ({ row }) => {
        return (
          <Tooltip
            arrow
            title={row.section ? row.section.title : "-"}
            placement="top"
            TransitionComponent={Zoom}
          >
            <Typography
              noWrap
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                textTransform: "capitalize",
              }}
            >
              {SliceName(titleize(row.section ? row.section.title : "-"))}
            </Typography>
          </Tooltip>
        );
      },
    },

    {
      flex: 0.25,
      sortable: false,
      align: "center",
      headerAlign: "center",
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <>
          {console.log(row, "handleView")}
          <IconButton
            style={{ padding: "15px" }}
            onClick={() => handleView(row.id)}
          >
            <Icon icon="bx:show-alt" />
          </IconButton>
          <IconButton
            style={{ padding: "15px" }}
            onClick={() =>
              router.push(
                `/project/testcases/edittestcase/${testcase}/${row.id}`
              )
            }
          >
            <Icon icon="bx:pencil" fontSize={20} />
          </IconButton>
        </>
      ),
    },
  ];
};
