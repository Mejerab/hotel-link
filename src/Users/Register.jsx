
const Register = () => {
    const handleSignUp = event => {
        event.preventDefault();
        const name = document.getElementById('name').value
        // const email = event.target.email.value;
        // const password = event.target.password.value;
        console.log(name, 'email', 'password');

        // createUser(email, password)
        //     .then(result => console.log(result.user))
        //     .catch(error => console.error(error))
    }
    return (
        <div className="w-1/2 mx-auto border my-12 rounded-2xl">
            <h3 className="font-bold text-center text-2xl my-6">Register</h3>
            {/* <form onClick={handleSignUp} className="text-center my-6 mx-12 mb-12">
                <div className="grid grid-cols-4 gap-y-4 items-center">
                    <span className="font-medium col-span-1">Name: </span>
                    <input type="text" name="name" className="input" />
                    <span className="font-medium col-span-1">Email: </span>
                    <input type="email" name="email" placeholder="Your email" className="input col-span-3 input-bordered" />
                    <span className="font-medium">Password: </span>
                    <input type="password" name="password" placeholder="Your password" className="input col-span-3 input-bordered" />
                    <button className="btn mt-7 bg-gray-400 col-span-4 text-white ml-8" >Register</button>
                </div>
            </form> */}
            <form onClick={handleSignUp}>
                <input type="text" id="name"/>
            </form>
        </div>
    );
};

export default Register;