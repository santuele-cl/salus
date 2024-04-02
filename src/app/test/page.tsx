"use client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFFile from "../_ui/pdf/PDFFile";
import { useState } from "react";
import { Box, Button, Modal, Stack } from "@mui/material";

const TestPage = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <h1>TestPage</h1>
      <Button onClick={() => setShow((prev) => !prev)}>Show</Button>
      {/* <Modal open={show} onClose={() => setShow(false)}>
        <Stack
          sx={{
            minHeight: "100vh",
            width: "100%",
          }}
          // sx={{
          //   justifyContent: "center",
          //   alignItems: "center",
          //   minHeight: "80vh",
          //   minWidth: "80vw",
          //   overflow: "scroll",
          // }}
        > */}
      {/* <PDFViewer showToolbar height={600} width={1000}>
        <PDFFile />
      </PDFViewer> */}
      {/* </Stack>
      </Modal> */}
      {/* <PDFDownloadLink document={<PDFFile />} fileName="sample-pdf">
        {({ loading }) => (loading ? "Loading" : "Download")}
      </PDFDownloadLink> */}
      <PDFFile />
    </div>
  );
};

export default TestPage;
