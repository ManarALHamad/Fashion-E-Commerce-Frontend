import { useState } from "react"
import { signUp } from "../services/auth"
import { useNavigate } from "react-router"

const SignUpForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const newUser = await signUp(formData)
            props.setUser(newUser)
            setFormData(initialState)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    const isFormValid = () => {
        if(formData.username && formData.email && formData.password && formData.password === formData.confirmPassword) {
            return true
        } else return false
    }

    return (
        <section className="card">
            <header>
                <h1>Sign Up</h1>
                <p>{message}</p>
            </header>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" onChange={handleChange} value={formData.username} required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} required/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={handleChange} value={formData.password} required />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} required />
                <div className="actions">
                    <button type="submit" disabled={!isFormValid()}>Sign Up</button>
                    <button>Cancel</button>
                </div>
            </form>
        </section>
    )
}

export default SignUpForm
