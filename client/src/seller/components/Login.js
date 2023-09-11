import React,{useState} from 'react'
import { useHistory,Link } from 'react-router-dom'

const Login = (props) => {
    let showAlert = props.showAlert;
    const [credentials,setCredentials] = useState({phone:"",password:""});

	//const location = useLocation();
    const history = useHistory();

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/accounts/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({phone: credentials.phone, password: credentials.password})
        })
        const json = await response.json()
        history.push("/");
    }
  return (
    <>
    <section className="ftco-section">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-12 col-lg-10">
					<div className="wrap d-md-flex">
						<div className="img" style={{backgroundImage:`url(https://www.auis.edu/wp-content/uploads/2019/09/rs261_157781379-low.jpg)`}}>
						</div>
						<div className="login-wrap p-4 p-md-5">
							<div className="d-flex">
								<div className="w-100">
									<h3 className="mb-4">Log-In To Flipkart Seller</h3>
								</div>

							</div>
							<form  className="signin-form" onSubmit={handleSubmit}>
								<div className="form-group mb-3">
									<label className="label" for="name">phone</label>
									<input type="text" name="phone" className="form-control" placeholder="phone" required value={credentials.phone} onChange={onChange} />
								</div>
								<div className="form-group mb-3">
									<label className="label" for="password">Password</label>
									<input type="password" name="password" className="form-control" placeholder="Password" required value={credentials.password} onChange={onChange} />
								</div>
								<div className="form-group">
									<button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign
										In</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section></>
  )
}

export default Login
