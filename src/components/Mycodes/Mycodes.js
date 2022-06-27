import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const getmyposts = (errorr, success) => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:5000/api/code/myallcodes", {
      params: {
        token: token,
      },
    })
    .then(function (res) {
      console.log(res);
      success(res);
    })
    .catch(function (err) {
      errorr(err);
    });
};

const Mycodes = () => {
  const [codes, setCodes] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = "Saved Codes"
    getmyposts(
      (error) => {
        // setauthenticated(false);
        // setLoaded(true)
      },
      (success) => {
        console.log(success.data);
        setCodes(success.data.reverse());
        // setauthenticated(true);
        setLoaded(true)
      }
    );
  }, []);

  return (
    Loaded ? 
    (<div className="mb-5">
      <Navbar />
      
      {(codes.length == 0) && (<div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",}}

      > <p style={{fontSize: "35px"}}>Whooops!! Nothing Found :(</p> </div>)}
      
      {codes.map((a) => {
      return (
        <div
          className="card w-75 mx-auto mt-5"
          style={{ borderColor: "#123d35" }}
        >
          <div className="card-body">
            <h5 className="">{a.name}</h5>
            <p className="card-text">
            {a.desc} 
              <Link
                to = {`/homepage/${a.id}`}
                style={{
                  color: "#123d35",
                  float: "right",
                  marginRight: "20px",
                }}
              >
                Open with terminal
                <i
                  className="fa fa-arrow-up ml-1"
                  style={{ color: "#123d35" }}
                ></i>
              </Link>
            </p>
            
          </div>
        </div>
      )
      })}
    </div>)
    : (<LoadingScreen/>)
  );
};

export default Mycodes;
