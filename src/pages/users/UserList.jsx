import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Layout } from "../../components/Layout";
import { PopoverMenu } from "../../components/ui/PopoverMenu";
import { LoadingSkeleton } from "../../components/loading/Skeleton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Header from "../../components/Header";
import useSWR from "swr";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";

export const UserList = () => {
  
  const theme               = useTheme();
  const colors              = tokens(theme.palette.mode);
  const navigate            = useNavigate();
  const { token }           = useSelector((store) => store.user.currentUser);
  const [open, setOpen]     = useState(null);
  const [userId, setUserId] = useState(null);

  const fetcher = (url) =>
    axios.get(url, {
      headers: { "x-token": `${token}` },
    });

  const { data: usersData } = useSWR(`http://localhost:3040/api/user`, fetcher);
  let users = usersData?.data.data.users;

  const handleOpenMenu = (id, event) => {
    setOpen(event.currentTarget);
    setUserId(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setUserId(null);
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => <Avatar src={params.row.avatar} />,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "phone",
      headerName: "Telefono",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Rol",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Menu",

      renderCell: ({ row: { _id } }) => {
        return (
          <IconButton
            size="large"
            color="inherit"
            onClick={(e) => handleOpenMenu(_id, e)}
          >
            <MoreVertIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <>
      {!usersData ? (
        <LoadingSkeleton />
      ) : (
        <Layout>
          <Box m="20px">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Header title="Usuarios" subtitle="Agregar un nuevo usuario" />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  "&:hover": { backgroundColor: colors.greenAccent[800] },
                }}
                onClick={() => navigate("/users/new")}
              >
                Crear
              </Button>
            </Stack>
            <Box
              m="40px 0 0 0"
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.grey[800],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.grey[800],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
            >
              <DataGrid
                checkboxSelection
                disableSelectionOnClick
                rows={users.map((user) => {
                  return {
                    _id: user._id,
                    name: user.name + ' '+ user.lastName,
                    email: user.email,
                    phone: user.phone,
                    avatar: user.avatar,
                    role: user.role.role,
                  };
                })}
                columns={columns}
                getRowId={(row) => row._id}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </Layout>
      )}
      <PopoverMenu
        open={open}
        handleCloseMenu={handleCloseMenu}
        userId={userId}
      />
    </>
  );
};
