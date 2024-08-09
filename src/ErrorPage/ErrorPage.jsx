import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    const error = useRouteError();
    console.log(error);
    
    return (
        <div className="w-full min-h-screen flex justify-center flex-col items-center">
            {error.status === 404 && <img className="w-1/3" src='https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png' alt="" />}
            <p className="text-2xl my-4 font-semibold"><i>{error.status}</i> {error.statusText || error.message}</p>
            <button onClick={()=>navigate('/')} className="btn bg-gray-400 text-white px-7">Go Home</button>
        </div>
    );
};

export default ErrorPage;