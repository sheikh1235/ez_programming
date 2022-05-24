import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

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
  const [Loading, setLoading] = useState(true);

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
        setLoading(false)
      }
    );
  }, []);

  return (
    <div>
      <Navbar />

      { Loading ? (<> </>) : 

      codes.map((a) => {

        return(
        <div
          className="card w-75 mx-auto mt-5"
          style={{ borderColor: "#123d35" }}
        >
          <div className="card-body">
            <h5 className="">{a.name}</h5>
            { a.description ? <> a </> : <> <p className="card-text">
            With supporting text below as a natural lead-in to additional
              content.   
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
            </p> </>}
            
          </div>
        </div>)
      })}

    </div>
  );
};

export default Mycodes;
