import { LoadingButton } from "@mui/lab";
import { ButtonProps, styled } from "@mui/material";

interface props {
  title: string;
  onClick?: any;
  loading?: boolean;
}

const CustomButton = ({ title, onClick, loading = false }: props) => {
  const CButton = styled(LoadingButton)<ButtonProps>(() => ({
    color: "#FFFFFFF",
    backgroundColor: "#892CDC",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "#a435ff",
    },
    minWidth: "100%",
    fontFamily: "Nunito Sans",
    fontWeight: "600",
    textTransform: "none",
  }));

  return (
    <CButton variant="contained" loading={loading} onClick={onClick}>
      <span className="">{title}</span>
    </CButton>
  );
};

export default CustomButton;
