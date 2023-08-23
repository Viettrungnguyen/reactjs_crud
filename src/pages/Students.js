import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
function Student() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      console.log(res.data);
      setStudents(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  var studentDetails = "";
  studentDetails = students.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{`${item.address.street} - ${item.address.suite} - ${item.address.city}`}</td>
        <td>{item.phone}</td>
        <td>{item.company.name}</td>
        <td>
          <Link to="/" className="btn btn-success">
            Edit
          </Link>
        </td>
        <td>
          <Link to="/" className="btn btn-danger">
            Delete
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Student List
                <Link to="/" className="btn btn-primary float-end">
                  Add Student
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Company</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{studentDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
