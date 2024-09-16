import { createContext, useState, useContext, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Create the Snackbar context
const SnackbarContext = createContext();

// Create a provider component
export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info", // can be 'success', 'error', 'warning', 'info'
  });

  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleClose = () => {
    setSnackbar({ open: false, message: "", severity: "info" });
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={snackbar.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            fontSize: "16px", // Customized font size
            fontWeight: "bold", // Bold text
            backgroundColor:
              snackbar.severity === "success"
                ? "#4caf50" // Green for success
                : snackbar.severity === "error"
                ? "#f44336" // Red for error
                : snackbar.severity === "warning"
                ? "#ff9800" // Orange for warning
                : "#2196f3", // Blue for info
            color: "#fff", // White text for contrast
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow effect
            borderRadius: "8px", // Rounded corners
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Create a custom hook to use the Snackbar context
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
