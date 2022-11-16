import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { Layout } from "../../components/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../api/api";
import { tokens } from "../../theme";
import { validations } from "../../helpers/regex";
import Header from "../../components/Header";
import { AvatarUpload } from "../../components/users/AvatarUpload";
import Swal from "sweetalert2/src/sweetalert2.js";
import { getUserDispatch } from "../../redux/userSlice";
import useSWR from "swr";
import axios from "axios";

const { lettersNumbersAndSpaces } = validations;

const schema = yup.object().shape({
  name: yup.string().required("Requerido"),
  lastName: yup.string().required("Requerido"),
  email: yup.string().email("Formato incorrecto").required("Requerido"),
  //password: yup.string().min(6, "6 caracteres mínimo").required("Requerido"),
  phone: yup.string().required("Requerido"),
  role: yup.string().required("Requerido"),
  address: yup
    .string()
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  flor: yup.string().matches(lettersNumbersAndSpaces, "Solo letras y números"),
  department: yup
    .string()
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  province: yup
    .string()
    .matches(lettersNumbersAndSpaces, "Solo letras y números"),
  city: yup.string().matches(lettersNumbersAndSpaces, "Solo letras y números"),
  //zip: yup.string().matches(validations.lettersNumbersAndSpaces,"Solo letras y números" ),
});

export const UserEdit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, editUser } = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState([]);
  const [user, setUser] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const getRoles = async () => {
      const { data } = await api.get("/roles", {
        headers: { "x-token": `${currentUser.token}` },
      });
      setRoles(data.data.roles);
    };
    getRoles();
  }, [setRoles]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await api.get(`/user/${id}`, {
        headers: { "x-token": `${currentUser.token}` },
      });
      const editUser = data.data.user;
      setUser(editUser);
      dispatch(getUserDispatch(editUser));
    };
    getUser();
  }, [setUser]);

  const formik = useFormik({
    initialValues: {
      name: editUser.name,
      lastName: editUser.lastName,
      email: editUser.email,
      //password: editUser.password,
      phone: editUser.phone,
      role: editUser.role,
      address: editUser.userAddresses[0].address,
      flor: editUser.userAddresses[0].flor,
      department: editUser.userAddresses[0].department,
      province: editUser.userAddresses[0].province,
      city: editUser.userAddresses[0].city,
      zip: editUser.userAddresses[0].zip,
    },
    onSubmit: async ({
      name,
      lastName,
      email,
      password,
      phone,
      role,
      address,
      flor,
      department,
      province,
      city,
      zip,
    }) => {
      setIsLoading(true);
      try {
        const { data } = await axios({
          method: "put",
          url: `http://localhost:3040/api/user/${user._id}`,
          data: {
            name,
            lastName,
            email,
            phone,
            password,
            role,
            userAddresses: [
              {
                address,
                flor,
                department,
                city,
                province,
                zip,
              },
            ],
          },
          headers: { "x-token": `${currentUser.token}` },
        });

        if (data.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Usuario editado",
            showConfirmButton: false,
            timer: 2000,
          });
          setError([]);
          navigate("/users");
        }
        setIsLoading(false);
      } catch (err) {
        await setError(error.response.data);
        console.log(err);
        setIsLoading(false);
      }
    },
    validationSchema: schema,
    enableReinitialize: true,
  });

  return (
    <Layout>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          mt={3}
        >
          <Header title="Usuarios" subtitle="Editar usuario" />
        </Stack>
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          <AvatarUpload user={user} token={currentUser.token} />

          <Paper elevation={5}>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1, mx: 2, display: "flex", gap: 3 }}
            >
              <Box>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user_name"
                  label="Nombre/s"
                  name="name"
                  value={formik.values.name}
                  error={!!formik.errors.name}
                  helperText={formik.errors.name}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="lastName"
                  label="Apellido"
                  id="User_lastName"
                  value={formik.values.lastName}
                  error={!!formik.errors.lastName}
                  helperText={formik.errors.lastName}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user_email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  error={!!formik.errors.email || error.email?.msg}
                  helperText={formik.errors.email || error.email?.msg}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phone"
                  label="Telefono"
                  id="user_phone"
                  value={formik.values.phone}
                  error={!!formik.errors.phone || error.phone?.msg}
                  helperText={formik.errors.phone || error.phone?.msg}
                  onChange={formik.handleChange}
                />
                {}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  disabled={true}
                  name="password"
                  label="Password"
                  type="password"
                  id="user_password"
                  autoComplete="current-password"
                  error={!!formik.errors.password}
                  helperText={formik.errors.password}
                  onChange={formik.handleChange}
                />
                <TextField
                  id="user_role"
                  margin="normal"
                  select
                  required
                  name="role"
                  fullWidth
                  label="Rol"
                  value={formik.values.role}
                  error={!!formik.errors.role}
                  helperText={formik.errors.role}
                  onChange={formik.handleChange}
                >
                  {roles.map((option) => (
                    <MenuItem
                      key={option._id}
                      value={option._id}
                      selected={formik.values.role === option._id && true}
                    >
                      {option.role}
                    </MenuItem>
                  ))}
                </TextField>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    mr: 2,
                    backgroundColor: colors.blueAccent[400],
                    "&:hover": { backgroundColor: colors.blueAccent[300] },
                  }}
                >
                  Editar
                </LoadingButton>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderColor: colors.blueAccent[400],
                    color: colors.blueAccent[400],
                    "&:hover": { backgroundColor: colors.blueAccent[900] },
                  }}
                >
                  Cancelar
                </Button>
              </Box>

              <Box>
                <TextField
                  margin="normal"
                  fullWidth
                  name="address"
                  label="Dirección"
                  id="user_address"
                  value={formik.values.address}
                  error={!!formik.errors.address}
                  helperText={formik.errors.address}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="flor"
                  label="Piso(opcional)"
                  id="user_flor"
                  value={formik.values.flor}
                  error={!!formik.errors.flor}
                  helperText={formik.errors.flor}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="department"
                  label="Departamento(opcional)"
                  id="user_department"
                  value={formik.values.department}
                  error={formik.errors.department}
                  helperText={formik.errors.department}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="province"
                  label="Provincia"
                  id="user_province"
                  value={formik.values.province}
                  error={!!formik.errors.province}
                  helperText={formik.errors.province}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="city"
                  label="Ciudad"
                  id="user_city"
                  value={formik.values.city}
                  error={!!formik.errors.city}
                  helperText={formik.errors.city}
                  onChange={formik.handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="zip"
                  label="Código Postal"
                  id="user_zip"
                  type="number"
                  value={formik.values.zip}
                  error={!!formik.errors.zip}
                  helperText={formik.errors.zip}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};
