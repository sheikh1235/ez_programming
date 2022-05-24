import logo from "../../title_logo-removebg-preview.png";
import "./LoadingScreen.css"
const LoadingScreen = () => {
  return (
    <div className="center">
      <img style={{ width: "100px", height: "100px" }} src={logo} />
      <hr style={{height: "5px", backgroundColor: "#3bb19b"}}/>
    </div>
  );
};
export default LoadingScreen;
