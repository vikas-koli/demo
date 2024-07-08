import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { postApihandler } from "../apiHandler";
import swal from "sweetalert";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function Form() {
  //  useState
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
const handleSubmit = async() => {
  
   const formData = new FormData();
   formData.append("text",text);
   formData.append("file",image);
   for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
   const res = await postApihandler("/addDataWithTextAndMedia",formData);
   console.log("res==>",res.data.$metadata.httpStatusCode
   );
   if(res.data.$metadata.httpStatusCode === 200){
    swal("Success", "Add Successfully", "success");
   }

  };

  return (
    <>
    <a href='/view-data'><div style={{display:"flex",alignItems:"center",marginTop:"60px",justifyContent:"flex-end",marginRight:"10px"}}><h3 > View data</h3><ArrowRightAltIcon sx={{padding:"10px"}}/></div></a>
    <Container component="main" maxWidth="xs">
       
      <Box
        sx={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: "700" }}>
          Fovus coding challenge
        </Typography>
       
        <Box component="form"  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            multiline
            maxRows={4}
            required
            fullWidth
            label="Write here"
            onChange={(e)=>setText(e.target.value)}
          />
          <TextField margin="normal" onChange={handleImageChange} required fullWidth type="file" />

          <Button
           
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
    </>
  );
}
