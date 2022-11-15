import { useEffect, useState } from "react";
import api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { getListUsers } from "../../redux/userSlice";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tokens } from "../../theme";
import { Layout } from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { currentUser, listUsers } = useSelector((store) => store.user);
  const [open, setOpen] = useState(null);
  const [user, setUser] = useState(null);

  const handleOpenMenu = (id, event) => {
    setOpen(event.currentTarget);
    setUser(id);
    console.log(id)
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setUser(null);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get("/user", {
          headers: { "x-token": `${currentUser.token}` },
        });
        dispatch(getListUsers(data.data.users));
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const listOfUsers = listUsers.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role.role,
    };
  });

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
          /*  <Box m="0 auto">
            <IconButton aria-label="edit" sx={{ color: colors.grey[500] }}>
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              sx={{ color: colors.redAccent[500] }}
            >
              <DeleteIcon />
            </IconButton>
          </Box> */
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
      <Layout>
        <Box m="20px">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Header
            title="Usuarios"
            subtitle="Agregar un nuevo usuario"
          />
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[500],
                "&:hover": { backgroundColor: colors.greenAccent[800] },
              }}
              onClick={()=>navigate("/users/new")}
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
              /*  disableMultipleSelection={true} */
              rows={listOfUsers}
              columns={columns}
              getRowId={(row) => row._id}
            />
          </Box>
        </Box>
      </Layout>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => console.log()}>
          <EditIcon />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <DeleteIcon />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
};

export default Team;
