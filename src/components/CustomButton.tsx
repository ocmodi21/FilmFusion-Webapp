import { LoadingButton } from "@mui/lab";
import { ButtonProps, CircularProgress, styled } from "@mui/material";

interface props {
  title: string;
  onClick?: any;
  loading?: boolean;
}

const CustomButton = ({ title, onClick, loading = false }: props) => {
  const CButton = styled(LoadingButton)<ButtonProps>(() => ({
    color: "#FFFFFFF",
    backgroundColor: "#FF204E",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "#A0153E",
    },
    minWidth: "100%",
    fontWeight: "600",
    textTransform: "none",
  }));

  return (
    <CButton
      variant="contained"
      loading={loading}
      onClick={onClick}
      loadingIndicator={
        <CircularProgress
          size={24}
          sx={{
            color: "#FFFFFF",
          }}
        />
      }
    >
      <span className="">{title}</span>
    </CButton>
  );
};

export default CustomButton;
