import {  Paper, Typography, useTheme } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

export const AvatarUpload = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (e)=>{
    e.preventDefault()
   console.log(file)
   
  }

  return (
    <Paper
      elevation={5}
      sx={{
        textAlign: "center",
        padding: "15px",
        height: "320px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="user_avatar_upload"
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
            overflow: "hidden",
          }}
        >
          <input
            type="file"
            id="user_avatar_upload"
            accept=".png, .jpg, .jpeg"
            onChange={changeHandler}
            style={{ display: "none" }}
          />
          {fileDataURL ? (
            <img src={fileDataURL} alt="preview" style={{ height: "100%", objectFit: "cover",   }} />
          ) : (
            <>
              <AddAPhotoIcon />
              <Typography variant="body2" color={colors.grey[500]}>
                Upload Avatar
              </Typography>
            </>
          )}
        </label>
        <Typography variant="body2" color={colors.grey[500]}>
          Allowed *.jpeg, *.jpg and *.png max size of 3.1 MB
        </Typography>
          
        <LoadingButton
              type="submit"
              size="small"
              variant="contained"
              loading={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: colors.blueAccent[400],
                "&:hover": { backgroundColor: colors.blueAccent[300] },
              }}
            >
              <SaveIcon/>
              Guardar
            </LoadingButton>
      </form>
    </Paper>
  );
};
