import { LinearProgress, Paper, Typography, useTheme } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { tokens } from "../../theme";
import { useEffect, useRef, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { host } from "../../api/host";
import axios from "axios";
import { Box } from "@mui/system";
import Swal from "sweetalert2";

const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;
const authenticationEndpoint = `${host}/api/imageKit`;

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export const AvatarUpload = ({ user, token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const inputRefTest = useRef(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
    //console.log(file)
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const onError = (err) => {
    console.log("Error", err);
    setLoading(false);
    setError(true);
  };

  const onSuccess = async (res) => {
    console.log("Success", res);
    try {
      const { data } = await axios({
        method: "put",
        url: `http://localhost:3040/api/user/${user._id}`,
        data: {
          ...user,
          avatar: res.url,
        },
        headers: { "x-token": `${token}` },
      });

      setLoading(false);
      Swal.fire("OK", "Avatar cambiado exitosamente!!", "success");
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  /*  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  }; */

  const onUploadStart = (evt) => {
    console.log("Start", evt);
    setLoading(true);
  };

  return (
    <Paper
      elevation={5}
      sx={{
        textAlign: "center",
        padding: "15px",
        minHeight: "320px",

        maxHeight: "340px",
      }}
    >
      <Typography variant="h4" color={colors.greenAccent[500]}>
        {user.name}
      </Typography>
      <Typography variant="body2" color={colors.grey[700]}>
        Id:{user._id}
      </Typography>

      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={authenticationEndpoint}
      >
        <IKUpload
          fileName="avatar.png"
          onError={onError}
          onSuccess={onSuccess}
          /*  onUploadProgress={onUploadProgress} */
          onUploadStart={onUploadStart}
          onChange={changeHandler}
          /* validateFile={(file) =>
              file.size < 2000000 && file.fileType === "image"
            } */
          style={{ display: "none" }}
          inputRef={inputRefTest}
        />

        {inputRefTest && (
          <button
            onClick={() => inputRefTest.current.click()}
            style={{
              width: "150px",
              height: "150px",
              backgroundColor: "#ccc",
              margin: "20px",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px dashed  #333",
              cursor: "pointer",
             
              position: "relative",
            }}
          >
            {fileDataURL && (
              <Box sx={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                overflow: "hidden",
               
              }}>

              <img
                  src={fileDataURL}
                  alt="preview"
                  style={{ height: "100%", objectFit: "cover" }}
                /> 
              </Box>
            )}
            {!fileDataURL && (
              <>
                {/*  <AddAPhotoIcon />
                <Typography variant="body2" color={colors.grey[500]}>
                  Upload Avatar
                </Typography> */}
                <Box
                  sx={{
                    position: "absolute",
                      zIndex: "10",
                      bottom: 0,
                      right: 0,
                      backgroundColor: colors.greenAccent[500],
                      color: "white",
                      borderRadius: "50%",
                      padding: "5px",
                  }}
                >
                  <AddAPhotoIcon
                    sx={{
                     
                    }}
                  />
                </Box>
                <Box sx={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                overflow: "hidden",
              
              }}>

               <img
                  src={user.avatar}
                  alt="preview"
                  style={{ height: "100%", objectFit: "cover" }}
                /> 
              </Box>
              </>
            )}
          </button>
        )}
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Typography variant="body" color={colors.grey[500]}></Typography>
        <Typography variant="body2" color={colors.grey[500]}>
          Allowed *.jpeg, *.jpg and *.png max size of 3.1 MB
        </Typography>
        {error && (
          <p style={{ color: "red" }}>Error: no se pudo cambiar el avatar</p>
        )}
      </IKContext>
    </Paper>
  );
};
