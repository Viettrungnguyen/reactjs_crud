import { useState } from "react";
import { Link } from "react-router-dom";

function StudentCreate() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleInput = (e) => {
    e.persist();

    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    const data = {
      name: student.name,
      email: student.email,
      phone: student.phone,
      company: student.company,
    };

    axios.post()
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Add Student
                <Link to="/students" className="btn btn-danger float-end">
                  Back
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={saveStudent}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    className="form-control"
                    value={student.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={handleInput}
                    value={student.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    onChange={handleInput}
                    value={student.phone}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="company" className="form-label">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    onChange={handleInput}
                    value={student.company}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Student
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentCreate;
